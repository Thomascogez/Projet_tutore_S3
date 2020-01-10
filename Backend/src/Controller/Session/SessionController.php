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
use Nelmio\ApiDocBundle\Annotation\Operation;
use Swagger\Annotations as SWG;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;

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

        $years = array();

        //Test if tutor is access of this session
        if($this->userHasRole($this->getUser(), "ROLE_TUTOR")) {
            $date = $this->getUser()->getCreatedAt();

            if($date->format("m") >= 8 && $date->format("m") <= 12)
                $years = [$date->format("Y")+0, $date->format("Y")+1];
            if($date->format("m") >= 1 && $date->format("m") <= 7)
                $years = [$date->format("Y")-1, $date->format("Y")+0];

            $dateSession = $session->getCreatedAt();

            //Test date of session
            if($dateSession->format("Y") == $years[0] && $dateSession->format("m") >= 8){}
            else if($dateSession->format("Y") == $years[1] && $dateSession->format("m") <= 7){}
            else return $this->notAuthorized();

            //Test group user
            $test = false;
            foreach ($this->getUser()->getGroups() as $groups) {
                foreach ($session->getGroups() as $group) {
                    if($groups === $group) $test = true;
                }
            }
            if(!$test) return $this->notAuthorized();
        }
        //Get user semaphore
        foreach ($session->getSemaphores() as $semaphore)
            if($semaphore->getUser() != $this->getUser()) $session->removeSemaphore($semaphore);

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
        $year  = $paramFetcher->get('year' );

        //Set default month and year
        if ($month == 0) $month = date('M');
        if ($year == 0)  $year  = date('Y');

        //Create date
        $from = new \DateTime($year . "-" . $month . "-01");
        $to = new \DateTime($year . "-" . $month . "-31");

        $groups = null;
        $type   = null;

        //Group filter test
        if($paramFetcher->get('group')) {
            $groups = $this->getDoctrine()->getRepository(Groups::class)->findOneBy(array("name" => $paramFetcher->get('group')));
            if(!$groups) return $this->isNotFound("Group not found");
        }
        //Type filter test
        if($paramFetcher->get('type')){
            $type = $this->getDoctrine()->getRepository(\App\Entity\SessionType::class)->findOneBy(array("name" => $paramFetcher->get('type')));
            if(!$type) return $this->isNotFound("Type not found");
        }

        //Get all sessions with conditions
        $tmp = $this->getDoctrine()->getRepository(Session::class)->findByDate($from, $to, $groups, $type);

        foreach ($tmp as $index) {
            $test = false;

            //Test if tutor is authorized get session
            if($this->userHasRole($this->getUser(), "ROLE_TUTOR")) {
                $date = $this->getUser()->getCreatedAt();

                if($date->format("m") >= 8 && $date->format("m") <= 12)
                    $years = [$date->format("Y")+0, $date->format("Y")+1];
                if($date->format("m") >= 1 && $date->format("m") <= 7)
                    $years = [$date->format("Y")-1, $date->format("Y")+0];

                $dateSession = $index->getCreatedAt();

                if($dateSession->format("Y") == $years[0] && $dateSession->format("m") >= 8)
                    $test = true;
                else if($dateSession->format("Y") == $years[1] && $dateSession->format("m") <= 7)
                    $test = true;

                $test2 = false;

                foreach ($this->getUser()->getGroups() as $groups) {
                    foreach ($index->getGroups() as $group) {
                        if($groups === $group) $test2 = true;
                    }
                }
                if($test2)
                    $test = true;
                else $test = false;
            } else
                $test = true;

            foreach ($index->getSemaphores() as $semaphore)
                if($semaphore->getUser() != $this->getUser()) $index->removeSemaphore($semaphore);

            if($test) {
                $weekNumber = date('W', $index->getCreatedAt()->getTimestamp());

                if(!isset($sessions[$weekNumber])){
                    $sessions[$weekNumber] = array();
                }
                if(!isset($sessions[$weekNumber][date('d', $index->getCreatedAt()->getTimestamp())])){
                    $sessions[$weekNumber][date('d', $index->getCreatedAt()->getTimestamp())] = array();
                }

                $sessions[$weekNumber][date('d', $index->getCreatedAt()->getTimestamp())][] = $index;
            }

        }

        return $sessions;
    }

    /**
     * Add session
     * @Rest\Post("/api/sessions", name="post_session_action")
     * @Rest\View(serializerGroups={"session_detail"}, statusCode=201)
     * @Rest\RequestParam(name="module",  description="Module code",              nullable=false)
     * @Rest\RequestParam(name="type",    description="Type name",                nullable=false)
     * @Rest\RequestParam(name="groups",   description="Groups array of name",    nullable=false)
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


        $form->submit(null, false);
        if (!$module) {
            $form->get('module')->addError(new FormError("Module don't exist"));
        }
        if (!$type) {
            $form->get('type')->addError(new FormError("Type don't exist"));
        }

        if(!$this->userHasRole($this->getUser(), "ROLE_ADMIN")) {
            $test = false;
            foreach ($this->getUser()->getModules() as $data) {
                if ($data == $module) $test = true;
            }
            if (!$test) $form->get('module')->addError(new FormError("Not authorization"));
        }

        foreach ($request->get('groups') as $groupReq) {
            $group = $this->getDoctrine()->getRepository(Groups::class)->findOneBy(array("name" => $groupReq));
            $test = false;

            if(!$this->userHasRole($this->getUser(), "ROLE_ADMIN")) {
                foreach ($this->getUser()->getGroups() as $data) {
                    if ($data == $group) $test = true;
                }
            } else $test = true;

            if(!$group) $form->get('groups')->addError(new FormError("Group " . $groupReq . " don't exist  "));
            else if (!$test) $form->get('groups')->addError(new FormError("Not authorization group " . $groupReq));
            else $session->addGroup($group);
        }

        if ($form->isValid()) {

            $session->setModule($module)
                ->setUser($this->getUser())
                ->setType($type->getName());

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
     * @Rest\RequestParam(name="module",  description="Module code",            nullable=true)
     * @Rest\RequestParam(name="type",    description="Type name",              nullable=true)
     * @Rest\RequestParam(name="groups",  description="Groups array of name",   nullable=true)
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
        if(!$this->userHasRole($this->getUser(), "ROLE_ADMIN")) {
            if (!$session) return $this->isNotFound(SESSION_NOT_FOUND);
            if ($session->getUser() !== $this->getUser()) return $this->notAuthorized();
        }

        $form = $this->createForm(SessionType::class, $session);

        $module = $this->getDoctrine()->getRepository(Module::class)->findOneBy(array("code" => $request->get('module')));
        $type = $this->getDoctrine()->getRepository(\App\Entity\SessionType::class)->findOneBy(array("name" => $request->get('type')));

        $form->submit(null, false);

        if ($request->get('module') != NULL) {
            if (!$module) {
                $form->get('module')->addError(new FormError("Module don't exist"));
            } else {
                $test = false;
                foreach ($this->getUser()->getModules() as $data) {
                    if ($data == $module) $test = true;
                }
                if (!$test && !$this->userHasRole($this->getUser(), "ROLE_ADMIN")) $form->get('module')->addError(new FormError("Not authorization"));
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
        if ($request->get('groups') != NULL) {
            foreach ($session->getGroups() as $group) {
                $session->removeGroup($group);
            }
            foreach ($request->get('groups') as $groupReq) {
                $group = $this->getDoctrine()->getRepository(Groups::class)->findOneBy(array("name" => $groupReq));
                $test = false;

                if(!$this->userHasRole($this->getUser(), "ROLE_ADMIN")) {
                    foreach ($this->getUser()->getGroups() as $data) {
                        if ($data == $group) $test = true;
                    }
                } else $test = true;

                if(!$group) $form->get('groups')->addError(new FormError("Group " . $groupReq . " don't exist  "));
                else if (!$test) $form->get('groups')->addError(new FormError("Not authorization group " . $groupReq));
                else $session->addGroup($group);
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
     * @Rest\View(serializerGroups={"session_detail"}, statusCode=204)
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
        if(!$this->userHasRole($this->getUser(), "ROLE_ADMIN")) {
            if (!$session) return $this->isNotFound(SESSION_NOT_FOUND);
            if ($session->getUser() !== $this->getUser()) return $this->notAuthorized();
        }
        $manager = $this->getDoctrine()->getManager();
        $manager->remove($session);
        $manager->flush();
    }

}