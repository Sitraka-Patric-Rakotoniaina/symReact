<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Invoice;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        for ($c = 0; $c < 30 ; $c++) {
            $customer = new Customer();
            $customer->setFirstName($faker->firstName)
                ->setLastName($faker->lastName)
                ->setEmail($faker->email())
                ->setCompany($faker->company);
             $manager->persist($customer);

             for ($i = 0; $i < mt_rand(3, 10); $i++) {
                 $invoice = new Invoice();
                 $invoice->setAmount($faker->randomFloat(2, 150, 5000))
                     ->setSentAt($faker->dateTimeBetween('-6 months'))
                     ->setStatus($faker->randomElement(['SENT', 'PAID', 'CANCELED']))
                     ->setCustomer($customer);
                 $manager->persist($invoice);
             }
        }
        $manager->flush();
    }
}
