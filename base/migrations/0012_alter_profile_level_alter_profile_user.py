# Generated by Django 5.0 on 2024-02-05 17:49

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_alter_profile_bio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='level',
            field=models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3')], default='1', max_length=1),
        ),
        migrations.AlterField(
            model_name='profile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
