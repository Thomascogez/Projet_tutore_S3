<?php

namespace App\Repository;

use App\Entity\SessionType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method SessionType|null find($id, $lockMode = null, $lockVersion = null)
 * @method SessionType|null findOneBy(array $criteria, array $orderBy = null)
 * @method SessionType[]    findAll()
 * @method SessionType[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SessionTypeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SessionType::class);
    }
}
