<?php


namespace App\Controller\Group;


use App\Controller\AbstractController;
use App\Entity\Groups;
use App\Form\GroupType;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Swagger\Annotations as SWG;

define("GROUPS_NOT_FOUND", "Groupe is not found");

class GroupController extends AbstractController
{

    /**
     * Get one group by id
     * @Rest\Get("/api/groups/{id}", name="get_group_action", requirements={"id": "\d+"})
     * @Rest\View(serializerGroups={"group_info"})
     * @Operation(
     *     path="/api/groups/{id}",
     *     operationId="GetGroupAction",
     *     tags={"Group"},
     *     summary="Get one group by id",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getGroupAction(Request $request)
    {
        $group = $this->getDoctrine()->getRepository(Groups::class)->find($request->get("id"));
        if (!$group) return $this->isNotFound(GROUPS_NOT_FOUND);

        return $group;
    }

    /**
     * Get all groups
     * @Rest\Get("/api/groups", name="get_groups_action")
     * @Rest\View(serializerGroups={"group_info"})
     * @Operation(
     *     path="/api/groups",
     *     operationId="getGroupsAction",
     *     tags={"Group"},
     *     summary="Get all groups",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getGroupsAction(Request $request)
    {
        return $this->getDoctrine()->getRepository(Groups::class)->findAll();
    }

    /**
     * Add group
     * @Rest\Post("/api/groups", name="post_group_action")
     * @Rest\View(serializerGroups={"group_info"})
     * @Rest\RequestParam(name="name",  description="Name of group", nullable=false)
     * @Rest\RequestParam(name="parent",  description="Parent name of group", nullable=true)
     * @Operation(
     *     path="/api/groups",
     *     operationId="postGroupAction",
     *     tags={"Group"},
     *     summary="Add group",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
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
     * Update group by id
     * @Rest\Patch("/api/groups/{id}", name="patch_group_action", requirements={"id": "\d+"})
     * @Rest\RequestParam(name="name",  description="Name of group", nullable=true)
     * @Rest\RequestParam(name="parent",  description="Parent name of group", nullable=true)
     * @Rest\View(serializerGroups={"group_info"})
     * @Operation(
     *     path="/api/groups/{id}",
     *     operationId="patchGroupAction",
     *     tags={"Group"},
     *     summary="Update group by id",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
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
     * Delete group by id
     * @Rest\Delete("/api/groups/{id}", name="delete_group_action", requirements={"id": "\d+"})
     * @Rest\View(statusCode=204)
     * @Operation(
     *     path="/api/groups/{id}",
     *     operationId="deleteGroupAction",
     *     tags={"Group"},
     *     summary="Delete group by id",
     *     @SWG\Response(
     *         response="204",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
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