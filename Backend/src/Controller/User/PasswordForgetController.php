<?php


namespace App\Controller\User;

use App\Entity\PasswordForget;
use App\Entity\User;
use App\Form\UserType;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Swagger\Annotations as SWG;

class PasswordForgetController extends UserController
{

    /**
     * Send email for set new password
     * @Rest\Get("/api/users/passwordReset")
     * @QueryParam(name="username", description="Username of user")
     * @Operation(
     *     path="/api/users/passwordReset",
     *     operationId="sendResetPasswordAction",
     *     tags={"Reset Password"},
     *     summary="Send email for set new password",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function sendResetPasswordAction(Request $request, \Swift_Mailer $mailer)
    {
        if($this->getUser())
            return $this->notAuthorized();
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(array('username' => $request->get('username')));
        if(empty($user)) return $this->isNotFound(USER_NOT_FOUND);

        $token = $this->getDoctrine()->getRepository(PasswordForget::class)->findOneBy(array('user' => $user));
        if(empty($token)) {
            $token = new PasswordForget();
            $token->setUser($user);
        }
        $token->setToken(md5(uniqid()));
        $token->setExpireAt(new \DateTime());
        $em = $this->getDoctrine()->getManager();
        $em->persist($token);
        $em->flush();

        $mailAddress = "";
        if($this->userHasRole($user, "ROLE_TEACHER"))
            $mailAddress= $user->getUsername() . "@univ-lehavre.fr";
        if($this->userHasRole($user, "ROLE_TUTOR"))
            $mailAddress= $user->getUsername() . "@etu.univ-lehavre.fr";

        $message = (new \Swift_Message('Mot de passe oublié'))
            ->setFrom(['contact@schoolshare.com' => "SchoolShare"])
            ->setTo(/*$mailAddress*/)
            ->setBody("Reinitialiser votre mot de passe ...")
            ->addPart($this->renderView(
                'mail/resetPassword.html.twig',
                [
                    'name' => $user->getFirstname(),
                    'token' => $token->getToken()
                ]
            ),
                'text/html'
            );

        $mailer->send($message);

        return new JsonResponse(array("code" => 200, "message" => "Email send"), Response::HTTP_OK);
    }


    /**
     * Verify token for access to change password page
     * @Rest\Post("/api/users/passwordReset")
     * @Rest\RequestParam(name="token",  description="Token password forget", nullable=false)
     * @Operation(
     *     path="/api/users/passwordReset",
     *     operationId="validTokenPasswordTokenAction",
     *     tags={"Reset Password"},
     *     summary="Verify token for access to change password page",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function validTokenPasswordTokenAction(Request $request)
    {
        if($this->getUser())
            return $this->notAuthorized();
        if($this->verifyToken($request)){
            return new JsonResponse(array("code" => 200), Response::HTTP_OK);
        }
        return new JsonResponse(array("code" => 406, "message" => "token expired"), Response::HTTP_NOT_ACCEPTABLE);
    }

    /**
     * Validate change password
     * @Rest\Patch("/api/users/passwordReset")
     * @Rest\View(serializerGroups={"user"})
     * @Rest\RequestParam(name="token",  description="Token password forget", nullable=false)
     * @Operation(
     *     path="/api/users/passwordReset",
     *     operationId="changePasswordAction",
     *     tags={"Reset Password"},
     *     summary="Validate change password",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function changePasswordAction (Request $request, UserPasswordEncoderInterface $encoder, \Swift_Mailer $mailer)
    {
        if($this->getUser())
            return $this->notAuthorized();

        if(!$this->verifyToken($request)) {
            return new JsonResponse(array("code" => 406, "message" => "token expired"), Response::HTTP_NOT_ACCEPTABLE);
        } else {
            $token = $this->getDoctrine()->getRepository(PasswordForget::class)->findOneBy(array("token" => $request->get('token')));
            $user = $token->getUser();
            $form = $this->createForm(UserType::class, $user);
            $form->submit(null, false);

            $user->setPlainPassword($this->randomPassword(12));
            if($form->isValid()) {
                if(!empty($user->getPlainPassword())){
                    if(password_verify($user->getPlainPassword(), $user->getPassword())) {
                        return new JsonResponse(array("code" => 400, "message" => "Password is identical"), Response::HTTP_BAD_REQUEST);
                    }
                    $encoded = $encoder->encodePassword($user, $user->getPlainPassword());
                    $user->setPassword($encoded);
                }

                $mailAddress = "";
                if($this->userHasRole($user, "ROLE_TEACHER"))
                    $mailAddress= $user->getUsername() . "@univ-lehavre.fr";
                if($this->userHasRole($user, "ROLE_TUTOR"))
                    $mailAddress= $user->getUsername() . "@etu.univ-lehavre.fr";

                $message = (new \Swift_Message('Nouveau mot de passe'))
                    ->setFrom(['contact@schoolshare.com' => "SchoolShare"])
                    ->setTo(/*$mailAddress*/)
                    ->setBody("Reinitialiser votre mot de passe ...")
                    ->addPart($this->renderView(
                        'mail/newPassword.html.twig',
                        [
                            'name' => $user->getFirstname(),
                            'password' => $user->getPlainPassword(),

                        ]
                    ),
                        'text/html'
                    );

                $mailer->send($message);

                $em = $this->getDoctrine()->getManager();
                $em->persist($user);
                $em->remove($token);
                $em->flush();
                return $user;
            } else {
                return $form;
            }
        }
    }


    private function verifyToken(Request $request)
    {
        $token = $this->getDoctrine()->getRepository(PasswordForget::class)->findOneBy(array("token" => $request->get('token')));
        if(empty($token)) return false;

        if($token->getExpireAt()->diff(new \DateTime())->days >= 1) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($token);
            $em->flush();
            return false;
        } else {
            return true;
        }
    }
}