<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SettingRepository")
 */
class Setting
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     * @\Symfony\Component\Serializer\Annotation\Groups({"settings"})
     */
    private $maxEventSession;

    /**
     * @ORM\Column(type="integer")
     * @\Symfony\Component\Serializer\Annotation\Groups({"settings"})
     */
    private $maxAttachmentEvent;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMaxEventSession(): ?int
    {
        return $this->maxEventSession;
    }

    public function setMaxEventSession(int $maxEventSession): self
    {
        $this->maxEventSession = $maxEventSession;

        return $this;
    }

    public function getMaxAttachmentEvent(): ?int
    {
        return $this->maxAttachmentEvent;
    }

    public function setMaxAttachmentEvent(int $maxAttachmentEvent): self
    {
        $this->maxAttachmentEvent = $maxAttachmentEvent;

        return $this;
    }
}
