<?php


namespace App\Controller\User\Groups;

use App\Controller\User\UserController;
use App\Entity\Groups;
use App\Entity\User;
use App\Form\UserGroupType;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

define("GROUP_NOT_FOUND", "Group is not found");

class UserGroupsController extends UserController
{

    /**
     * @Rest\Get("/api/users/{id}/groups", requirements={"id": "\d+"})
     * @Rest\View(serializerGroups={"groups"})
     */
    public function getUserGroupsAction(Request $request)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($request->get('id'));
        if(!$user) return $this->isNotFound(SESSION_NOT_FOUND);

        return $user->getGroups();
    }

    /**
     * @Rest\Get("/api/users/{id}/groups/{id_group}", requirements={"id": "\d+", "id_group": "\d+"})
     * @Rest\View(serializerGroups={"groups"})
     */
    public function getUserGroupAction(Request $request)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($request->get('id'));
        if(!$user) return $this->isNotFound(SESSION_NOT_FOUND);

        $group = $this->getDoctrine()->getRepository(Groups::class)->find($request->get('id_group'));
        if(!$group) return $this->isNotFound(GROUP_NOT_FOUND);

        foreach ($user->getGroups() as $data) {
            if($data == $group) return $data;
        }
        return $this->notAuthorized();
    }

    /**
     * @Rest\Post("/api/users/{id}/groups")
     * @Rest\View(serializerGroups={"user"})
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
     * @Rest\Delete("/api/users/{id}/groups/{id_group}", requirements={"id": "\d+", "id_group": "\d+"})
     * @Rest\View(serializerGroups={"user"})
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