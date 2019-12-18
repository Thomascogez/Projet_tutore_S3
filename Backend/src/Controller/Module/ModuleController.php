<?php


namespace App\Controller\Module;


use App\Controller\AbstractController;
use App\Entity\Module;
use App\Form\ModuleType;
use DateTime;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;

define("MODULES_NOT_FOUND", "Module is not found");

class ModuleController extends AbstractController
{

    /**
     * @Rest\Get("/api/modules/{id}", requirements={"id": "\d+"})
     * @Rest\View(serializerGroups={"modules_info"})
     */
    public function getModuleAction(Request $request)
    {
        $module = $this->getDoctrine()->getRepository(Module::class)->find($request->get('id'));
        if (!$module) return $this->isNotFound(MODULES_NOT_FOUND);
        return $module;
    }

    /**
     * @Rest\Get("/api/modules")
     * @Rest\View(serializerGroups={"modules_info"})
     */
    public function getModulesAction(Request $request)
    {
        return $this->getDoctrine()->getRepository(Module::class)->findAll();
    }


    /**
     * @Rest\Post("/api/modules")
     * @Rest\View(serializerGroups={"modules_info"})
     */
    public function postModuleAction(Request $request)
    {
        if (!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $module = new Module();
        $module->setUpdateAt(new DateTime())
            ->setCreatedAt(new DateTime());

        $form = $this->createForm(ModuleType::class, $module);
        $form->submit($request->request->all());

        if ($form->isValid()) {
            $manager = $this->getDoctrine()->getManager();
            $manager->persist($module);
            $manager->flush();
            return $module;
        } else {
            return $form;
        }
    }

    /**
     * @Rest\Patch("/api/modules/{id}", requirements={"id": "\d+"})
     * @Rest\View(serializerGroups={"modules_info"})
     */
    public function patchModuleAction(Request $request)
    {
        if (!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $module = $this->getDoctrine()->getRepository(Module::class)->find($request->get('id'));
        if (!$module) return $this->isNotFound(MODULES_NOT_FOUND);

        $form = $this->createForm(ModuleType::class, $module);
        $form->submit($request->request->all(), false);

        if ($form->isValid()) {
            $module->setUpdateAt(new DateTime());
            $manager = $this->getDoctrine()->getManager();
            $manager->persist($module);
            $manager->flush();
            return $module;
        } else {
            return $form;
        }
    }

    /**
     * @Rest\Delete("/api/modules/{id}", requirements={"id": "\d+"})
     * @Rest\View(statusCode=204)
     */
    public function deleteModuleAction(Request $request)
    {
        if (!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $module = $this->getDoctrine()->getRepository(Module::class)->find($request->get('id'));
        if (!$module) return $this->isNotFound(MODULES_NOT_FOUND);

        $manager = $this->getDoctrine()->getManager();
        $manager->remove($module);
        $manager->flush();
    }
}