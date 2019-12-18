<?php


namespace App\Controller\User\Module;


use App\Controller\User\UserController;
use App\Entity\Module;
use App\Entity\User;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Swagger\Annotations as SWG;

define("MODULE_NOT_FOUND", "Module is not found");

class UserModulesController extends UserController
{

    /**
     * Get all user modules with user id
     * @Rest\Get("/api/users/{id}/modules", requirements={"id": "\d+"}, name="get_user_modules_action")
     * @Rest\View(serializerGroups={"modules"})
     * @Operation(
     *     path="/api/users/{id}/modules",
     *     operationId="getUserModulesAction",
     *     tags={"Module User"},
     *     summary="Get all user modules with user id",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getUserModulesAction(Request $request)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($request->get('id'));
        if(!$user) return $this->isNotFound(USER_NOT_FOUND);

        return $user->getModules();
    }

    /**
     * Get one user module with id user and id module
     * @Rest\Get("/api/users/{id}/modules/{id_module}", requirements={"id": "\d+", "id_module": "\d+"}, name="get_user_module_action")
     * @Rest\View(serializerGroups={"modules"})
     * @Operation(
     *     path="/api/users/{id}/modules/{id_module}",
     *     operationId="getUserModuleAction",
     *     tags={"Module User"},
     *     summary="Get one user module with id user and id module",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getUserModuleAction(Request $request)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($request->get('id'));
        if(!$user) return $this->isNotFound(USER_NOT_FOUND);

        $module = $this->getDoctrine()->getRepository(Module::class)->find($request->get('id_module'));
        if(!$module) return $this->isNotFound(MODULE_NOT_FOUND);

        foreach ($user->getModules() as $data) {
            if($data == $module) return $data;
        }
        return $this->notAuthorized();
    }

    /**
     * Add new user module with id user
     * @Rest\Post("/api/users/{id}/modules", name="add_user_module_action")
     * @Rest\View(serializerGroups={"user"})
     * @Rest\RequestParam(name="module",  description="Module code", nullable=false)
     * @Operation(
     *     path="/api/users/{id}/modules",
     *     operationId="addUserModuleAction",
     *     tags={"Module User"},
     *     summary="Add new user module with id user",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function addUserModuleAction(Request $request)
    {
        if(!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $user = $this->getDoctrine()->getRepository(User::class)->find($request->get('id'));
        if(!$user) return $this->isNotFound(USER_NOT_FOUND);

        $module = $this->getDoctrine()->getRepository(Module::class)->findOneBy(array("code" => $request->get('module')));
        if(!$module) return $this->isNotFound(MODULE_NOT_FOUND);

        foreach ($user->getModules() as $data) {
            if($data === $module) return new JsonResponse(array("code" => 400, "error" => "This module is already affiliate"), Response::HTTP_BAD_REQUEST);
        }

        $user->addModule($module);

        $manager = $this->getDoctrine()->getManager();
        $manager->persist($user);
        $manager->flush();
        return $user;
    }

    /**
     * Delete user module by id module and id user
     * @Rest\Delete("/api/users/{id}/modules/{id_module}", requirements={"id": "\d+", "id_module": "\d+"}, name="delete_user_module_action")
     * @Rest\View(serializerGroups={"user"})
     * @Operation(
     *     path="/api/users/{id}/modules/{id_module}",
     *     operationId="addUserModuleAction",
     *     tags={"Module User"},
     *     summary="Delete user module by id module and id user",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function deleteUserModuleAction(Request $request)
    {
        if(!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $user = $this->getDoctrine()->getRepository(User::class)->find($request->get('id'));
        if(!$user)
            return $this->isNotFound(SESSION_NOT_FOUND);

        $module = $this->getDoctrine()->getRepository(Module::class)->find(array("id" => $request->get('id_module')));
        if(!$module) return $this->isNotFound(MODULE_NOT_FOUND);

        $test = false;
        foreach ($user->getModules() as $data) {
            if($data === $module) $test = true;
        }
        if(!$test) return new JsonResponse(array("code" => 400, "error" => "This module is not affiliate"), Response::HTTP_BAD_REQUEST);
        else {
            $user->removeModule($module);
            $manager = $this->getDoctrine()->getManager();
            $manager->persist($user);
            $manager->flush();
            return $user;
        }
    }
}