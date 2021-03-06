<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * Table for auto complete type of session
 * @ORM\Entity(repositoryClass="App\Repository\SessionTypeRepository")
 * @UniqueEntity(fields={"name"}, message="Nom de type de séssion déjà utilisé")
 */
class SessionType
{
    /**
     * Id of session type
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"session_detail", "session_type"})
     */
    private $id;

    /**
     * Name of session type
     * @ORM\Column(type="string", length=10)
     * @Assert\LessThanOrEqual(10)
     * @Assert\NotBlank()
     * @Groups({"session_detail", "session_type"})
     */
    private $name;


    public function __construct()
    {
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
}
