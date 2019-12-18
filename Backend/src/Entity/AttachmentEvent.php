<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AttachmentEventRepository")
 */
class AttachmentEvent
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"session_detail", "events", "attachment"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Event", inversedBy="attachmentEvents")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"attachment"})
     */
    private $event;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\LessThanOrEqual(255)
     * @Assert\NotBlank()
     * @Groups({"session_detail", "events", "attachment"})
     */
    private $source;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEvent(): ?Event
    {
        return $this->event;
    }

    public function setEvent(?Event $event): self
    {
        $this->event = $event;

        return $this;
    }

    public function getSource(): ?string
    {
        return $this->source;
    }

    public function setSource(string $source): self
    {
        $this->source = $source;

        return $this;
    }
}
