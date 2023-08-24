<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\CustomerRepository;
use App\State\CustomerStateProcessor;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CustomerRepository::class)]
#[ApiResource(normalizationContext: ["groups" => ['customer:read']], paginationItemsPerPage: 10)]
#[Post(security: "is_granted('IS_AUTHENTICATED_FULLY')", processor: CustomerStateProcessor::class)]
#[GetCollection(paginationEnabled: false, security: "is_granted('PUBLIC_ACCESS')")]
#[Get(security: "is_granted('IS_AUTHENTICATED_FULLY') and (object.getUser() === user or is_granted('ROLE_ADMIN'))")]
#[Put(security: "is_granted('IS_AUTHENTICATED_FULLY') and (object.getUser() === user or is_granted('ROLE_ADMIN'))")]
#[Delete]
class Customer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['customer:read', 'invoice:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['customer:read', 'invoice:read'])]
    private ?string $firstName = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['customer:read', 'invoice:read'])]
    private ?string $lastName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['customer:read'])]
    private ?string $email = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['customer:read'])]
    private ?string $company = null;

    #[ORM\OneToMany(mappedBy: 'customer', targetEntity: Invoice::class, orphanRemoval: true)]
    #[Groups(['customer:read'])]
    private Collection $invoices;

    #[ORM\ManyToOne(inversedBy: 'customers')]
    #[Groups(['customer:read'])]
    private ?User $user = null;
    #[Groups(['customer:read'])]
    private ?float $totalAmount = 0;

    public function __construct()
    {
        $this->invoices = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): static
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection<int, Invoice>
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): static
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices->add($invoice);
            $invoice->setCustomer($this);
        }

        return $this;
    }

    public function removeInvoice(Invoice $invoice): static
    {
        if ($this->invoices->removeElement($invoice)) {
            // set the owning side to null (unless already changed)
            if ($invoice->getCustomer() === $this) {
                $invoice->setCustomer(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getTotalAmount(): ?float
    {
        foreach ($this->getInvoices() as $invoice) {
            $this->totalAmount = $this->totalAmount + $invoice->getAmount();
        }
        return $this->totalAmount;
    }
}
