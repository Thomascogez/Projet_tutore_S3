<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\EventTypeRepository")
 */
class EventType
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=10)
     * @Assert\LessThanOrEqual(10)
     * @Assert\NotBlank()
     */
    private $name;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\RoleTypeEvent", mappedBy="eventType", cascade={"persist", "remove"})
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
