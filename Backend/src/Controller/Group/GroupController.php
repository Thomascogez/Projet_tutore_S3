<?php


namespace App\Controller\Group;


use App\Controller\AbstractController;
use App\Entity\Groups;
use App\Form\GroupType;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;

define("GROUPS_NOT_FOUND", "Groupe is not found");

class GroupController extends AbstractController
{

    /**
     * @Rest\Get("/api/groups/{id}", requirements={"id": "\d+"})
     * @Rest\View(serializerGroups={"group_info"})
     */
    public function getGroupAction(Request $request)
    {
        $group = $this->getDoctrine()->getRepository(Groups::class)->find($request->get("id"));
        if (!$group) return $this->isNotFound(GROUPS_NOT_FOUND);

        return $group;
    }

    /**
     * @Rest\Get("/api/groups")
     * @Rest\View(serializerGroups={"group_info"})
     */
    public function getGroupsAction(Request $request)
    {
        return $this->getDoctrine()->getRepository(Groups::class)->findAll();
    }

    /**
     * @Rest\Post("/api/groups")
     * @Rest\View(serializerGroups={"group_info"})
     */
    public function postGroupAction(Request $request)
    {
        if (!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $group = new Groups();

        $form = $this->createForm(GroupType::class, $group);

        $form->submit(array("name" => $request->get('name')), false);

        $parent = null;
        if ($request->get('parent')) {
            $parent = $this->getDoctrine()->getRepository(Groups::class)->findOneBy(array("name" => $request->get('parent')));
            if (!$parent) {
                $form->get('parent')->addError(new FormError("Parent is not found"));
            }
        }

        if ($form->isValid()) {
            $group->setParent($parent);

            $manager = $this->getDoctrine()->getManager();
            $manager->persist($group);
            $manager->flush();
            return $group;
        }

        return $form;
    }

    /**
     * @Rest\Patch("/api/groups/{id}", requirements={"id": "\d+"})
     * @Rest\View(serializerGroups={"group_info"})
     */
    public function patchGroupAction(Request $request)
    {
        if (!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $group = $this->getDoctrine()->getRepository(Groups::class)->find($request->get("id"));
        if (!$group) return $this->isNotFound(GROUPS_NOT_FOUND);

        $form = $this->createForm(GroupType::class, $group);

        $form->submit(($request->get('name')) ? array("name" => $request->get('name')) : null, false);

        $parent = null;
        if ($request->get('parent')) {
            $parent = $this->getDoctrine()->getRepository(Groups::class)->findOneBy(array("name" => $request->get('parent')));
            if (!$parent) {
                $form->get('parent')->addError(new FormError("Parent is not found"));
            } else {
                if ($parent != $group) {
                    $group->setParent($parent);
                } else {
                    $form->get('parent')->addError(new FormError("Parent not this"));
                }
            }
        }

        if ($form->isValid()) {

            $manager = $this->getDoctrine()->getManager();
            $manager->persist($group);
            $manager->flush();
            return $group;
        }

        return $form;
    }

    /**
     * @Rest\Delete("/api/groups/{id}", requirements={"id": "\d+"})
     * @Rest\View(statusCode=204)
     */
    public function deleteGroupAction(Request $request)
    {
        if (!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $group = $this->getDoctrine()->getRepository(Groups::class)->find($request->get("id"));
        if (!$group) return $this->isNotFound(GROUPS_NOT_FOUND);

        $manager = $this->getDoctrine()->getManager();
        $manager->remove($group);
        $manager->flush();

    }
}