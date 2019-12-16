<?php


namespace App\Controller\User;

use App\Controller\AbstractController;
use App\Entity\User;
use App\Form\UserType;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

define("USER_NOT_FOUND", "User is not found");

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

    /**
     * @Rest\Get("/api/users/{id}", requirements={"id": "\d+"})
     * @Rest\View(serializerGroups={"user"})
     */
    public function getUserAction(Request $request)
    {
        $user = $this->getDoctrine()->getRepository(User::class)->find($request->get('id'));
        if (empty($user)) return $this->isNotFound(USER_NOT_FOUND);
        return $user;
    }

    /**
     * @Rest\Post("/api/users")
     * @Rest\View(serializerGroups={"user"}, statusCode=201)
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
            $form->get('roles')->addError(new FormError("Erreur"));
        }

        $form->submit($request->request->all(), false);

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
     * Patch user
     * @Rest\Patch("/api/users/{id}")
     * @Rest\View(serializerGroups={"user"})
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
}