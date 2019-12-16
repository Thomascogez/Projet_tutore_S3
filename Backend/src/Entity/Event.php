<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EventRepository")
 */
class Event
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\EventType", inversedBy="events")
     */
    private $typeEvent;

    /**
     * @ORM\Column(type="string", length=90)
     */
    private $name;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $duration;

    /**
     * @ORM\Column(type="datetime")
     */
    private $dueAt;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\AttachmentEvent", mappedBy="event", orphanRemoval=true)
     */
    private $attachmentEvents;

    public function __construct()
    {
        $this->attachmentEvents = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTypeEvent(): ?EventType
    {
        return $this->typeEvent;
    }

    public function setTypeEvent(?EventType $typeEvent): self
    {
        $this->typeEvent = $typeEvent;

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

    public function getDuration(): ?float
    {
        return $this->duration;
    }

    public function setDuration(?float $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    public function getDueAt(): ?\DateTimeInterface
    {
        return $this->dueAt;
    }

    public function setDueAt(\DateTimeInterface $dueAt): self
    {
        $this->dueAt = $dueAt;

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
}