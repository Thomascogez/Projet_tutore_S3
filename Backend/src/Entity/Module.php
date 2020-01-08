<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Module table
 * @ORM\Entity(repositoryClass="App\Repository\ModuleRepository")
 * @UniqueEntity(fields={"code"}, message="Code de module déjà utilisé")
 */
class Module
{
    /**
     * Id module
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user", "session_detail", "modules", "modules_info", "events"})
     */
    private $id;

    /**
     * Code module
     * @ORM\Column(type="string", length=8)
     * @Assert\LessThanOrEqual(8)
     * @Assert\NotBlank()
     * @Groups({"user", "session_detail", "modules", "modules_info", "events"})
     */
    private $code;

    /**
     * Name module
     * @ORM\Column(type="string", length=20)
     * @Assert\LessThanOrEqual(20)
     * @Assert\NotBlank()
     * @Groups({"user", "session_detail", "modules", "modules_info", "events"})
     */
    private $name;

    /**
     * Color for frontend module
     * @ORM\Column(type="string", length=7, nullable=true)
     * @Assert\LessThanOrEqual(7)
     * @Groups({"user", "session_detail", "modules", "modules_info", "events"})
     */
    private $color;

    /**
     * Created date module
     * @ORM\Column(type="date")
     * @Assert\Date()
     * @Assert\NotNull()
     * @Groups({"modules_info"})
     */
    private $created_at;

    /**
     * Update date module
     * @ORM\Column(type="date")
     * @Assert\Date()
     * @Assert\NotNull()
     * @Groups({"modules_info"})
     */
    private $update_at;

    /**
     * Session relation with module
     * @ORM\OneToMany(targetEntity="App\Entity\Session", mappedBy="module", cascade={"persist", "remove"})
     * @Groups({"modules_info"})
     */
    private $sessions;

    /**
     * User authorized used module
     * @ORM\ManyToMany(targetEntity="App\Entity\User", mappedBy="modules", cascade={"persist"})
     */
    private $users;

    public function __construct()
    {
        $this->sessions = new ArrayCollection();
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
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

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): self
    {
        $this->color = $color;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdateAt(): ?\DateTimeInterface
    {
        return $this->update_at;
    }

    public function setUpdateAt(\DateTimeInterface $update_at): self
    {
        $this->update_at = $update_at;

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
            $session->setModule($this);
        }

        return $this;
    }

    public function removeSession(Session $session): self
    {
        if ($this->sessions->contains($session)) {
            $this->sessions->removeElement($session);
            // set the owning side to null (unless already changed)
            if ($session->getModule() === $this) {
                $session->setModule(null);
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
            $user->addModule($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            $user->removeModule($this);
        }

        return $this;
    }
}
