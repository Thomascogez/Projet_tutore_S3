<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AbstractController extends \Symfony\Bundle\FrameworkBundle\Controller\AbstractController
{

    /**
     * Test if user as in role
     * @param User $user
     * @param String $role
     * @return bool
     */
    protected function userHasRole(User $user, String $role)
    {
        foreach ($user->getRoles() as $data) {
            if($role === $data) {
                return true;
            }
        }
        return false;
    }

    /**
     * Set template return for not found ressource
     * @param $error
     */
    protected function isNotFound($error)
    {
        throw new NotFoundHttpException($error);
    }

    /**
     * Set template return not authorized
     * @return JsonResponse
     */
    protected function notAuthorized()
    {
        return new JsonResponse(array("code" => 401, "message" => "Not authorized"), Response::HTTP_UNAUTHORIZED);
    }
}