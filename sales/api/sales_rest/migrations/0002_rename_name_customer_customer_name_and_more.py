# Generated by Django 4.0.3 on 2023-01-24 17:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customer',
            old_name='name',
            new_name='customer_name',
        ),
        migrations.RenameField(
            model_name='employee',
            old_name='name',
            new_name='employee_name',
        ),
    ]