<?php


namespace App\Controller\Session\Event;


use App\Controller\AbstractController;
use App\Entity\Event;
use App\Entity\EventType;
use App\Entity\Session;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;

define("SESSIONS_NOT_FOUND", "Session not found");
define("EVENT_NOT_FOUND", "Event not found");

class EventController extends AbstractController
{

    /**
     * @Rest\Get("/api/sessions/{id_session}/events/{id_event}", requirements={"id_session": "\d+", "id_event": "\d+"})
     * @Rest\View(serializerGroups={"events"})
     */
    public function getEventAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id_session'));
        if (!$session) return $this->isNotFound(SESSIONS_NOT_FOUND);

        $event = $this->getDoctrine()->getRepository(Event::class)->find($request->get('id_event'));
        if (!$event) return $this->isNotFound(EVENT_NOT_FOUND);

        if ($event->getSession() != $session) return $this->isNotFound("This event not in this session");

        return $event;
    }

    /**
     * @Rest\Get("/api/sessions/{id_session}/events", requirements={"id_session": "\d+"})
     * @Rest\View(serializerGroups={"events"})
     */
    public function getEventsAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id_session'));
        if (!$session) return $this->isNotFound(SESSIONS_NOT_FOUND);

        return $session->getEvents();
    }

    /**
     * @Rest\Post("/api/sessions/{id_session}/events", requirements={"id_session": "\d+"})
     * @Rest\View(serializerGroups={"events"})
     */
    public function postEventAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id_session'));
        if (!$session) return $this->isNotFound(SESSIONS_NOT_FOUND);

        if ($session->getGroupe()->getUsers()->contains($this->getUser())) {
            $event = new Event();

            $form = $this->createForm(\App\Form\EventType::class, $event);
            $form->submit($request->request->all());

            $type = $this->getDoctrine()->getRepository(EventType::class)->findOneBy(array("name" => $event->getType()));
            if (!$type)
                $form->get('type')->addError(new FormError("Type not found"));
            if ($type->getRoleTypeEvent()->getTeacher()) {
                if (!$this->userHasRole($this->getUser(), "ROLE_TEACHER"))
                    $form->get('type')->addError(new FormError("Not authorization"));
            }
            if ($type->getRoleTypeEvent()->getTutor()) {
                if (!$this->userHasRole($this->getUser(), "ROLE_TUTOR"))
                    $form->get('type')->addError(new FormError("Not authorization"));
            }

            if ($form->isValid()) {
                $event->setSession($session)
                    ->setUser($this->getUser());

                $manager = $this->getDoctrine()->getManager();
                $manager->persist($event);
                $manager->flush();
                return $event;
            } else {
                return $form;
            }
        } else {
            return $this->notAuthorized();
        }
    }

    /**
     * @Rest\Patch("/api/sessions/{id_session}/events/{id_event}", requirements={"id_session": "\d+", "id_event": "\d+"})
     * @Rest\View(serializerGroups={"events"})
     */
    public function patchEventAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id_session'));
        if (!$session) return $this->isNotFound(SESSIONS_NOT_FOUND);

        $event = $this->getDoctrine()->getRepository(Event::class)->find($request->get('id_event'));
        if (!$event) return $this->isNotFound(EVENT_NOT_FOUND);

        if (!$session->getEvents()->contains($event))
            return $this->isNotFound(EVENT_NOT_FOUND);

        if ($this->getUser() == $event->getUser()) {

            $form = $this->createForm(\App\Form\EventType::class, $event);
            $form->submit($request->request->all(), false);

            if ($request->get('type') != NULL) {
                $type = $this->getDoctrine()->getRepository(EventType::class)->findOneBy(array("name" => $event->getType()));
                if (!$type)
                    $form->get('type')->addError(new FormError("Type not found"));
                if ($type->getRoleTypeEvent()->getTeacher()) {
                    if (!$this->userHasRole($this->getUser(), "ROLE_TEACHER"))
                        $form->get('type')->addError(new FormError("Not authorization"));
                }
                if ($type->getRoleTypeEvent()->getTutor()) {
                    if (!$this->userHasRole($this->getUser(), "ROLE_TUTOR"))
                        $form->get('type')->addError(new FormError("Not authorization"));
                }
            }

            if ($form->isValid()) {

                $manager = $this->getDoctrine()->getManager();
                $manager->persist($event);
                $manager->flush();
                return $event;
            } else {
                return $form;
            }
        } else {
            return $this->notAuthorized();
        }
    }

    /**
     * @Rest\Delete("/api/sessions/{id_session}/events/{id_event}", requirements={"id_session": "\d+", "id_event": "\d+"})
     * @Rest\View(statusCode=204)
     */
    public function deleteEventAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id_session'));
        if (!$session) return $this->isNotFound(SESSIONS_NOT_FOUND);

        $event = $this->getDoctrine()->getRepository(Event::class)->find($request->get('id_event'));
        if (!$event) return $this->isNotFound(EVENT_NOT_FOUND);

        if (!$session->getEvents()->contains($event))
            return $this->isNotFound(EVENT_NOT_FOUND);

        if ($event->getUser() === $this->getUser()) {

            $manager = $this->getDoctrine()->getManager();
            $manager->remove($event);
            $manager->flush();
        } else {
            return $this->notAuthorized();
        }
    }
}