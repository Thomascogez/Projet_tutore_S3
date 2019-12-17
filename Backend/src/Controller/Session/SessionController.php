<?php


namespace App\Controller\Session;


use App\Controller\AbstractController;
use App\Entity\Groups;
use App\Entity\Module;
use App\Entity\Session;
use App\Form\SessionType;
use DateTime;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

define("SESSION_NOT_FOUND", "Session not found");

class SessionController extends AbstractController
{
    /**
     * @Rest\Get("/api/sessions/{id}", requirements={"id":"\d+"})
     * @Rest\View(serializerGroups={"session_detail"})
     */
    public function getSessionAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id'));

        if (!$session) return $this->isNotFound(SESSION_NOT_FOUND);

        return $session;
    }

    /**
     * @Rest\Get("/api/sessions")
     * @QueryParam(name="month", requirements="\d+", default="0", description="Number of month")
     * @QueryParam(name="year",  requirements="\d+", default="0", description="Number of year" )
     * @QueryParam(name="group", description="Group of classcontent")
     * @Rest\View(serializerGroups={"session_detail"})
     */
    public function getSessionsAction(ParamFetcherInterface $paramFetcher, Request $request)
    {
        $month = $paramFetcher->get('month');
        $year = $paramFetcher->get('year');

        if ($month == 0) $month = date('M');
        if ($year == 0) $year = date('Y');


        $from = new DateTime($year . "-" . $month . "-01");
        $to = new DateTime($year . "-" . $month . "-31");

        $groups = $this->getDoctrine()->getRepository(Groups::class)->findOneBy(array("name" => $paramFetcher->get('group')));
        if (!$groups) {
            $sessions = $this->getDoctrine()->getRepository(Session::class)->findByDate($from, $to);
        } else {
            $sessions = $groups->getSessions();
        }
        return $sessions;
    }

    /**
     * @Rest\Post("/api/sessions")
     * @Rest\View(serializerGroups={"session_detail"}, statusCode=201)
     */
    public function postSessionAction(Request $request)
    {
        $session = new Session();
        $form = $this->createForm(SessionType::class, $session);
        $session->setCreatedAt(new DateTime());

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
                ->setType($type)
                ->setGroupe($group);

            $manager = $this->getDoctrine()->getManager();
            $manager->persist($session);
            $manager->flush();
            return $session;
        } else {
            return $form;
        }
    }

    /**
     * @Rest\Patch("/api/sessions/{id}", requirements={"id": "\d+"})
     * @Rest\View(serializerGroups={"session_detail"})
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
                $session->setType($type);
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
     * @Rest\Delete("/api/sessions/{id}", requirements={"id": "\d+"})
     * @Rest\View(statusCode=Response::HTTP_NO_CONTENT)
     */
    public function deleteSessionAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id'));
        if (!$session) return $this->isNotFound(SESSION_NOT_FOUND);
        if ($session->getUser() !== $this->getUser()) return $this->notAuthorized();

        $manager = $this->getDoctrine()->getManager();
        $manager->remove($session);
        $manager->flush();
    }
}