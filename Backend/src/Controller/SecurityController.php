<?php

namespace App\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class SecurityController extends AbstractController
{

    /**
     * Login route
     * @Rest\Post("/api/login_check", name="api_login")
     * @return Response
     * @Rest\RequestParam(name="username", description="Email of user")
     * @Rest\RequestParam(name="password", description="Password of user")
     */
    public function api_login(): Response
    {
        $user = $this->getUser();

        return new Response([
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
        ]);
    }

}
