<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setUsername("lepiverp")
            ->setFirstname("Philippe")
            ->setLastname("Le Pivert")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TEACHER"))
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($user);

        $user = new User();
        $user->setUsername("boukachh")
            ->setFirstname("Boukachour")
            ->setLastname("Hadhoum")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TEACHER"))
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($user);

        $user = new User();
        $user->setUsername("dufloh")
            ->setFirstname("Hugues")
            ->setLastname("Duflo")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TEACHER"))
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($user);

        $user = new User();
        $user->setUsername("nivetl")
            ->setFirstname("Laurence")
            ->setLastname("Nivet")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TEACHER"))
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($user);

        $user = new User();
        $user->setUsername("legrixb")
            ->setFirstname("Bruno")
            ->setLastname("Legrix")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TEACHER", "ROLE_ADMIN"))
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($user);

        $user = new User();
        $user->setUsername("ba18xxxx")
            ->setFirstname("Arthur")
            ->setLastname("Baradel")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TUTOR"))
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($user);

        $user = new User();
        $user->setUsername("lr18xxxx")
            ->setFirstname("Raphaël")
            ->setLastname("Lefebvre")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TUTOR"))
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($user);

        $user = new User();
        $user->setUsername("rs18xxxx")
            ->setFirstname("Swan")
            ->setLastname("Remacle")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TUTOR"))
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($user);

        $user = new User();
        $user->setUsername("ft18xxxx")
            ->setFirstname("Thibault")
            ->setLastname("Fouchet")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TUTOR"))
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($user);

        $manager->flush();
    }
}
