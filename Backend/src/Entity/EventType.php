<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Event type for autocomplete
 * @ORM\Entity(repositoryClass="App\Repository\EventTypeRepository")
 * @UniqueEntity(fields={"name"}, message="Nom de type d'évènement déjà utilisé")
 */
class EventType
{
    /**
     * ID for event type
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"event_type"})
     */
    private $id;

    /**
     * Name of event type
     * @ORM\Column(type="string", length=10)
     * @Assert\LessThanOrEqual(10)
     * @Assert\NotBlank()
     * @Groups({"event_type"})
     */
    private $name;

    /**
     * Role for the event type
     * @ORM\OneToOne(targetEntity="App\Entity\RoleTypeEvent", mappedBy="eventType", cascade={"persist", "remove"})
     * @Groups({"event_type"})
     */
    private $roleTypeEvent;

    public function __construct()
    {
        $this->events = new ArrayCollection();
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

    public function getRoleTypeEvent(): ?RoleTypeEvent
    {
        return $this->roleTypeEvent;
    }

    public function setRoleTypeEvent(RoleTypeEvent $roleTypeEvent): self
    {
        $this->roleTypeEvent = $roleTypeEvent;

        // set the owning side of the relation if necessary
        if ($roleTypeEvent->getEventType() !== $this) {
            $roleTypeEvent->setEventType($this);
        }

        return $this;
    }
}
