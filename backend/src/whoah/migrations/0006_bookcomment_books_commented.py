# Generated by Django 3.1 on 2020-09-03 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('whoah', '0005_auto_20200903_2240'),
    ]

    operations = [
        migrations.AddField(
            model_name='bookcomment',
            name='books_commented',
            field=models.ManyToManyField(related_name='book_list', to='whoah.Book'),
        ),
    ]