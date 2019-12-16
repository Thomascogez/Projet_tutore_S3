<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups as Groupss;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GroupRepository")
 */
class Groups
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groupss({"user"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=10)
     * @Assert\LessThanOrEqual(10)
     * @Assert\NotBlank()
     * @Groupss({"user"})
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Groups", inversedBy="groups")
     * @Groupss({"user"})
     */
    private $parent;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Groups", mappedBy="parent")
     */
    private $groups;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Session", mappedBy="groupe")
     */
    private $sessions;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\User", mappedBy="groups")
     */
    private $users;

    public function __construct()
    {
        $this->groups = new ArrayCollection();
        $this->sessions = new ArrayCollection();
        $this->users = new ArrayCollection();
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
            $session->setGroupe($this);
        }

        return $this;
    }

    public function removeSession(Session $session): self
    {
        if ($this->sessions->contains($session)) {
            $this->sessions->removeElement($session);
            // set the owning side to null (unless already changed)
            if ($session->getGroupe() === $this) {
                $session->setGroupe(null);
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
}
