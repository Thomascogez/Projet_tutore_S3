<?php

namespace App\Repository;

use App\Entity\AttachmentEvent;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method AttachmentEvent|null find($id, $lockMode = null, $lockVersion = null)
 * @method AttachmentEvent|null findOneBy(array $criteria, array $orderBy = null)
 * @method AttachmentEvent[]    findAll()
 * @method AttachmentEvent[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AttachmentEventRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AttachmentEvent::class);
    }
}
