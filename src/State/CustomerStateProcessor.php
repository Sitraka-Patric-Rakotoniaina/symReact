<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Customer;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class CustomerStateProcessor implements ProcessorInterface
{
    public function __construct(private readonly ProcessorInterface $persistProcessor, private readonly TokenStorageInterface $tokenStorage)
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        $user = $this->tokenStorage->getToken()->getUser();
        /** @var Customer $data */
        $data->setUser($user);
        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
