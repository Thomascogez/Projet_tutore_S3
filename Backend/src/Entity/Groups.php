<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups as Groupss;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Group of school
 * @ORM\Entity(repositoryClass="App\Repository\GroupRepository")
 * @UniqueEntity({"name"})
 */
class Groups
{
    /**
     * Id of group
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groupss({"user", "session_detail", "groups", "group_info"})
     */
    private $id;

    /**
     * Name of group
     * @ORM\Column(type="string", length=10)
     * @Assert\LessThanOrEqual(10)
     * @Assert\NotBlank()
     * @Assert\NotNull()
     * @Groupss({"user", "session_detail", "groups", "group_info"})
     */
    private $name;

    /**
     * Parent of group
     * @ORM\ManyToOne(targetEntity="App\Entity\Groups", inversedBy="groups")
     * @Groupss({"user", "groups", "group_info"})
     */
    private $parent;

    /**
     * Child of group
     * @ORM\OneToMany(targetEntity="App\Entity\Groups", mappedBy="parent", cascade={"persist", "remove"})
     */
    private $groups;


    /**
     * User authorized of group
     * @ORM\ManyToMany(targetEntity="App\Entity\User", mappedBy="groups")
     * @Groupss({"group_info"})
     */
    private $users;

    /**
     * @ORM\Column(type="string", length=7, nullable=true)
     * @Groupss({"user", "session_detail", "groups", "group_info"})
     */
    private $color;

    /**
     * Session dependencies of group
     * @ORM\ManyToMany(targetEntity="App\Entity\Session", mappedBy="groups")
     * @Groupss({"group_info"})
     */
    private $sessions;

    public function __construct()
    {
        $this->groups = new ArrayCollection();
        $this->users = new ArrayCollection();
        $this->sessions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getParent(): ?self
    {
        return $this->parent;
    }

    public function setParent(?self $parent): self
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * @return Collection|self[]
     */
    public function getGroups(): Collection
    {
        return $this->groups;
    }

    public function addGroup(self $group): self
    {
        if (!$this->groups->contains($group)) {
            $this->groups[] = $group;
            $group->setParent($this);
        }

        return $this;
    }

    public function removeGroup(self $group): self
    {
        if ($this->groups->contains($group)) {
            $this->groups->removeElement($group);
            // set the owning side to null (unless already changed)
            if ($group->getParent() === $this) {
                $group->setParent(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addGroup($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            $user->removeGroup($this);
        }

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): self
    {
        $this->color = $color;

        return $this;
    }

    /**
     * @return Collection|Session[]
     */
    public function getSessions(): Collection
    {
        return $this->sessions;
    }

    public function addSession(Session $session): self
    {
        if (!$this->sessions->contains($session)) {
            $this->sessions[] = $session;
            $session->addGroup($this);
        }

        return $this;
    }

    public function removeSession(Session $session): self
    {
        if ($this->sessions->contains($session)) {
            $this->sessions->removeElement($session);
            $session->removeGroup($this);
        }

        return $this;
    }
}
