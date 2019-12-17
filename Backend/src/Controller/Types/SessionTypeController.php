<?php


namespace App\Controller\Types;


use App\Controller\AbstractController;
use App\Entity\SessionType;
use App\Form\SessionTypeType;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;

define("SESSION_TYPE_NOT_FOUND", "Session type not found");

class SessionTypeController extends AbstractController
{

    /**
     * @Rest\Get("/api/session_types/")
     * @Rest\View(serializerGroups={"session_type"})
     */
    public function getSessionTypesAction(Request $request)
    {
        return $this->getDoctrine()->getRepository(SessionType::class)->findAll();
    }

    /**
     * @Rest\Get("/api/session_types/{id}", requirements={"id": "\d+"})
     * @Rest\View(serializerGroups={"session_type"})
     */
    public function getSessionTypeAction(Request $request)
    {
        $sessType = $this->getDoctrine()->getRepository(SessionType::class)->find($request->get('id'));
        if(!$sessType)
            return $this->isNotFound(SESSION_TYPE_NOT_FOUND);

        return $sessType;
    }

    /**
     * @Rest\Post("/api/session_types")
     * @Rest\View(serializerGroups={"session_type"})
     */
    public function postSessionTypeAction(Request $request)
    {
        if(!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $sessType = new SessionType();
        $form = $this->createForm(SessionTypeType::class, $sessType);

        $form->submit($request->request->all());

        if($form->isValid()) {
            $manager = $this->getDoctrine()->getManager();
            $manager->persist($sessType);
            $manager->flush();
            return $sessType;
        } else {
            return $form;
        }
    }

    /**
     * @Rest\Patch("/api/session_types/{id}", requirements={"id": "\d+"})
     * @Rest\View(serializerGroups={"session_type"})
     */
    public function patchSessionTypeAction(Request $request)
    {
        if(!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $sessType = $this->getDoctrine()->getRepository(SessionType::class)->find($request->get('id'));
        if(!$sessType)
            return $this->isNotFound(SESSION_TYPE_NOT_FOUND);

        $form = $this->createForm(SessionTypeType::class, $sessType);

        $form->submit($request->request->all(), false);

        if($form->isValid()) {
            $manager = $this->getDoctrine()->getManager();
            $manager->persist($sessType);
            $manager->flush();
            return $sessType;
        } else {
            return $form;
        }
    }

    /**
     * @Rest\Delete("/api/session_types/{id}", requirements={"id": "\d+"})
     * @Rest\View(statusCode=204)
     */
    public function deleteSessionTypeAction(Request $request)
    {
        if(!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $sessType = $this->getDoctrine()->getRepository(SessionType::class)->find($request->get('id'));
        if(!$sessType)
            return $this->isNotFound(SESSION_TYPE_NOT_FOUND);

        $manager = $this->getDoctrine()->getManager();
        $manager->remove($sessType);
        $manager->flush();
    }
}