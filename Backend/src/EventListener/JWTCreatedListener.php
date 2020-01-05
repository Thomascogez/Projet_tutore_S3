<?php
namespace App\EventListener;

use App\Entity\User;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\RequestStack;


class JWTCreatedListener {

    /**
     * @var RequestStack
     */
    private $requestStack;
    private $entityManager;

    /**
     * @param RequestStack $requestStack
     */
    public function __construct(RequestStack $requestStack, EntityManagerInterface $entityManager)
    {
        $this->requestStack = $requestStack;
        $this->entityManager = $entityManager;
    }

    /**
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $request = $this->requestStack->getCurrentRequest();

        $user = $this->entityManager->getRepository(User::class)->findOneBy(array("username" => $event->getData()['username']));

        $payload       = $event->getData();
        $payload['id'] = $user->getId();

        $event->setData($payload);

        $header        = $event->getHeader();
        $header['cty'] = 'JWT';

        $event->setHeader($header);
    }
}