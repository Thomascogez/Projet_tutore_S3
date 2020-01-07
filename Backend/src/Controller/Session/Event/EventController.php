<?php


namespace App\Controller\Session\Event;


use App\Controller\AbstractController;
use App\Entity\Event;
use App\Entity\EventType;
use App\Entity\Session;
use App\Entity\Setting;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Swagger\Annotations as SWG;

define("SESSIONS_NOT_FOUND", "Session not found");
define("EVENT_NOT_FOUND", "Event not found");

class EventController extends AbstractController
{

    /**
     * Get event by id
     * @Rest\Get("/api/sessions/{id_session}/events/{id_event}", name="get_event_action", requirements={"id_session": "\d+", "id_event": "\d+"})
     * @Rest\View(serializerGroups={"events"})
     * @Operation(
     *     path="/api/sessions/{id_session}/events/{id_event}",
     *     operationId="getEventAction",
     *     tags={"Event"},
     *     summary="Get event by id",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
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
     * Get all events
     * @Rest\Get("/api/sessions/{id_session}/events", name="get_events_action", requirements={"id_session": "\d+"})
     * @Rest\View(serializerGroups={"events"})
     * @Operation(
     *     path="/api/sessions/{id_session}/events",
     *     operationId="getEventsAction",
     *     tags={"Comment"},
     *     summary="Get all events",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getEventsAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id_session'));
        if (!$session) return $this->isNotFound(SESSIONS_NOT_FOUND);

        return $session->getEvents();
    }

    /**
     * Add new event on session
     * @Rest\Post("/api/sessions/{id_session}/events", name="post_event_action", requirements={"id_session": "\d+"})
     * @Rest\View(serializerGroups={"events"}, statusCode=201)
     * @Rest\RequestParam(name="name",     description="Name of event",     nullable=false)
     * @Rest\RequestParam(name="type",     description="Type of event",     nullable=false)
     * @Rest\RequestParam(name="duration", description="Duration of event", nullable=true )
     * @Rest\RequestParam(name="dueAt",    description="Due At of event",   nullable=true )
     * @Operation(
     *     path="/api/sessions/{id_session}/events",
     *     operationId="postEventAction",
     *     tags={"Event"},
     *     summary="Add new event on session",
     *     @SWG\Response(
     *         response="201",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function postEventAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id_session'));
        if (!$session) return $this->isNotFound(SESSIONS_NOT_FOUND);

        $test = false;
        foreach ($this->getUser()->getGroups() as $groups) {
            foreach ($session->getGroups() as $group) {
                if($groups === $group) $test = true;
            }
        }

        if ($test) {
            $event = new Event();

            $setting = $this->getDoctrine()->getRepository(Setting::class)->findAll();
            $setting = $setting[0];
            if(sizeof($session->getEvents()) >= $setting->getMaxEventSession())
                return new JsonResponse(array("code" => Response::HTTP_NOT_ACCEPTABLE, "message" => "Max event is exceeded, contact the administrator"),   Response::HTTP_NOT_ACCEPTABLE);

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
     * Update event by id and session id
     * @Rest\Patch("/api/sessions/{id_session}/events/{id_event}", name="patch_event_action", requirements={"id_session": "\d+", "id_event": "\d+"})
     * @Rest\View(serializerGroups={"events"})
     * @Rest\RequestParam(name="name",     description="Name of event",     nullable=true)
     * @Rest\RequestParam(name="type",     description="Type of event",     nullable=true)
     * @Rest\RequestParam(name="duration", description="Duration of event", nullable=true)
     * @Rest\RequestParam(name="dueAt",    description="Due At of event",   nullable=true)
     * @Operation(
     *     path="/api/sessions/{id_session}/events/{id_event}",
     *     operationId="patchEventAction",
     *     tags={"Event"},
     *     summary="Update event by id and session id",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
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
     * delete event by id and session id
     * @Rest\Delete("/api/sessions/{id_session}/events/{id_event}", name="delete_event_action", requirements={"id_session": "\d+", "id_event": "\d+"})
     * @Rest\View(serializerGroups={"events"})
     * @Operation(
     *     path="/api/sessions/{id_session}/events/{id_event}",
     *     operationId="deleteEventAction",
     *     tags={"Event"},
     *     summary="Delete event by id and session id",
     *     @SWG\Response(
     *         response="204",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
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

            return $session->getEvents();
        } else {
            return $this->notAuthorized();
        }
    }
}