<?php
namespace App\Controller\User\Session;

use App\Controller\AbstractController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Swagger\Annotations as SWG;
use Symfony\Component\HttpFoundation\Request;

class UserSessionController extends AbstractController
{
    /**
     * Get session of user connected
     * @Rest\Get("api/users/sessions", name="get_my_sessions")
     * @Rest\View(serializerGroups={"session_detail"})
     * @Operation(
     *     path="/api/users/sessions",
     *     operationId="getMySession",
     *     tags={"User"},
     *     summary="Get session of user connected",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getMySession(Request $request)
    {
        $sessions = array();
        $tmp = $this->getUser()->getSessions();

        foreach ($tmp as $index) {
            //Set array with year, week number and day
            if(!isset($sessions[date('Y', $index->getCreatedAt()->getTimestamp())])){
                $sessions[date('Y', $index->getCreatedAt()->getTimestamp())] = array();
            }
            if(!isset($sessions[date('W', $index->getCreatedAt()->getTimestamp())])){
                $sessions[date('Y', $index->getCreatedAt()->getTimestamp())][date('W', $index->getCreatedAt()->getTimestamp())] = array();
            }
            if(!isset($sessions[date('d', $index->getCreatedAt()->getTimestamp())])){
                $sessions[date('Y', $index->getCreatedAt()->getTimestamp())][date('W', $index->getCreatedAt()->getTimestamp())][date('d', $index->getCreatedAt()->getTimestamp())] = array();
            }

            //Add to array the session
            $sessions[date('Y', $index->getCreatedAt()->getTimestamp())][date('W', $index->getCreatedAt()->getTimestamp())][date('d', $index->getCreatedAt()->getTimestamp())][] = $index;
        }

        //Return array of session
        return $sessions;
    }



    /**
     * Get events of user connected
     * @Rest\Get("api/users/events", name="get_my_events")
     * @Rest\View(serializerGroups={"events"})
     * @Operation(
     *     path="/api/users/events",
     *     operationId="getMyEvent",
     *     tags={"User"},
     *     summary="Get events of user connected",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getMyEvent(Request $request)
    {
        $event = array();
        $tmp = $this->getUser()->getEvents();

        foreach ($tmp as $index) {
            if(!isset($event[$index->getSession()->getId()])){
                $event[$index->getSession()->getId()] = array();
            }

            $event[$index->getSession()->getId()][] = $index;
        }

        return $event;
    }
}