<?php


namespace App\Controller\Types;


use App\Controller\AbstractController;
use App\Entity\EventType;
use App\Entity\RoleTypeEvent;
use App\Form\EventTypeType;
use App\Form\RoleTypeEventType;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Swagger\Annotations as SWG;

define("EVENT_TYPE_NOT_FOUND", "Event type not found");

class EventTypeController extends AbstractController
{

    /**
     * Get all event types
     * @Rest\Get("/api/event_types", name="get_event_types_action")
     * @Rest\View(serializerGroups={"event_type"})
     * @Operation(
     *     path="/api/event_types",
     *     operationId="getEventTypesAction",
     *     tags={"Event Type"},
     *     summary="Get all event types",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getEventTypesAction(Request $request)
    {
        return $this->getDoctrine()->getRepository(EventType::class)->findAll();
    }

    /**
     * Get on event type by id
     * @Rest\Get("/api/event_types/{id}", requirements={"id": "\d+"}, name="get_event_type_action")
     * @Rest\View(serializerGroups={"event_type"})
     * @Operation(
     *     path="/api/event_types/{id}",
     *     operationId="getEventTypeAction",
     *     tags={"Event Type"},
     *     summary="Get on event type by id",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getEventTypeAction(Request $request)
    {
        $eventType = $this->getDoctrine()->getRepository(EventType::class)->find($request->get('id'));
        if (!$eventType)
            return $this->isNotFound(EVENT_TYPE_NOT_FOUND);

        return $eventType;
    }


    /**
     * Add new event type
     * @Rest\Post("/api/event_types", requirements={"id": "\d+"}, name="post_event_types_action")
     * @Rest\View(serializerGroups={"event_type"})
     * @Rest\RequestParam(name="name",    description="Name of event type",            nullable=false)
     * @Rest\RequestParam(name="teacher", description="Boolean authorization teacher", nullable=false)
     * @Rest\RequestParam(name="tutor",   description="Boolean authorization teacher", nullable=false)
     * @Operation(
     *     path="/api/event_types",
     *     operationId="postEventTypeAction",
     *     tags={"Event Type"},
     *     summary="Add new event type",
     *     @SWG\Response(
     *         response="201",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
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
     * Update event type with id
     * @Rest\Patch("/api/event_types/{id}", requirements={"id": "\d+"}, name="patch_event_types_action")
     * @Rest\View(serializerGroups={"event_type"})
     * @Rest\RequestParam(name="name",    description="Name of event type",            nullable=true)
     * @Rest\RequestParam(name="teacher", description="Boolean authorization teacher", nullable=true)
     * @Rest\RequestParam(name="tutor",   description="Boolean authorization teacher", nullable=true)
     * @Operation(
     *     path="/api/event_types/{id}",
     *     operationId="patchEventTypeAction",
     *     tags={"Event Type"},
     *     summary="Update event type with id",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
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
     * Delete event type by id
     * @Rest\Delete("/api/event_types/{id}", requirements={"id": "\d+"}, name="delete_event_types_action")
     * @Rest\View(statusCode=204)
     * @Operation(
     *     path="/api/event_types/{id}",
     *     operationId="deleteEventTypeAction",
     *     tags={"Event Type"},
     *     summary="Delete event type by id",
     *     @SWG\Response(
     *         response="204",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
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