# Generated by Django 3.1.5 on 2021-01-07 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_auto_20210107_1730'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(default='/media/default_image.png', upload_to=''),
        ),
    ]
