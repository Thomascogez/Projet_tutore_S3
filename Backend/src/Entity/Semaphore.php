<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Semaphore for status new or read
 * @ORM\Entity(repositoryClass="App\Repository\SemaphoreRepository")
 */
class Semaphore
{
    /**
     * Id semaphore
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user", "session_detail"})
     */
    private $id;

    /**
     * User semaphore
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="semaphores")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"session_detail"})
     */
    private $user;

    /**
     * Status of semaphore
     * @ORM\Column(type="integer")
     * @Groups({"user", "session_detail"})
     */
    private $status;

    /**
     * Session semaphore attached
     * @ORM\ManyToOne(targetEntity="App\Entity\Session", inversedBy="semaphores")
     * @Groups({"user"})
     */
    private $session;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getSession(): ?Session
    {
        return $this->session;
    }

    public function setSession(?Session $session): self
    {
        $this->session = $session;

        return $this;
    }
}
