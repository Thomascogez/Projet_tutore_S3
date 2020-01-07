<?php

namespace App\DataFixtures;

use App\Entity\AttachmentEvent;
use App\Entity\Comment;
use App\Entity\Event;
use App\Entity\EventType;
use App\Entity\Groups;
use App\Entity\Module;
use App\Entity\RoleTypeEvent;
use App\Entity\Semaphore;
use App\Entity\Session;
use App\Entity\SessionType;
use App\Entity\Setting;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
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

        $faker = Factory::create('fr_FR'); // create a French faker

        $setting = new Setting();
        $setting->setMaxAttachmentEvent(5)
            ->setMaxEventSession(5);
        $manager->persist($setting);

        $users = array();
        $user = new User();
        $user->setUsername("lepiverp")
            ->setFirstname("Philippe")
            ->setLastname("Le Pivert")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TEACHER"))
            ->setCreatedAt(new \DateTime())
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setUpdateAt(new \DateTime());
        $users[] = $user;

        $user = new User();
        $user->setUsername("boukachh")
            ->setFirstname("Boukachour")
            ->setLastname("Hadhoum")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TEACHER"))
            ->setCreatedAt(new \DateTime())
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setUpdateAt(new \DateTime());
        $users[] = $user;

        $user = new User();
        $user->setUsername("dufloh")
            ->setFirstname("Hugues")
            ->setLastname("Duflo")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TEACHER"))
            ->setCreatedAt(new \DateTime())
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setUpdateAt(new \DateTime());
        $users[] = $user;

        $user = new User();
        $user->setUsername("nivetl")
            ->setFirstname("Laurence")
            ->setLastname("Nivet")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TEACHER"))
            ->setCreatedAt(new \DateTime())
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setUpdateAt(new \DateTime());
        $users[] = $user;

        $user = new User();
        $user->setUsername("legrixb")
            ->setFirstname("Bruno")
            ->setLastname("Legrix")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TEACHER", "ROLE_ADMIN"))
            ->setCreatedAt(new \DateTime())
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setUpdateAt(new \DateTime());
        $users[] = $user;

        $user = new User();
        $user->setUsername("ba18xxxx")
            ->setFirstname("Arthur")
            ->setLastname("Baradel")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TUTOR"))
            ->setCreatedAt(new \DateTime())
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setUpdateAt(new \DateTime());
        $users[] = $user;

        $user = new User();
        $user->setUsername("lr18xxxx")
            ->setFirstname("Raphaël")
            ->setLastname("Lefebvre")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TUTOR"))
            ->setCreatedAt(new \DateTime())
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setUpdateAt(new \DateTime());
        $users[] = $user;

        $user = new User();
        $user->setUsername("rs18xxxx")
            ->setFirstname("Swan")
            ->setLastname("Remacle")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TUTOR"))
            ->setCreatedAt(new \DateTime())
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setUpdateAt(new \DateTime());
        $users[] = $user;

        $user = new User();
        $user->setUsername("ft18xxxx")
            ->setFirstname("Thibault")
            ->setLastname("Fouchet")
            ->setPassword($this->encoder->encodePassword($user, "123456"))
            ->setRoles(array("ROLE_TUTOR"))
            ->setCreatedAt(new \DateTime())
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setUpdateAt(new \DateTime());
        $users[] = $user;

        $modules = array();

        $module = new Module();
        $module->setCode("M1101")
            ->setColor("#B5B9CD")
            ->setName("Intro Système")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M1102")
            ->setColor("#BDD7EE")
            ->setName("Intro Algo")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[0]);
        $module->addUser($users[2]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M1103")
            ->setColor("#BDD7EE")
            ->setName("Algo Fondamentaux ")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[0]);
        $module->addUser($users[2]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M1104")
            ->setColor("#E9918D")
            ->setName("Bado 1")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[1]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M1105a")
            ->setColor("#E9918D")
            ->setName("CDIN (TD)")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M1105b")
            ->setColor("#D1AFDD")
            ->setName("CDIN (HTML)")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[1]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M1106")
            ->setColor("")
            ->setName("Projet 1")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[1]);
        $module->addUser($users[0]);
        $module->addUser($users[3]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M1106")
            ->setColor("")
            ->setName("Projet 1")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[1]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M1201")
            ->setColor("#C1E6AA")
            ->setName("Math discrètes")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M1202")
            ->setColor("#C1E6AA")
            ->setName("Algèbre linéaire")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M1203")
            ->setColor("")
            ->setName("Eco")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M1204")
            ->setColor("")
            ->setName("Fonct° Organisat°")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M1205")
            ->setColor("#F0D5F3")
            ->setName("Expression 1")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[3]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M1206")
            ->setColor("#F4EAD6")
            ->setName("Anglais 1")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[1]);
        $module->addUser($users[2]);
        $module->addUser($users[3]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M1207")
            ->setColor("")
            ->setName("PPP 1")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M2101")
            ->setColor("#B5B9CD")
            ->setName("Architecture")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[2]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M2102")
            ->setColor("#B5B9CD")
            ->setName("Réseaux 2")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[2]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M2103")
            ->setColor("#BDD7EE")
            ->setName("Concept° Objet")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[0]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M2104")
            ->setColor("#BDD7EE")
            ->setName("Prog Objet")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[0]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M2105")
            ->setColor("")
            ->setName("IHM")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[0]);
        $module->addUser($users[1]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M2106")
            ->setColor("#E9918D")
            ->setName("Bado 2")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M2107")
            ->setColor("")
            ->setName("Projet 2")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[0]);
        $module->addUser($users[1]);
        $module->addUser($users[2]);
        $module->addUser($users[3]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M2201")
            ->setColor("#C1E6AA")
            ->setName("Graphes & langages")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M2202")
            ->setColor("#C1E6AA")
            ->setName("Analyse & méth num")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M2203")
            ->setColor("#C1E6AA")
            ->setName("Gestion")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M2203")
            ->setColor("#C1E6AA")
            ->setName("Gestion")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M2204")
            ->setColor("#C1E6AA")
            ->setName("Gestion de projet")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M2205")
            ->setColor("#F0D5F3")
            ->setName("Expression 2")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[3]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M2206")
            ->setColor("#F4EAD6")
            ->setName("Anglais 2")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M2207")
            ->setColor("#F4EAD6")
            ->setName("PPP 2")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[1]);
        $module->addUser($users[2]);
        $module->addUser($users[3]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M3101")
            ->setColor("#B5B9CD")
            ->setName("Syst Exploitat°")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M3102")
            ->setColor("#B5B9CD")
            ->setName("Réseaux 3 ")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[2]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M3103")
            ->setColor("#BDD7EE")
            ->setName("Algo Av")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[0]);
        $module->addUser($users[1]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M3104a")
            ->setColor("#D1AFDD")
            ->setName("Prog web (PHP)")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[0]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M3104b")
            ->setColor("#D1AFDD")
            ->setName("Prog web (XML)")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[0]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M3105")
            ->setColor("#D1AFDD")
            ->setName("CPOA")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[1]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M3106C")
            ->setColor("#E9918D")
            ->setName("Bado 3")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M3201")
            ->setColor("#E9918D")
            ->setName("Proba Stat")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M3202C")
            ->setColor("#C1E6AA")
            ->setName("Modélisat° Math")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("OS06")
            ->setColor("#C1E6AA")
            ->setName("Analyse ")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M3203")
            ->setColor("")
            ->setName("Droit des TIC")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M3204")
            ->setColor("")
            ->setName("GSI")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M3205")
            ->setColor("#F0D5F3")
            ->setName("Expression 3")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[3]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M3206")
            ->setColor("#F4EAD6")
            ->setName("Anglais 3 ")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M3301")
            ->setColor("")
            ->setName("MPA")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M3302")
            ->setColor("")
            ->setName("Projet 3")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[0]);
        $module->addUser($users[1]);
        $module->addUser($users[2]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M3303")
            ->setColor("")
            ->setName("PPP 3")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[3]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M4101C")
            ->setColor("#B5B9CD")
            ->setName("ASR")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M4102C")
            ->setColor("")
            ->setName("Prog répartie")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[1]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M4104C")
            ->setColor("")
            ->setName("prog Modile")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M4105C")
            ->setColor("#D1AFDD")
            ->setName("Prog Web 4 ")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M4201C")
            ->setColor("")
            ->setName("Créat° Entreprise")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M4202C")
            ->setColor("")
            ->setName("Rech Opérationnelle")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M4203")
            ->setColor("#F0D5F3")
            ->setName("Expression 4")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[3]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("F0D5F3")
            ->setColor("")
            ->setName("Expression 4")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M4204")
            ->setColor("#F4EAD6")
            ->setName("Anglais 4")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("OS07")
            ->setColor("#C1E6AA")
            ->setName("Algèbre")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("OS08")
            ->setColor("#C1E6AA")
            ->setName("Trait. de l’info")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M4106")
            ->setColor("")
            ->setName("Projet 4")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[2]);
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("M4301")
            ->setColor("")
            ->setName("Stage")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $manager->persist($module);
        $modules[] = $module;

        $module = new Module();
        $module->setCode("Mtut")
            ->setColor("")
            ->setName("Tutorat")
            ->setCreatedAt(new \DateTime())
            ->setUpdateAt(new \DateTime());
        $module->addUser($users[5]);
        $module->addUser($users[6]);
        $module->addUser($users[7]);
        $module->addUser($users[8]);
        $manager->persist($module);
        $modules[] = $module;

        $typesSessions = array();
        $typeSession = new SessionType();
        $typeSession->setName("CM");
        $manager->persist($typeSession);
        $typesSessions[] = $typeSession;

        $typeSession = new SessionType();
        $typeSession->setName("TD");
        $manager->persist($typeSession);
        $typesSessions[] = $typeSession;

        $typeSession = new SessionType();
        $typeSession->setName("TP");
        $manager->persist($typeSession);
        $typesSessions[] = $typeSession;

        $typeSession = new SessionType();
        $typeSession->setName("Projet");
        $manager->persist($typeSession);
        $typesSessions[] = $typeSession;


        $typeEvents = array();

        $typeEvent = new EventType();
        $typeEvent->setName("Projet");
        $role = new RoleTypeEvent();
        $role->setTutor(true)->setTeacher(false)
            ->setEventType($typeEvent);
        $manager->persist($typeEvent);
        $manager->persist($role);
        $typeEvents[] = $typeEvent;

        $typeEvent = new EventType();
        $typeEvent->setName("fait");
        $role = new RoleTypeEvent();
        $role->setTutor(false)->setTeacher(true)
            ->setEventType($typeEvent);
        $manager->persist($typeEvent);
        $manager->persist($role);
        $typeEvents[] = $typeEvent;

        $typeEvent = new EventType();
        $typeEvent->setName("à faire");
        $role = new RoleTypeEvent();
        $role->setTutor(false)->setTeacher(true)
            ->setEventType($typeEvent);
        $manager->persist($typeEvent);
        $manager->persist($role);
        $typeEvents[] = $typeEvent;

        $typeEvent = new EventType();
        $typeEvent->setName("évaluation");
        $role = new RoleTypeEvent();
        $role->setTutor(false)->setTeacher(true)
            ->setEventType($typeEvent);
        $manager->persist($typeEvent);
        $manager->persist($role);
        $typeEvents[] = $typeEvent;

        $groups = array();

        $group = new Groups();
        $group->setName("info2")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)));
        $groups[0] = $group;

        $group = new Groups();
        $group->setName("info1")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)));
        $groups[1] = $group;

        $group = new Groups();
        $group->setName("A")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[0]);
        $groups[2] = $group;

        $group = new Groups();
        $group->setName("B")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[0]);
        $groups[3] = $group;

        $group = new Groups();
        $group->setName("C")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[0]);
        $groups[4] = $group;

        $group = new Groups();
        $group->setName("D")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[0]);
        $groups[5] = $group;

        $group = new Groups();
        $group->setName("F")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[1]);
        $groups[6] = $group;

        $group = new Groups();
        $group->setName("G")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[1]);
        $groups[7] = $group;

        $group = new Groups();
        $group->setName("H")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[1]);
        $groups[8] = $group;

        $group = new Groups();
        $group->setName("I")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[1]);
        $groups[9] = $group;

        $group = new Groups();
        $group->setName("J")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[1]);
        $groups[10] = $group;

        $group = new Groups();
        $group->setName("A1")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[2]);
        $groups[11] = $group;

        $group = new Groups();
        $group->setName("B1")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[3]);
        $groups[12] = $group;

        $group = new Groups();
        $group->setName("B2")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[3]);
        $groups[13] = $group;

        $group = new Groups();
        $group->setName("C1")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[4]);
        $groups[14] = $group;

        $group = new Groups();
        $group->setName("C2")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[4]);
        $groups[15] = $group;

        $group = new Groups();
        $group->setName("D1")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[5]);
        $groups[16] = $group;

        $group = new Groups();
        $group->setName("D2")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[5]);
        $groups[17] = $group;

        $group = new Groups();
        $group->setName("F1")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[6]);
        $groups[18] = $group;

        $group = new Groups();
        $group->setName("F2")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[6]);
        $groups[19] = $group;

        $group = new Groups();
        $group->setName("G1")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[7]);
        $groups[20] = $group;

        $group = new Groups();
        $group->setName("G2")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[7]);
        $groups[21] = $group;

        $group = new Groups();
        $group->setName("H1")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[8]);
        $groups[22] = $group;

        $group = new Groups();
        $group->setName("H2")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[8]);
        $groups[23] = $group;

        $group = new Groups();
        $group->setName("I1")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[9]);
        $groups[24] = $group;

        $group = new Groups();
        $group->setName("I2")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[9]);
        $groups[25] = $group;

        $group = new Groups();
        $group->setName("J1")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[10]);
        $groups[26] = $group;

        $group = new Groups();
        $group->setName("J2")
            ->setColor("#" . sprintf('%06x', mt_rand(0, 1<<18 - 1)))
            ->setParent($groups[10]);
        $groups[27] = $group;

        foreach ($users as $user) {
            for($j = 0; $j < 5; $j++) {
                $user->addGroup($groups[random_int(12, 27)]);
            }
            $manager->persist($user);
        }
        foreach ($groups as $group) {
            $manager->persist($group);
        }

        $sessions = array();

        for ($i = 12; $i < 27; $i++) {
            for ($j = 0; $j < 10; $j++) {
                $session = new Session();
                $session->setUser($users[random_int(0, 3)])
                    ->setModule($modules[random_int(0, sizeof($modules)-2)])
                    ->setCreatedAt($faker->dateTimeBetween("2019-09-01", "2020-06-30"))
                    ->setType($typesSessions[random_int(0, sizeof($typeEvents)-2)]->getName());
                for ($t = 0; $t < random_int(1, 5); $t++) $session->addGroup($groups[random_int(12, 27)]);
                $manager->persist($session);
                foreach ($users as $user) {
                    $sem = new Semaphore();
                    $sem->setUser($user)
                        ->setSession($session)
                        ->setStatus($faker->boolean);
                    $manager->persist($sem);
                }
                $sessions[] = $session;
            }
        }

        foreach ($sessions as $session) {
            for($i = 0; $i < random_int(0, 3); $i++) {
                $event = new Event();
                $event->setName($faker->text(60))
                    ->setDueAt($faker->dateTimeBetween("2019-09-01", "2020-06-30"))
                    ->setDuration($faker->numberBetween(0, 5))
                    ->setSession($session)
                    ->setUser($users[random_int(0, sizeof($users) - 2)])
                    ->setType($typeEvents[random_int(0, sizeof($typeEvents)-2)]->getName());
                for($j = 0; $j < random_int(0, 3); $j++) {
                    $attach = new AttachmentEvent();
                    $attach->setEvent($event)
                        ->setSource($faker->url);
                    $manager->persist($attach);
                }
                $manager->persist($event);
            }

            for($i = 0; $i < random_int(0, 5); $i++) {
                $comment = new Comment();
                $comment->setCreatedAt($faker->dateTimeBetween("2019-09-01", "2020-06-30"))
                    ->setUpdateAt($faker->dateTimeBetween("2019-09-01", "2020-06-30"))
                    ->setUser($users[random_int(0, sizeof($users) - 2)])
                    ->setSession($session)
                    ->setComment($faker->realText(300));
                $manager->persist($comment);
            }
        }

        $manager->flush();
    }
}