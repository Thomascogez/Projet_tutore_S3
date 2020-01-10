<?php

namespace App\Repository;

use App\Entity\PasswordForget;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method PasswordForget|null find($id, $lockMode = null, $lockVersion = null)
 * @method PasswordForget|null findOneBy(array $criteria, array $orderBy = null)
 * @method PasswordForget[]    findAll()
 * @method PasswordForget[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PasswordForgetRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PasswordForget::class);
    }
}
