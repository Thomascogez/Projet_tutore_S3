<?php

namespace App\Form;

use App\Entity\RoleTypeEvent;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RoleTypeEventType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('teacher')
            ->add('tutor')
            ->add('eventType');
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => RoleTypeEvent::class,
            'csrf_protection' => false,
            'allow_extra_fields' => true
        ]);
    }
}
