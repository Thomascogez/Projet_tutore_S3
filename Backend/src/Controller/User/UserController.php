<?php


namespace App\Controller\User;

use App\Controller\AbstractController;
use App\Entity\User;
use App\Form\UserType;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Swagger\Annotations as SWG;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

define("USER_NOT_FOUND", "User is not found");

class UserController extends AbstractController
{
    /**
     * Get user instantly connect
     * @Rest\Get("/api/users/my", name="get_my_users_action")
     * @Rest\View(serializerGroups={"user"})
     * @Operation(
     *     path="/api/users/my",
     *     operationId="GetMyUser",
     *     tags={"User"},
     *     summary="Get user instantly connect",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getMyUserAction(Request $request)
    {
        return $this->getUser();
    }

    /**
     * List of users
     * @Rest\Get("/api/users", name="get_users_action")
     * @Rest\View(serializerGroups={"user"})
     * @Operation(
     *     path="/api/users",
     *     operationId="GetUsers",
     *     tags={"User"},
     *     summary="List all users",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getUsersAction(Request $request)
    {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();

        return $users;
    }

    /**
     * Get one user by id
     * @Rest\Get("/api/users/{id}", requirements={"id": "\d+"}, name="get_user_action")
     * @Rest\View(serializerGroups={"user"})
     * @QueryParam(name="id", description="Id of user")
     * @Operation(
     *     path="/api/users/{id}",
     *     operationId="GetUser",
     *     tags={"User"},
     *     summary="One users with id",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getUserAction(Request $request)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($request->get('id'));
        if (empty($user)) return $this->isNotFound(USER_NOT_FOUND);
        return $user;
    }

    /**
     * Add new user
     * @Rest\Post("/api/users", name="post_user_action")
     * @Rest\View(serializerGroups={"user"}, statusCode=201)
     * @Rest\RequestParam(name="username",  description="Username of school", nullable=false)
     * @Rest\RequestParam(name="firstname", description="Firstname of user",  nullable=false)
     * @Rest\RequestParam(name="lastname",  description="Lastname of user",   nullable=false)
     * @Rest\RequestParam(name="roles",     description="Role of user : ['USER_TEACHER', 'USER_TUTOR', 'USER_ADMIN'", nullable=false)
     * @Operation(
     *     path="/api/users",
     *     operationId="PostUser",
     *     tags={"User"},
     *     summary="Create new user",
     *     @SWG\Response(
     *         response="201",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function postUsersAction(Request $request, UserPasswordEncoderInterface $encoder)
    {
        if(!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $user = new User();
        $user->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());

        $form = $this->createForm(UserType::class, $user, ['validation_groups'=>['Default', 'FullUpdate']]);

        $tmp = $request->get('roles');
        $test = false;
        if(isset($tmp) && $tmp != NULL) {
            $role = $user->getRoles();
            foreach ($request->get('roles') as $item) {
                if($item == "ROLE_TEACHER" || $item ==  "ROLE_ADMIN" || $item == "ROLE_TUTOR"){
                    $test = true;
                    array_push($role, $item);
                }
            }
            $user->setRoles($role);
        }
        if(!$test) {
            $form->add('roles');
        }
        $form->submit($request->request->all(), false);
        if(!$test) {
            $form->get('roles')->addError(new FormError("The choice is : ROLE_TEACHER, ROLE_ADMIN, ROLE_TUTOR"));
        }

        if($form->isValid()) {
            $user->setPassword($encoder->encodePassword($user, "123456"));
            $user->setPlainPassword("");

            $manager = $this->getDoctrine()->getManager();
            $manager->persist($user);
            $manager->flush();
            return $user;
        } else {
            return $form;
        }
    }


    /**
     * Patch user by id
     * @Rest\Patch("/api/users/{id}", name="patch_user_action")
     * @Rest\View(serializerGroups={"user"})
     * @Rest\RequestParam(name="username",  description="Username of school", nullable=true)
     * @Rest\RequestParam(name="firstname", description="Firstname of user",  nullable=true)
     * @Rest\RequestParam(name="lastname",  description="Lastname of user",   nullable=true)
     * @Rest\RequestParam(name="roles",     description="Role of user : ['USER_TEACHER', 'USER_TUTOR', 'USER_ADMIN'", nullable=true)
     * @Operation(
     *     path="/api/users/{id}",
     *     operationId="PatchUser",
     *     tags={"User"},
     *     summary="Update user",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function patchUsersAction(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($request->get('id'));
        if (empty($user)) return $this->isNotFound(USER_NOT_FOUND);

        $form = $this->createForm(UserType::class, $user);

        $tmp = $request->get('roles');
        $test = true;
        $role = array();
        if(isset($tmp) && $tmp != NULL) {
            foreach ($request->get('roles') as $item) {
                if($item != "ROLE_TEACHER" && $item !=  "ROLE_ADMIN" && $item != "ROLE_TUTOR") {
                    $test = false;
                } else {
                    array_push($role, $item);
                }
            }
            $user->setRoles($role);
        }
        if(!$test) {
            $form->add('roles');
            $form->get('roles')->addError(new FormError("Erreur"));
        }

        $form->submit($request->request->all(), false);

        if($form->isValid()) {
            $user->setUpdateAt(new \DateTime());
            if(!empty($user->getPlainPassword())){
                $user->setPassword($encoder->encodePassword($user, $user->getPlainPassword()));
                $user->setPlainPassword("");
            }

            $manager = $this->getDoctrine()->getManager();
            $manager->persist($user);
            $manager->flush();
            return $user;
        } else {
            return $form;
        }
    }

    /**
     * Delete user by id
     * @Rest\Delete("/api/users/{id}", name="delete_user_action")
     * @Rest\View(statusCode=Response::HTTP_NO_CONTENT)
     * @Operation(
     *     path="/api/users/{id}",
     *     operationId="DeleteUser",
     *     tags={"User"},
     *     summary="Delete user",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function deleteUserAction(Request $request)
    {
        if(!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $user = $this->getDoctrine()->getRepository(User::class)->find($request->get('id'));
        if (empty($user)) return $this->isNotFound(USER_NOT_FOUND);

        $manager = $this->getDoctrine()->getManager();
        $manager->remove($user);
        $manager->flush();
    }

    public function randomPassword($nb_car, $chaine = 'AZERTYUIOPQSDFGHJKLMWXCVBNazertyuiopqsdfghjklmwxcvbn123456789!_-@#$%&,.?:')
    {
        $nb_lettres = strlen($chaine) - 1;
        $generation = '';
        $re = '/^.*(?=.{8,})(?=.*[!-@#$%^&(),.?":{}|<>].*[!-@#$%^&(),.?":{}|<>].*)(?=.*[A-Z].*[A-Z].*)(?=.*[a-z].*[a-z].*).*$/m';
        while(!preg_match($re, $generation)) {
            $generation = '';
            for($i=0; $i < $nb_car; $i++)
            {
                $pos = mt_rand(0, $nb_lettres);
                $car = $chaine[$pos];
                $generation .= $car;
            }
        }
        return $generation;
    }
}