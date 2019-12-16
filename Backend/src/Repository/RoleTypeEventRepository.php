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

    // /**
    //  * @return RoleTypeEvent[] Returns an array of RoleTypeEvent objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?RoleTypeEvent
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
