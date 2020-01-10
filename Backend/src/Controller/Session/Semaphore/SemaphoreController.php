<?php

namespace App\Controller\Session\Semaphore;


use App\Controller\Session\SessionController;
use App\Entity\Semaphore;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Swagger\Annotations as SWG;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;

class SemaphoreController extends SessionController
{
    /**
     * Edit semaphore
     * @Rest\Patch("/api/semaphore/{id}", requirements={"id":"\d+"}, name="patch_semaphore_action")
     * @Rest\View(serializerGroups={"semaphore"}, statusCode=200)
     * @Rest\RequestParam(name="status", description="Status code", nullable=false)
     * @Operation(
     *     path="/api/semaphore/{id}",
     *     operationId="patchSemaphoreAction",
     *     tags={"Session"},
     *     summary="Patch semaphore",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function patchSemaphoreAction(ParamFetcherInterface $paramFetcher, Request $request){

        $semaphore = $this->getDoctrine()->getRepository(Semaphore::class)->find($request->get('id'));
        if (!$semaphore) return $this->isNotFound("Semaphore not found !");

        if($semaphore->getUser() === $this->getUser()) {
            $semaphore->setStatus($paramFetcher->get('status'));

            $manager = $this->getDoctrine()->getManager();
            $manager->persist($semaphore);
            $manager->flush();
        } else {
            return $this->notAuthorized();
        }

        return $semaphore;
    }
}