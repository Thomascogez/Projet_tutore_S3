<?php


namespace App\Controller;


use App\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AbstractController extends \Symfony\Bundle\FrameworkBundle\Controller\AbstractController
{

    protected function userHasRole(User $user, String $role)
    {

        foreach ($user->getRoles() as $data) {
            if($role === $data) {
                return true;
            }
        }
        return false;
    }

    protected function isNotFound($error)
    {
        throw new NotFoundHttpException($error);
    }

    protected function notAuthorized()
    {
        return new JsonResponse(array("code" => 401, "message" => "Not authorized"), Response::HTTP_UNAUTHORIZED);
    }
}