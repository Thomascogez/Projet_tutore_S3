<?php


namespace App\Controller\Session\Event;


use App\Entity\AttachmentEvent;
use App\Entity\Event;
use App\Entity\Session;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Request;

define("ATTACHMENT_NOT_FOUND", "Attachment not found");

class AttachmentEventController extends EventController
{

    /**
     * @Rest\Get("/api/sessions/{id_session}/events/{id_event}/attachments/{id_attachment}", requirements={"id_session": "\d+", "id_event": "\d+", "id_attachment": "\d+"})
     * @Rest\View(serializerGroups={"attachment"})
     */
    public function getAttachmentEventAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id_session'));
        if (!$session) return $this->isNotFound(SESSIONS_NOT_FOUND);

        $event = $this->getDoctrine()->getRepository(Event::class)->find($request->get('id_event'));
        if (!$event) return $this->isNotFound(EVENT_NOT_FOUND);

        if (!$session->getEvents()->contains($event))
            return $this->isNotFound(EVENT_NOT_FOUND);

        $attach = $this->getDoctrine()->getRepository(AttachmentEvent::class)->find($request->get('id_attachment'));
        if (!$attach) return $this->isNotFound(ATTACHMENT_NOT_FOUND);

        if ($event->getAttachmentEvents()->contains($attach)) {
            return $attach;
        } else {
            return $this->isNotFound(ATTACHMENT_NOT_FOUND);
        }
    }

    /**
     * @Rest\Get("/api/sessions/{id_session}/events/{id_event}/attachments", requirements={"id_session": "\d+", "id_event": "\d+"})
     * @Rest\View(serializerGroups={"attachment"})
     */
    public function getAttachmentsEventAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id_session'));
        if (!$session) return $this->isNotFound(SESSIONS_NOT_FOUND);

        $event = $this->getDoctrine()->getRepository(Event::class)->find($request->get('id_event'));
        if (!$event) return $this->isNotFound(EVENT_NOT_FOUND);

        if (!$session->getEvents()->contains($event))
            return $this->isNotFound(EVENT_NOT_FOUND);

        return $event->getAttachmentEvents();
    }


    /**
     * @Rest\Post("/api/sessions/{id_session}/events/{id_event}/attachments", requirements={"id_session": "\d+", "id_event": "\d+"})
     * @Rest\View(serializerGroups={"attachment"})
     */
    public function postAttachmentsEventAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id_session'));
        if (!$session) return $this->isNotFound(SESSIONS_NOT_FOUND);

        $event = $this->getDoctrine()->getRepository(Event::class)->find($request->get('id_event'));
        if (!$event) return $this->isNotFound(EVENT_NOT_FOUND);

        if (!$session->getEvents()->contains($event))
            return $this->isNotFound(EVENT_NOT_FOUND);

        if ($event->getUser() == $this->getUser()) {

            $attachment = new AttachmentEvent();

            $file = $request->files->get('source');
            $filename = "";

            if ($file) {
                $originFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                $safeFilename = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()', $originFilename);
                $newFilename = $safeFilename . '-' . uniqid();

                try {
                    $file->move(
                        $this->getParameter('documents_directory') . '/' . $newFilename . '-' . date("Y") . '-' . date('m'),
                        $file->getClientOriginalName()
                    );
                    $filename = $request->getSchemeAndHttpHost() . '/uploads/attachmentEvent/' . $newFilename . '-' . date("Y") . '-' . date('m') . '/' . $file->getClientOriginalName();
                } catch (FileException $e) {
                    return $e;
                }

                $attachment->setSource($filename);
                $attachment->setEvent($event);

                $manager = $this->getDoctrine()->getManager();
                $manager->persist($attachment);
                $manager->flush();

                return $attachment;
            } else {
                return $this->isNotFound("The file not found");
            }
        } else {
            return $this->notAuthorized();
        }
    }

    /**
     * @Rest\Delete("/api/sessions/{id_session}/events/{id_event}/attachments/{id_attachment}", requirements={"id_session": "\d+", "id_event": "\d+", "id_attachment": "\d+"})
     * @Rest\View(statusCode=204)
     */
    public function deleteAttachmentEventAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id_session'));
        if (!$session) return $this->isNotFound(SESSIONS_NOT_FOUND);

        $event = $this->getDoctrine()->getRepository(Event::class)->find($request->get('id_event'));
        if (!$event) return $this->isNotFound(EVENT_NOT_FOUND);

        if (!$session->getEvents()->contains($event))
            return $this->isNotFound(EVENT_NOT_FOUND);

        $attach = $this->getDoctrine()->getRepository(AttachmentEvent::class)->find($request->get('id_attachment'));
        if (!$attach) return $this->isNotFound(ATTACHMENT_NOT_FOUND);


        if ($event->getUser() == $this->getUser() && $event->getAttachmentEvents()->contains($attach)) {

            $manager = $this->getDoctrine()->getManager();
            $manager->remove($attach);
            $manager->flush();
        } else {
            return $this->notAuthorized();
        }
    }


}