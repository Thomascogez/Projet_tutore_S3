<?php

namespace App\Repository;

use App\Entity\Groups;
use App\Entity\Session;
use App\Entity\SessionType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Session|null find($id, $lockMode = null, $lockVersion = null)
 * @method Session|null findOneBy(array $criteria, array $orderBy = null)
 * @method Session[]    findAll()
 * @method Session[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SessionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Session::class);
    }

    public function findByDate(\DateTime $from, \DateTime $to, ?Groups $group, ?SessionType $type)
    {
        $req = $this->createQueryBuilder('j')
            ->andWhere('j.createdAt BETWEEN :from AND :to')
            ->setParameter('from', $from )
            ->setParameter('to', $to)
            ->orderBy("j.createdAt");

        if($group) $req->andWhere(":group MEMBER OF j.groups")->setParameter("group", $group);
        if($type)  $req->andWhere("j.type = :type"           )->setParameter("type", $type->getName()  );

        return $req->getQuery()
            ->getResult();
    }
}
