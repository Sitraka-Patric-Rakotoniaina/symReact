<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Invoice;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(private readonly UserPasswordHasherInterface $encoder)
    {
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        $chrono = 1;

        for ($u = 0; $u < 50; $u++) {
            $user = new User();
            $encoded = $this->encoder->hashPassword($user, "123456");
            $user->setFirstName($faker->firstName)
                ->setLastName($faker->lastName)
                ->setEmail($faker->email)
                ->setRoles($faker->randomElement([["ROLE_USER"],["ROLE_CLIENT"]]))
                ->setPassword($encoded);
            $manager->persist($user);

            for ($c = 0; $c < mt_rand(5, 20) ; $c++) {
                $customer = new Customer();
                $customer->setFirstName($faker->firstName)
                    ->setLastName($faker->lastName)
                    ->setEmail($faker->email())
                    ->setCompany($faker->company)
                    ->setUser($user);
                $manager->persist($customer);

                for ($i = 0; $i < mt_rand(3, 10); $i++) {
                    $invoice = new Invoice();
                    $invoice->setAmount($faker->randomFloat(2, 150, 5000))
                        ->setSentAt($faker->dateTimeBetween('-6 months'))
                        ->setStatus($faker->randomElement(['SENT', 'PAID', 'CANCELED']))
                        ->setChrono($chrono)
                        ->setCustomer($customer);
                    $chrono++;
                    $manager->persist($invoice);
                }
            }
        }
        $manager->flush();
    }
}
