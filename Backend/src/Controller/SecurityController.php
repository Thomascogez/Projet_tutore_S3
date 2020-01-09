<?php

namespace App\Controller;

use App\Entity\AttachmentEvent;
use FOS\RestBundle\Controller\Annotations as Rest;
use App\Controller\AbstractController;
use Nelmio\ApiDocBundle\Annotation\Model;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Swagger\Annotations as SWG;
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
     * @Operation(
     *     operationId="Login",
     *     tags={"Login"},
     *     summary="Get token with connection",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function api_login(): Response
    {
        $user = $this->getUser();

        $json = new JsonResponse(array(
            "jwt" => new Response([
                    'email' => $user->getEmail(),
                    'roles' => $user->getRoles(),
                ]),
            "users" => $this->getUser()
        ));

        print_r($json);


        return $json;/* new Response([
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
        ]);*/
    }


}
