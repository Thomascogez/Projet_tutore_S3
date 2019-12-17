<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SessionRepository")
 */
class Session
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user", "session_detail", "session"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Module", inversedBy="sessions")
     * @Groups({"user", "session_detail"})
     */
    private $module;

    /**
     * @ORM\Column(type="date")
     * @Assert\NotNull()
     * @Assert\Date()
     * @Groups({"session_detail"})
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Groups", inversedBy="sessions")
     * @Groups({"session_detail"})
     */
    private $groupe;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="sessions")
     * @Groups({"session_detail"})
     */
    private $user;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Semaphore", mappedBy="session", orphanRemoval=true)
     */
    private $semaphores;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Event", mappedBy="session", orphanRemoval=true)
     * @Groups({"session_detail"})
     */
    private $events;

    /**
     * @ORM\Column(type="string", length=10)
     * @Groups({"session_detail"})
     */
    private $type;

    public function __construct()
    {
        $this->semaphores = new ArrayCollection();
        $this->events = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getModule(): ?Module
    {
        return $this->module;
    }

    public function setModule(?Module $module): self
    {
        $this->module = $module;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getGroupe(): ?\App\Entity\Groups
    {
        return $this->groupe;
    }

    public function setGroupe(?\App\Entity\Groups  $groupe): self
    {
        $this->groupe = $groupe;

        return $this;
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

    /**
     * @return Collection|Semaphore[]
     */
    public function getSemaphores(): Collection
    {
        return $this->semaphores;
    }

    public function addSemaphore(Semaphore $semaphore): self
    {
        if (!$this->semaphores->contains($semaphore)) {
            $this->semaphores[] = $semaphore;
            $semaphore->setSession($this);
        }

        return $this;
    }

    public function removeSemaphore(Semaphore $semaphore): self
    {
        if ($this->semaphores->contains($semaphore)) {
            $this->semaphores->removeElement($semaphore);
            // set the owning side to null (unless already changed)
            if ($semaphore->getSession() === $this) {
                $semaphore->setSession(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Event[]
     */
    public function getEvents(): Collection
    {
        return $this->events;
    }

    public function addEvent(Event $event): self
    {
        if (!$this->events->contains($event)) {
            $this->events[] = $event;
            $event->setSession($this);
        }

        return $this;
    }

    public function removeEvent(Event $event): self
    {
        if ($this->events->contains($event)) {
            $this->events->removeElement($event);
            // set the owning side to null (unless already changed)
            if ($event->getSession() === $this) {
                $event->setSession(null);
            }
        }

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }
}
