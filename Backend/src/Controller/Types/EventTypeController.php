<?php


namespace App\Controller\Types;


use App\Controller\AbstractController;
use App\Entity\EventType;
use App\Entity\RoleTypeEvent;
use App\Form\EventTypeType;
use App\Form\RoleTypeEventType;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;

define("EVENT_TYPE_NOT_FOUND", "Event type not found");

class EventTypeController extends AbstractController
{

    /**
     * @Rest\Get("/api/event_types")
     * @Rest\View(serializerGroups={"event_type"})
     */
    public function getSessionTypesAction(Request $request)
    {
        return $this->getDoctrine()->getRepository(EventType::class)->findAll();
    }

    /**
     * @Rest\Get("/api/event_types/{id}", requirements={"id": "\d+"})
     * @Rest\View(serializerGroups={"event_type"})
     */
    public function getEventTypeAction(Request $request)
    {
        $eventType = $this->getDoctrine()->getRepository(EventType::class)->find($request->get('id'));
        if (!$eventType)
            return $this->isNotFound(EVENT_TYPE_NOT_FOUND);

        return $eventType;
    }


    /**
     * @Rest\Post("/api/event_types", requirements={"id": "\d+"})
     * @Rest\View(serializerGroups={"event_type"})
     */
    public function postEventTypeAction(Request $request)
    {
        if (!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $eventType = new EventType();
        $roleEventType = new RoleTypeEvent();

        $form = $this->createForm(EventTypeType::class, $eventType);
        $formRole = $this->createForm(RoleTypeEventType::class, $roleEventType);

        $form->submit($request->request->all());
        $formRole->submit($request->request->all());

        if ($form->isValid() && $formRole->isValid()) {

            $eventType->setRoleTypeEvent($roleEventType);
            $manager = $this->getDoctrine()->getManager();
            $manager->persist($eventType);
            $manager->flush();
            return $eventType;
        } else {
            if (!$form->isValid() && !$formRole->isValid()) return array($form, $formRole);
            if (!$form->isValid()) return $form;
            if (!$formRole->isValid()) return $formRole;
        }
        return $form;
    }


    /**
     * @Rest\Patch("/api/event_types/{id}", requirements={"id": "\d+"})
     * @Rest\View(serializerGroups={"event_type"})
     */
    public function patchEventTypeAction(Request $request)
    {
        if (!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $eventType = $this->getDoctrine()->getRepository(EventType::class)->find($request->get('id'));
        if (!$eventType)
            return $this->isNotFound(EVENT_TYPE_NOT_FOUND);
        $roleEventType = $eventType->getRoleTypeEvent();

        $form = $this->createForm(EventTypeType::class, $eventType);
        $formRole = $this->createForm(RoleTypeEventType::class, $roleEventType);

        $form->submit($request->request->all(), false);
        $formRole->submit($request->request->all(), false);

        if ($form->isValid() && $formRole->isValid()) {

            $eventType->setRoleTypeEvent($roleEventType);
            $manager = $this->getDoctrine()->getManager();
            $manager->persist($eventType);
            $manager->flush();
            return $eventType;
        } else {
            if (!$form->isValid() && !$formRole->isValid()) return array($form, $formRole);
            if (!$form->isValid()) return $form;
            if (!$formRole->isValid()) return $formRole;
        }
        return $form;
    }


    /**
     * @Rest\Delete("/api/event_types/{id}", requirements={"id": "\d+"})
     * @Rest\View(statusCode=204)
     */
    public function deleteEventTypeAction(Request $request)
    {
        if (!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $eventType = $this->getDoctrine()->getRepository(EventType::class)->find($request->get('id'));
        if (!$eventType)
            return $this->isNotFound(EVENT_TYPE_NOT_FOUND);

        $manager = $this->getDoctrine()->getManager();
        $manager->remove($eventType);
        $manager->flush();
    }
}