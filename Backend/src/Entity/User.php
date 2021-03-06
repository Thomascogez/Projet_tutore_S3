<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Table of User
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @UniqueEntity(fields={"username"}, message="Nom d'utilisateur déjà utilisé")
 */
class User implements UserInterface
{
    /**
     * id of user
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"user", "session_detail", "group_info", "events", "comment"})
     */
    private $id;

    /**
     * Username of university
     * @ORM\Column(type="string", length=15, unique=true)
     * @Assert\LessThanOrEqual(15)
     * @Assert\NotBlank()
     * @Groups({"user", "group_info", "events", "session_detail", "comment"})
     */
    private $username;

    /**
     * Role in website ["ROLE_TEACHER", "ROLE_TUTOR", "ROLE_ADMIN"]
     * @ORM\Column(type="json")
     * @Groups({"user", "group_info", "events", "session_detail", "comment"})
     */
    private $roles = [];

    /**
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * Plain password (not in database)
     */
    protected $plainPassword;

    /**
     * Firstname of user
     * @ORM\Column(type="string", length=20)
     * @Assert\NotBlank()
     * @Assert\LessThanOrEqual(20)
     * @Groups({"user", "session_detail", "events", "comment"})
     */
    private $firstname;

    /**
     * Lastname of user
     * @ORM\Column(type="string", length=20)
     * @Assert\NotBlank()
     * @Assert\LessThanOrEqual(20)
     * @Groups({"user", "session_detail", "events"})
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=7, nullable=true)
     * @Groups({"user", "group_info", "events", "session_detail", "comment"})
     */
    private $color;

    /**
     * Date created account
     * @ORM\Column(type="date")
     * @Assert\NotNull()
     * @Assert\Date()
     * @Groups({"user"})
     */
    private $created_at;

    /**
     * Date of update
     * @ORM\Column(type="date")
     * @Assert\NotNull()
     * @Assert\Date()
     * @Groups({"user"})
     */
    private $update_at;

    /**
     * All semaphore relation with user
     * @ORM\OneToMany(targetEntity="App\Entity\Semaphore", mappedBy="user", orphanRemoval=true)
     */
    private $semaphores;

    /**
     * All session of user
     * @ORM\OneToMany(targetEntity="App\Entity\Session", mappedBy="user", cascade={"remove"})
     * @ORM\OrderBy({"createdAt" = "ASC"})
     */
    private $sessions;

    /**
     * All groups authorized of user
     * @ORM\ManyToMany(targetEntity="App\Entity\Groups", inversedBy="users")
     * @Groups({"user"})
     */
    private $groups;

    /**
     * All module authorized of user
     * @ORM\ManyToMany(targetEntity="App\Entity\Module", inversedBy="users")
     * @Groups({"user"})
     */
    private $modules;

    /**
     * All event created by user
     * @ORM\OneToMany(targetEntity="App\Entity\Event", mappedBy="user", cascade={"remove"})
     * @ORM\OrderBy({"dueAt" = "ASC"})
     */
    private $events;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\PasswordForget", mappedBy="user", cascade={"persist", "remove"})
     */
    private $passwordForget;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="user", orphanRemoval=true)
     */
    private $comments;

    public function __construct()
    {
        $this->semaphores = new ArrayCollection();
        $this->sessions = new ArrayCollection();
        $this->groups = new ArrayCollection();
        $this->modules = new ArrayCollection();
        $this->events = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(String $username): self
    {
        $this->username = $username;
        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }


    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

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
            $semaphore->setUser($this);
        }

        return $this;
    }

    public function removeSemaphore(Semaphore $semaphore): self
    {
        if ($this->semaphores->contains($semaphore)) {
            $this->semaphores->removeElement($semaphore);
            // set the owning side to null (unless already changed)
            if ($semaphore->getUser() === $this) {
                $semaphore->setUser(null);
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
            $session->setUser($this);
        }

        return $this;
    }

    public function removeSession(Session $session): self
    {
        if ($this->sessions->contains($session)) {
            $this->sessions->removeElement($session);
            // set the owning side to null (unless already changed)
            if ($session->getUser() === $this) {
                $session->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Groups[]
     */
    public function getGroups(): Collection
    {
        return $this->groups;
    }

    public function addGroup($group): self
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

    /**
     * @return Collection|Module[]
     */
    public function getModules(): Collection
    {
        return $this->modules;
    }

    public function addModule(Module $module): self
    {
        if (!$this->modules->contains($module)) {
            $this->modules[] = $module;
        }

        return $this;
    }

    public function removeModule(Module $module): self
    {
        if ($this->modules->contains($module)) {
            $this->modules->removeElement($module);
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
            $event->setUser($this);
        }

        return $this;
    }

    public function removeEvent(Event $event): self
    {
        if ($this->events->contains($event)) {
            $this->events->removeElement($event);
            // set the owning side to null (unless already changed)
            if ($event->getUser() === $this) {
                $event->setUser(null);
            }
        }

        return $this;
    }

    public function getPasswordForget(): ?PasswordForget
    {
        return $this->passwordForget;
    }

    public function setPasswordForget(PasswordForget $passwordForget): self
    {
        $this->passwordForget = $passwordForget;

        // set the owning side of the relation if necessary
        if ($passwordForget->getUser() !== $this) {
            $passwordForget->setUser($this);
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
            $comment->setUser($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getUser() === $this) {
                $comment->setUser(null);
            }
        }

        return $this;
    }
}
