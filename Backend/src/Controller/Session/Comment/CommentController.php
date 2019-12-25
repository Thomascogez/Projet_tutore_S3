<?php

namespace App\Controller\Session\Comment;

use App\Controller\Session\SessionController;
use App\Entity\Comment;
use App\Entity\Session;
use App\Form\CommentType;
use FOS\RestBundle\Controller\Annotations as Rest;
use Nelmio\ApiDocBundle\Annotation\Operation;
use Swagger\Annotations as SWG;
use Symfony\Component\HttpFoundation\Request;

define("COMMENT_NOT_FOUND", "Comment not found");

class CommentController extends SessionController
{

    /**
     * Get comment by id
     * @Rest\Get("/api/sessions/{id_session}/comments/{id_comment}", name="get_comment_action", requirements={"id_session": "\d+", "id_comment": "\d+"})
     * @Rest\View(serializerGroups={"comment"})
     * @Operation(
     *     path="/api/sessions/{id_session}/comments/{id_comment}",
     *     operationId="getCommentAction",
     *     tags={"Comment"},
     *     summary="Get comment by id",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getCommentAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id_session'));
        if (!$session) return $this->isNotFound(SESSIONS_NOT_FOUND);

        $comment = $this->getDoctrine()->getRepository(Comment::class)->find($request->get('id_comment'));
        if (!$comment) return $this->isNotFound(COMMENT_NOT_FOUND);

        if ($comment->getSession() != $session) return $this->isNotFound("This event not in this session");

        return $comment;
    }

    /**
     * Get all comments
     * @Rest\Get("/api/sessions/{id_session}/comments", name="get_comments_action", requirements={"id_session": "\d+"})
     * @Rest\View(serializerGroups={"comment"})
     * @Operation(
     *     path="/api/sessions/{id_session}/comments",
     *     operationId="getCommentsAction",
     *     tags={"Comment"},
     *     summary="Get all comments",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function getCommentsAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id_session'));
        if (!$session) return $this->isNotFound(SESSIONS_NOT_FOUND);

        return $session->getComments();
    }

    /**
     * Add new comment on session
     * @Rest\Post("/api/sessions/{id_session}/comments", name="post_comment_action", requirements={"id_session": "\d+"})
     * @Rest\RequestParam(name="content", description="Content of comment", nullable=false)
     * @Rest\View(serializerGroups={"comment"}, statusCode=201)
     * @Operation(
     *     path="/api/sessions/{id_session}/comments",
     *     operationId="postCommentAction",
     *     tags={"Comment"},
     *     summary="Add new comment on session",
     *     @SWG\Response(
     *         response="201",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function postCommentAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id_session'));
        if (!$session) return $this->isNotFound(SESSIONS_NOT_FOUND);

        if ($session->getGroupe()->getUsers()->contains($this->getUser())) {
            $comment = new Comment();

            $form = $this->createForm(CommentType::class, $comment);
            $form->submit($request->request->all());

            if ($form->isValid()) {
                $comment->setSession($session)
                    ->setUser($this->getUser())
                    ->setCreatedAt(new \DateTime())
                    ->setUpdateAt(new \DateTime());

                $manager = $this->getDoctrine()->getManager();
                $manager->persist($comment);
                $manager->flush();
                return $comment;
            } else {
                return $form;
            }
        } else {
            return $this->notAuthorized();
        }
    }

    /**
     * Patch comment on session
     * @Rest\Patch("/api/sessions/{id_session}/comments/{id_comment}", name="get_comment_action", requirements={"id_session": "\d+", "id_comment": "\d+"})
     * @Rest\RequestParam(name="content", description="Content of comment", nullable=true)
     * @Rest\View(serializerGroups={"comment"}, statusCode=200)
     * @Operation(
     *     path="/api/sessions/{id_session}/comments",
     *     operationId="patchCommentAction",
     *     tags={"Comment"},
     *     summary="Patch comment on session",
     *     @SWG\Response(
     *         response="200",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function patchCommentAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id_session'));
        if (!$session) return $this->isNotFound(SESSIONS_NOT_FOUND);

        $comment = $this->getDoctrine()->getRepository(Comment::class)->find($request->get('id_comment'));
        if (!$comment) return $this->isNotFound(COMMENT_NOT_FOUND);

        if($this->getUser() === $comment->getUser()) {

            $form = $this->createForm(CommentType::class, $comment);
            $form->submit($request->request->all(), false);

            if ($form->isValid()) {
                $comment->setSession($session)
                    ->setUser($this->getUser())
                    ->setCreatedAt(new \DateTime())
                    ->setUpdateAt(new \DateTime());

                $manager = $this->getDoctrine()->getManager();
                $manager->persist($comment);
                $manager->flush();
                return $comment;
            } else {
                return $form;
            }
        } else {
            return $this->notAuthorized();
        }
    }

    /**
     * Delete comment by id and session id
     * @Rest\Delete("/api/sessions/{id_session}/comments/{id_comment}", name="delete_comment_action", requirements={"id_session": "\d+", "id_comment": "\d+"})
     * @Rest\View(serializerGroups={"comment"})
     * @Operation(
     *     path="/api/sessions/{id_session}/comments/{id_comment}",
     *     operationId="deleteCommentAction",
     *     tags={"Event"},
     *     summary="Delete comment by id and session id",
     *     @SWG\Response(
     *         response="204",
     *         description="Successful response",
     *         @SWG\Schema(
     *              type="json"
     *          )
     *     )
     * )
     */
    public function deleteCommentAction(Request $request)
    {
        $session = $this->getDoctrine()->getRepository(Session::class)->find($request->get('id_session'));
        if (!$session) return $this->isNotFound(SESSIONS_NOT_FOUND);

        $comment = $this->getDoctrine()->getRepository(Comment::class)->find($request->get('id_comment'));
        if (!$comment) return $this->isNotFound(COMMENT_NOT_FOUND);

        if ($this->getUser() === $comment->getUser()) {

            $manager = $this->getDoctrine()->getManager();
            $manager->remove($comment);
            $manager->flush();

            return $session->getComments();
        } else {
            return $this->notAuthorized();
        }
    }
}