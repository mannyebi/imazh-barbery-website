# Generated by Django 4.2.7 on 2024-01-11 23:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_alter_user_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='time',
            field=models.CharField(choices=[('9:00 AM', '9:00 AM'), ('10:00 AM', '10:00 AM'), ('11:00 AM', '11:00 AM'), ('12:00 PM', '12:00 PM'), ('1:00 PM', '1:00 PM'), ('2:00 PM', '2:00 PM'), ('3:00 PM', '3:00 PM'), ('4:00 PM', '4:00 PM'), ('5:00 PM', '5:00 PM'), ('6:00 PM', '6:00 PM'), ('7:00 PM', '7:00 PM'), ('8:00 PM', '8:00 PM'), ('9:00 PM', '9:00 PM'), ('10:00 PM', '10:00 PM'), ('11:00 PM', '11:00 PM'), ('11:30 PM', '11:30 PM'), ('12:00 PM', '12:00 PM')], default='3 PM', max_length=10),
        ),
    ]
