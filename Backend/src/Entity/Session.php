<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Table of session
 * @ORM\Entity(repositoryClass="App\Repository\SessionRepository")
 */
class Session
{
    /**
     * id Session
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user", "session_detail", "session", "modules_info", "group_info", "events"})
     */
    private $id;

    /**
     * Session module
     * @ORM\ManyToOne(targetEntity="App\Entity\Module", inversedBy="sessions")
     * @Groups({"user", "session_detail", "events"})
     */
    private $module;

    /**
     * Created date of session
     * @ORM\Column(type="date")
     * @Assert\NotNull()
     * @Assert\Date()
     * @Groups({"session_detail", "events"})
     */
    private $createdAt;

    /**
     * User created session
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="sessions")
     * @Groups({"session_detail", "events"})
     */
    private $user;

    /**
     * All semaphore of the session
     * @ORM\OneToMany(targetEntity="App\Entity\Semaphore", mappedBy="session", orphanRemoval=true)
     * @Groups({"session_detail"})
     */
    private $semaphores;

    /**
     * All event dependency of session
     * @ORM\OneToMany(targetEntity="App\Entity\Event", mappedBy="session", orphanRemoval=true)
     * @Groups({"session_detail"})
     */
    private $events;

    /**
     * Type session
     * @ORM\Column(type="string", length=10)
     * @Groups({"session_detail", "events"})
     */
    private $type;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="session", orphanRemoval=true)
     */
    private $comments;

    /**
     * Session group
     * @ORM\ManyToMany(targetEntity="App\Entity\Groups", inversedBy="sessions")
     * @Groups({"session_detail", "events"})
     */
    private $groups;

    public function __construct()
    {
        $this->semaphores = new ArrayCollection();
        $this->events = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->groups = new ArrayCollection();
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

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setSession($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getSession() === $this) {
                $comment->setSession(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|\App\Entity\Groups[]
     */
    public function getGroups(): Collection
    {
        return $this->groups;
    }

    public function addGroup(\App\Entity\Groups $group): self
    {
        if (!$this->groups->contains($group)) {
            $this->groups[] = $group;
        }

        return $this;
    }

    public function removeGroup(\App\Entity\Groups $group): self
    {
        if ($this->groups->contains($group)) {
            $this->groups->removeElement($group);
        }

        return $this;
    }
}
