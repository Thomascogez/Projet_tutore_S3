<?php


namespace App\Controller\Session;


use App\Controller\AbstractController;
use App\Entity\Groups;
use App\Entity\Module;
use App\Entity\Semaphore;
use App\Entity\Session;
use App\Entity\User;
use App\Form\SessionType;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Swagger\Annotations as SWG;

define("SESSION_NOT_FOUND", "Session not found");

class SessionController extends AbstractController
{
    /**
     * Get session by id
     * @Rest\Get("/api/sessions/{id}", requirements={"id":"\d+"}, name="get_session_action")
     * @Rest\View(serializerGroups={"session_detail"})
     * @Operation(
     *     path="/api/sessions/{id}",
     *     operationId="getSessionAction",
     *     tags={"Session"},
     *     summary="Get session by id",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getSessionAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id'));

        if (!$session) return $this->isNotFound(SESSION_NOT_FOUND);

        return $session;
    }

    /**
     * Get all session with filter
     * @Rest\Get("/api/sessions", name="get_sessions_action")
     * @QueryParam(name="month", requirements="\d+", default="0", description="Number of month")
     * @QueryParam(name="year",  requirements="\d+", default="0", description="Number of year" )
     * @QueryParam(name="group", description="Group of session")
     * @QueryParam(name="type", description="type of session")
     * @Rest\View(serializerGroups={"session_detail"})
     * @Operation(
     *     path="/api/sessions",
     *     operationId="getSessionsAction",
     *     tags={"Session"},
     *     summary="Get all session with filter",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getSessionsAction(ParamFetcherInterface $paramFetcher, Request $request)
    {
        $sessions = array();

        $month = $paramFetcher->get('month');
        $year = $paramFetcher->get('year');

        if ($month == 0) $month = date('M');
        if ($year == 0) $year = date('Y');


        $from = new \DateTime($year . "-" . $month . "-01");
        $to = new \DateTime($year . "-" . $month . "-31");

        if($paramFetcher->get('type') == NULL) {
            $groups = $this->getDoctrine()->getRepository(Groups::class)->findOneBy(array("name" => $paramFetcher->get('group')));
        } else {
            $groups = $this->getDoctrine()->getRepository(Groups::class)->findOneBy(array("name" => $paramFetcher->get('group'), "type" => $paramFetcher->get('type')));
        }
        if (!$groups) {
            $tmp = $this->getDoctrine()->getRepository(Session::class)->findByDate($from, $to);
        } else {
            $tmp = $groups->getSessions();
        }

        foreach ($tmp as $index) {
            if(!isset($sessions[date('W', $index->getCreatedAt()->getTimestamp())])){
                $sessions[date('W', $index->getCreatedAt()->getTimestamp())] = array();
            }
            if(!isset($sessions[date('d', $index->getCreatedAt()->getTimestamp())])){
                $sessions[date('W', $index->getCreatedAt()->getTimestamp())][date('d', $index->getCreatedAt()->getTimestamp())] = array();
            }

            $sessions[date('W', $index->getCreatedAt()->getTimestamp())][date('d', $index->getCreatedAt()->getTimestamp())] = $index;
        }

        return $sessions;
    }

    /**
     * Add session
     * @Rest\Post("/api/sessions", name="post_session_action")
     * @Rest\View(serializerGroups={"session_detail"}, statusCode=201)
     * @Rest\RequestParam(name="module",  description="Module code",   nullable=false)
     * @Rest\RequestParam(name="type",    description="Type name",     nullable=false)
     * @Rest\RequestParam(name="groupe",  description="Groupe name",   nullable=false)
     * @Operation(
     *     path="/api/sessions",
     *     operationId="postSessionAction",
     *     tags={"Session"},
     *     summary="Add session",
     *     @SWG\Response(
     *         response="201",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function postSessionAction(Request $request)
    {
        $session = new Session();
        $form = $this->createForm(SessionType::class, $session);
        $session->setCreatedAt(new \DateTime());

        $module = $this->getDoctrine()->getRepository(Module::class)->findOneBy(array("code" => $request->get('module')));
        $type = $this->getDoctrine()->getRepository(\App\Entity\SessionType::class)->findOneBy(array("name" => $request->get('type')));
        $group = $this->getDoctrine()->getRepository(Groups::class)->findOneBy(array("name" => $request->get('group')));

        $form->submit(null, false);

        if (!$module) {
            $form->get('module')->addError(new FormError("Module don't exist"));
        }
        if (!$type) {
            $form->get('type')->addError(new FormError("Type don't exist"));
        }
        if (!$group) {
            $form->get('groupe')->addError(new FormError("Group don't exist"));
        }

        $test = false;
        foreach ($this->getUser()->getModules() as $data) {
            if ($data == $module) $test = true;
        }
        if (!$test) $form->get('module')->addError(new FormError("Not authorization"));

        $test = false;
        foreach ($this->getUser()->getGroups() as $data) {
            if ($data == $group) $test = true;
        }
        if (!$test) $form->get('groupe')->addError(new FormError("Not authorization"));

        if ($form->isValid()) {

            $session->setModule($module)
                ->setUser($this->getUser())
                ->setType($type->getName())
                ->setGroupe($group);

            $manager = $this->getDoctrine()->getManager();

            foreach ($this->getDoctrine()->getRepository(User::class)->findAll() as $user) {
                $sema = new Semaphore();
                $sema->setUser($user)
                    ->setStatus(false)
                    ->setSession($session);
                $manager->persist($sema);
            }

            $manager->persist($session);
            $manager->flush();
            return $session;
        } else {
            return $form;
        }
    }

    /**
     * Update session by id
     * @Rest\Patch("/api/sessions/{id}", requirements={"id": "\d+"}, name="patch_session_action")
     * @Rest\View(serializerGroups={"session_detail"})
     * @Rest\RequestParam(name="module",  description="Module code",   nullable=true)
     * @Rest\RequestParam(name="type",    description="Type name",     nullable=true)
     * @Rest\RequestParam(name="groupe",  description="Groupe name",   nullable=true)
     * @Operation(
     *     path="/api/sessions/{id}",
     *     operationId="patchSessionAction",
     *     tags={"Session"},
     *     summary="Update session by id",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function patchSessionAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id'));
        if (!$session) return $this->isNotFound(SESSION_NOT_FOUND);
        if ($session->getUser() !== $this->getUser()) return $this->notAuthorized();

        $form = $this->createForm(SessionType::class, $session);

        $module = $this->getDoctrine()->getRepository(Module::class)->findOneBy(array("code" => $request->get('module')));
        $type = $this->getDoctrine()->getRepository(\App\Entity\SessionType::class)->findOneBy(array("name" => $request->get('type')));
        $group = $this->getDoctrine()->getRepository(Groups::class)->findOneBy(array("name" => $request->get('group')));

        $form->submit(null, false);

        if ($request->get('module') != NULL) {
            if (!$module) {
                $form->get('module')->addError(new FormError("Module don't exist"));
            } else {
                $test = false;
                foreach ($this->getUser()->getModules() as $data) {
                    if ($data == $module) $test = true;
                }
                if (!$test) $form->get('module')->addError(new FormError("Not authorization"));
                else $session->setModule($module);
            }
        }
        if ($request->get('type') != NULL) {
            if (!$type) {
                $form->get('type')->addError(new FormError("Type don't exist"));
            } else {
                $session->setType($type->getName());
            }
        }
        if ($request->get('group') != NULL) {
            if (!$group) {
                $form->get('groupe')->addError(new FormError("Group don't exist"));
            } else {
                $test = false;
                foreach ($this->getUser()->getGroups() as $data) {
                    if ($data == $group) $test = true;
                }
                if (!$test) $form->get('groupe')->addError(new FormError("Not authorization"));
                else $session->setGroupe($group);
            }
        }

        if ($form->isValid()) {

            $manager = $this->getDoctrine()->getManager();
            $manager->persist($session);
            $manager->flush();
            return $session;
        } else {
            return $form;
        }
    }

    /**
     * Delete session by id
     * @Rest\Delete("/api/sessions/{id}", requirements={"id": "\d+"}, name="delete_session_action")
     * @Rest\View(serializerGroups={"session_detail"})
     * @Operation(
     *     path="/api/sessions/{id}",
     *     operationId="deleteSessionAction",
     *     tags={"Session"},
     *     summary="Delete session by id",
     *     @SWG\Response(
     *         response="204",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function deleteSessionAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id'));
        if (!$session) return $this->isNotFound(SESSION_NOT_FOUND);
        if ($session->getUser() !== $this->getUser()) return $this->notAuthorized();

        $manager = $this->getDoctrine()->getManager();
        $manager->remove($session);
        $manager->flush();

        return $this->getDoctrine()->getRepository(Session::class)->findAll();
    }
}