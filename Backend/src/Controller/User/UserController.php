<?php


namespace App\Controller\User;

use App\Controller\AbstractController;
use App\Entity\Groups;
use App\Entity\Module;
use App\Entity\User;
use App\Form\UserType;
use Faker\Factory;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\Annotations\QueryParam;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Swagger\Annotations as SWG;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

define("USER_NOT_FOUND", "Utilisateur non trouvé");

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
     * @Rest\RequestParam(name="modules",    description="Array of modules",   nullable=true)
     * @Rest\RequestParam(name="groups",    description="Array of groups ",   nullable=true)
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
    public function postUsersAction(Request $request, UserPasswordEncoderInterface $encoder, \Swift_Mailer $mailer)
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
            $form->get('roles')->addError(new FormError("The choice is : ROLE_TEACHER, ROLE_ADMIN, ROLE_TUTOR"));
        }
        foreach ($request->get('groups') as $groupReq) {
            $group = $this->getDoctrine()->getRepository(Groups::class)->findOneBy(array("name" => $groupReq));

            if(!$group) $form->get('groups')->addError(new FormError("Group " . $groupReq . " don't exist  "));
            else $user->addGroup($group);
        }

        foreach ($request->get('modules') as $moduleReq) {
            $module = $this->getDoctrine()->getRepository(Module::class)->findOneBy(array("code" => $moduleReq));

            if(!$module) $form->get('modules')->addError(new FormError("Module " . $moduleReq . " don't exist  "));
            else $user->addModule($module);
        }

        $user->setUsername($request->get('username'));
        $user->setFirstname($request->get('firstname'));
        $user->setLastname($request->get('lastname'));

        $form->submit(null, false);
        if($form->isValid()) {
            $user->setPlainPassword($this->randomPassword(12));

            $mailAddress = "";
            if($this->userHasRole($user, "ROLE_TEACHER"))
                $mailAddress= $user->getUsername() . "@univ-lehavre.fr";
            if($this->userHasRole($user, "ROLE_TUTOR"))
                $mailAddress= $user->getUsername() . "@etu.univ-lehavre.fr";

            $message = (new \Swift_Message('Création du compte SchoolShare'))
                ->setFrom(['contact@schoolshare.com' => "SchoolShare"])
                ->setTo(/*$mailAddress*/"aerosmith129@gmail.com")
                ->setBody("Nouveau compte sur SchoolShare ...")
                ->addPart($this->renderView(
                    'mail/newPassword.html.twig',
                    [
                        'name' => $user->getFirstname(),
                        'username' => $user->getUsername(),
                        'password' => $user->getPlainPassword(),
                        'type' => "create"
                    ]
                ),
                    'text/html'
                );

            $mailer->send($message);

            $faker = Factory::create('fr_FR'); // create a French faker

            $user->setPassword($encoder->encodePassword($user, $user->getPlainPassword()));
            $user->setPlainPassword("");
            $user->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)));

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
     * @Rest\RequestParam(name="username",       description="Username of school", nullable=true)
     * @Rest\RequestParam(name="firstname",      description="Firstname of user",  nullable=true)
     * @Rest\RequestParam(name="lastname",       description="Lastname of user",   nullable=true)
     * @Rest\RequestParam(name="plainPassword",  description="Password of user",   nullable=true)
     * @Rest\RequestParam(name="module",         description="Array of modules",   nullable=true)
     * @Rest\RequestParam(name="groups",         description="Array of groups ",   nullable=true)
     * @Rest\RequestParam(name="color",          description="Color of user",   nullable=true)
     * @Rest\RequestParam(name="roles",          description="Role of user : ['USER_TEACHER', 'USER_TUTOR', 'USER_ADMIN'", nullable=true)
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

        $groups = $request->get('groups');
        if($groups != null) {
            foreach ($request->get('groups') as $groupReq) {
                $group = $this->getDoctrine()->getRepository(Groups::class)->findOneBy(array("name" => $groupReq));

                if(!$group) $form->get('groups')->addError(new FormError("Group " . $groupReq . " don't exist  "));
                else $user->addGroup($group);
            }
        }

        $modules = $request->get('module');
        if($modules != null) {
            foreach ($request->get('modules') as $moduleReq) {
                $module = $this->getDoctrine()->getRepository(Module::class)->findOneBy(array("code" => $moduleReq));

                if(!$module) $form->get('modules')->addError(new FormError("Module " . $moduleReq . " don't exist  "));
                else $user->addModule($module);
            }
        }

        $form->submit($request->request->all(), false);

        if($request->get('plainPassword') != null){
            $re = '/^.*(?=.{8,})(?=.*[!-@#$%^&(),.?":{}|<>].*[!-@#$%^&(),.?":{}|<>].*)(?=.*[A-Z].*[A-Z].*)(?=.*[a-z].*[a-z].*).*$/m';
            if(!preg_match($re, $user->getPlainPassword())) {
                $form->get('plainPassword')->addError(new FormError("Password don't respect : 8 length, 2 uppercase, 2 lowercase, 2 special character"));
            }
            $user->setPassword($encoder->encodePassword($user, $user->getPlainPassword()));
            $user->setPlainPassword("");
        }

        if($form->isValid()) {
            $user->setUpdateAt(new \DateTime());

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
     * @Rest\View(statusCode=Response::HTTP_NO_CONTENT, serializerGroups={"user"})
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
        return $this->getDoctrine()->getRepository(User::class)->findAll();
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

    /**
     * Get if current user is admin
     * @Rest\Get("/api/users/isAdmin", name="get_user_is_admin_action")
     * @Rest\View()
     * @Operation(
     *     path="/api/users/isAdmin",
     *     operationId="getIsAdminAction",
     *     tags={"User"},
     *     summary="Get if current user is admin",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getIsAdminAction()
    {
        if($this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return new JsonResponse(array("code" => Response::HTTP_OK, "message" => "true"), Response::HTTP_OK);
        else
            return $this->notAuthorized();
    }
}