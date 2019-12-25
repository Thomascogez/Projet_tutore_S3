<?php

namespace App\Form;

use App\Entity\Groups;
use App\Entity\Module;
use App\Entity\Session;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SessionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('module', EntityType::class, array(
                'class' => Module::class
            ))
            ->add('type')
            ->add('groupe', EntityType::class, array(
                'class' => Groups::class
            ))
            ->add('user', EntityType::class, array(
                'class' => User::class
            ))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Session::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);
    }
}
