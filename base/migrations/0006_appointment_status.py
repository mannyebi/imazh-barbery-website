# Generated by Django 4.0.4 on 2023-10-22 13:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_alter_appointment_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='status',
            field=models.CharField(choices=[('free', 'free'), ('closed', 'closed')], default='free', max_length=10),
        ),
    ]
