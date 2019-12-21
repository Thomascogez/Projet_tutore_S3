<?php


namespace App\Controller\User\Groups;

use App\Controller\User\UserController;
use App\Entity\Groups;
use App\Entity\User;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Swagger\Annotations as SWG;

define("GROUP_NOT_FOUND", "Group is not found");

class UserGroupsController extends UserController
{

    /**
     * Get all user groups with id user
     * @Rest\Get("/api/users/{id}/groups", requirements={"id": "\d+"}, name="get_users_groups_action")
     * @Rest\View(serializerGroups={"groups"})
     * @Operation(
     *     path="/api/users/{id}/groups",
     *     operationId="getUserGroupsAction",
     *     tags={"Group User"},
     *     summary="Get all user groups with id user",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getUserGroupsAction(Request $request)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($request->get('id'));
        if(!$user) return $this->isNotFound(USER_NOT_FOUND);

        return $user->getGroups();
    }

    /**
     * Get one user group with id user and id group
     * @Rest\Get("/api/users/{id}/groups/{id_group}", requirements={"id": "\d+", "id_group": "\d+"}, name="get_user_group_action")
     * @Rest\View(serializerGroups={"groups"})
     * @Operation(
     *     path="/api/users/{id}/groups/{id_group}",
     *     operationId="getUserGroupAction",
     *     tags={"Group User"},
     *     summary="Get one user group with id user and id group",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getUserGroupAction(Request $request)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($request->get('id'));
        if(!$user) return $this->isNotFound(USER_NOT_FOUND);

        $group = $this->getDoctrine()->getRepository(Groups::class)->find($request->get('id_group'));
        if(!$group) return $this->isNotFound(GROUP_NOT_FOUND);

        foreach ($user->getGroups() as $data) {
            if($data == $group) return $data;
        }
        return $this->notAuthorized();
    }

    /**
     * Add group on user with id user
     * @Rest\Post("/api/users/{id}/groups", name="add_users_groups_action")
     * @Rest\View(serializerGroups={"user"})
     * @Rest\RequestParam(name="group",  description="Group name", nullable=false)
     * @Operation(
     *     path="/api/users/{id}/groups",
     *     operationId="addUserGroupAction",
     *     tags={"Group User"},
     *     summary="Add group on user with id user",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function addUserGroupAction(Request $request)
    {
        if(!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $user = $this->getDoctrine()->getRepository(User::class)->find($request->get('id'));
        if(!$user) return $this->isNotFound(SESSION_NOT_FOUND);

        $group = $this->getDoctrine()->getRepository(Groups::class)->findOneBy(array("name" => $request->get('group')));
        if(!$group) return $this->isNotFound(GROUP_NOT_FOUND);

        foreach ($user->getGroups() as $data) {
            if($data === $group) return new JsonResponse(array("code" => 400, "error" => "This group is already affiliate"), Response::HTTP_BAD_REQUEST);
        }

        $user->addGroup($group);

        $manager = $this->getDoctrine()->getManager();
        $manager->persist($user);
        $manager->flush();
        return $user;
    }

    /**
     * Delete group on user with id user and id group
     * @Rest\Delete("/api/users/{id}/groups/{id_group}", requirements={"id": "\d+", "id_group": "\d+"}, name="delete_users_groups_action")
     * @Rest\View(serializerGroups={"groups"})
     * @Operation(
     *     path="/api/users/{id}/groups/{id_group}",
     *     operationId="deleteUserGroupAction",
     *     tags={"Group User"},
     *     summary="Delete group on user with id user and id group",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function deleteUserGroupAction(Request $request)
    {
        if(!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $user = $this->getDoctrine()->getRepository(User::class)->find($request->get('id'));
        if(!$user)
            return $this->isNotFound(SESSION_NOT_FOUND);

        $group = $this->getDoctrine()->getRepository(Groups::class)->findOneBy(array("id" => $request->get('id_group')));
        if(!$group) return $this->isNotFound(GROUP_NOT_FOUND);

        $test = false;
        foreach ($user->getGroups() as $data) {
            if($data === $group) $test = true;
        }
        if(!$test) return new JsonResponse(array("code" => 400, "error" => "This group is not affiliate"), Response::HTTP_BAD_REQUEST);
        else {
            $user->removeGroup($group);
            $manager = $this->getDoctrine()->getManager();
            $manager->persist($user);
            $manager->flush();
            return $user;
        }
    }

}