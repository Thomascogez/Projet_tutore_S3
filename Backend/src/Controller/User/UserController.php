<?php


namespace App\Controller\User;

use App\Entity\User;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class UserController extends AbstractController
{

    /**
     * @Rest\Get("/api/users")
     * @Rest\View(serializerGroups={"user"})
     */
    public function getUsersAction(Request $request)
    {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();

        return $users;
    }


}