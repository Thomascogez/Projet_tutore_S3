<?php

namespace App\Repository;

use App\Entity\RoleTypeEvent;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method RoleTypeEvent|null find($id, $lockMode = null, $lockVersion = null)
 * @method RoleTypeEvent|null findOneBy(array $criteria, array $orderBy = null)
 * @method RoleTypeEvent[]    findAll()
 * @method RoleTypeEvent[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RoleTypeEventRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RoleTypeEvent::class);
    }
}
