# Generated by Django 3.1 on 2020-09-03 20:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('whoah', '0006_bookcomment_books_commented'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bookcomment',
            name='books_commented',
        ),
    ]
