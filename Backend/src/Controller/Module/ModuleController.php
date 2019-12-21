<?php


namespace App\Controller\Module;


use App\Controller\AbstractController;
use App\Entity\Module;
use App\Form\ModuleType;
use DateTime;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Symfony\Component\HttpFoundation\Request;
use Swagger\Annotations as SWG;

define("MODULES_NOT_FOUND", "Module is not found");

class ModuleController extends AbstractController
{

    /**
     * get module by id
     * @Rest\Get("/api/modules/{id}", requirements={"id": "\d+"}, name="get_module_action")
     * @Rest\View(serializerGroups={"modules_info"})
     * @Operation(
     *     path="/api/modules/{id}",
     *     operationId="getModuleAction",
     *     tags={"Module"},
     *     summary="get module by id",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getModuleAction(Request $request)
    {
        $module = $this->getDoctrine()->getRepository(Module::class)->find($request->get('id'));
        if (!$module) return $this->isNotFound(MODULES_NOT_FOUND);
        return $module;
    }

    /**
     * Get all modules
     * @Rest\Get("/api/modules", name="get_modules_action")
     * @Rest\View(serializerGroups={"modules_info"})
     * @Operation(
     *     path="/api/modules",
     *     operationId="getModulesAction",
     *     tags={"Module"},
     *     summary="Get all modules",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getModulesAction(Request $request)
    {
        return $this->getDoctrine()->getRepository(Module::class)->findAll();
    }


    /**
     * Add module
     * @Rest\Post("/api/modules", name="post_module_action")
     * @Rest\View(serializerGroups={"modules_info"})
     * @Rest\RequestParam(name="code",  description="Code of module", nullable=false)
     * @Rest\RequestParam(name="name",  description="Name of module", nullable=false)
     * @Rest\RequestParam(name="color",  description="Color of module", nullable=true)
     * @Operation(
     *     path="/api/modules",
     *     operationId="postModuleAction",
     *     tags={"Module"},
     *     summary="Add module",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
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
     * Update module by id
     * @Rest\Patch("/api/modules/{id}", name="patch_module_action", requirements={"id": "\d+"})
     * @Rest\View(serializerGroups={"modules_info"})
     * @Rest\RequestParam(name="code",   description="Code of module",  nullable=true)
     * @Rest\RequestParam(name="name",   description="Name of module",  nullable=true)
     * @Rest\RequestParam(name="color",  description="Color of module", nullable=true)
     * @Operation(
     *     path="/api/modules/{id}",
     *     operationId="patchModuleAction",
     *     tags={"Module"},
     *     summary="Update module by id",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
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
     * Delete module by id
     * @Rest\Delete("/api/modules/{id}", name="delete_module_action", requirements={"id": "\d+"})
     * @Rest\View(statusCode=204)
     * @Operation(
     *     path="/api/modules/{id}",
     *     operationId="deleteModuleAction",
     *     tags={"Module"},
     *     summary="Delete module by id",
     *     @SWG\Response(
     *         response="204",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
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
        return $this->getDoctrine()->getRepository(Module::class)->findAll();
    }
}