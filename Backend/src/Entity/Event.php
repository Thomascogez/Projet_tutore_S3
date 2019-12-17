<?php

namespace App\Entity;

use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EventRepository")
 */
class Event
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"session_detail", "events", "attachment"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=90)
     * @Assert\LessThanOrEqual(90)
     * @Assert\NotBlank()
     * @Groups({"session_detail", "events", "attachment"})
     */
    private $name;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Assert\Type("float")
     * @Groups({"session_detail", "events"})
     */
    private $duration;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\AttachmentEvent", mappedBy="event", orphanRemoval=true)
     * @Groups({"session_detail", "events"})
     */
    private $attachmentEvents;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Session", inversedBy="events")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"events"})
     */
    private $session;

    /**
     * @ORM\Column(type="string", length=10)
     * @Groups({"session_detail", "events"})
     */
    private $type;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Assert\Date()
     * @Groups({"session_detail", "events"})
     */
    private $dueAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="events")
     * @Groups({"session_detail", "events"})
     */
    private $user;

    public function __construct()
    {
        $this->attachmentEvents = new ArrayCollection();
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

    public function getDuration(): ?float
    {
        return $this->duration;
    }

    public function setDuration(?float $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    /**
     * @return Collection|AttachmentEvent[]
     */
    public function getAttachmentEvents(): Collection
    {
        return $this->attachmentEvents;
    }

    public function addAttachmentEvent(AttachmentEvent $attachmentEvent): self
    {
        if (!$this->attachmentEvents->contains($attachmentEvent)) {
            $this->attachmentEvents[] = $attachmentEvent;
            $attachmentEvent->setEvent($this);
        }

        return $this;
    }

    public function removeAttachmentEvent(AttachmentEvent $attachmentEvent): self
    {
        if ($this->attachmentEvents->contains($attachmentEvent)) {
            $this->attachmentEvents->removeElement($attachmentEvent);
            // set the owning side to null (unless already changed)
            if ($attachmentEvent->getEvent() === $this) {
                $attachmentEvent->setEvent(null);
            }
        }

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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getDueAt(): ?DateTimeInterface
    {
        return $this->dueAt;
    }

    public function setDueAt(?DateTimeInterface $dueAt): self
    {
        $this->dueAt = $dueAt;

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
}
