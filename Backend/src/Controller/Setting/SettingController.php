<?php


namespace App\Controller\Setting;


use App\Controller\AbstractController;
use App\Entity\Setting;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Swagger\Annotations as SWG;

class SettingController extends AbstractController
{
    /**
     * Get settings of website
     * @Rest\Get("/api/settings", name="get_setting_action")
     * @Rest\View(serializerGroups={"settings"})
     * @Operation(
     *     path="/api/settings",
     *     operationId="getSettingsAction",
     *     tags={"Setting"},
     *     summary="Get settings of website",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getSettingsAction(Request $request)
    {
        $setting = $this->getDoctrine()->getRepository(Setting::class)->findAll();
        return $setting[0];
    }

    /**
     * Update settings of website
     * @Rest\Patch("/api/settings", name="update_setting_action")
     * @Rest\View(serializerGroups={"settings"})
     * @Rest\RequestParam(name="max_event", description="Max event per session",   nullable=true)
     * @Rest\RequestParam(name="max_attachment", description="Max attachment per event",   nullable=true)
     * @Operation(
     *     path="/api/settings",
     *     operationId="updateSettingAction",
     *     tags={"Setting"},
     *     summary="Update settings of website",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function updateSettingAction(Request $request)
    {
        if(!$this->userHasRole($this->getUser(), "ROLE_ADMIN"))
            return $this->notAuthorized();

        $setting = $this->getDoctrine()->getRepository(Setting::class)->findAll();
        $setting = $setting[0];

        $maxEvent = $request->get('max_event');
        $maxAttach = $request->get('max_attachment');

        if($maxEvent) {
            if(preg_match('/^\d+$/', $maxEvent)) {
                $setting->setMaxEventSession($maxEvent);
            } else {
                return new JsonResponse(array("code" => 400, "error" => "Max event is necessarily a integer"));
            }
        }
        if($maxAttach) {
            if(preg_match('/^\d+$/', $maxAttach)) {
                $setting->setAttachmentEvent($maxAttach);
            } else {
                return new JsonResponse(array("code" => 400, "error" => "Max attachment is necessarily a integer"));
            }
        }

        $manager = $this->getDoctrine()->getManager();
        $manager->persist($setting);
        $manager->flush();
        return $setting;
    }
}