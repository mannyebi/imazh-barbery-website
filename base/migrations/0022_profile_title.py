# Generated by Django 5.0 on 2024-03-11 12:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0021_alter_appointment_time_datetime'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='title',
            field=models.CharField(default='آرایشگر', max_length=65),
        ),
    ]
