# Generated by Django 3.1 on 2020-09-02 21:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('whoah', '0002_auto_20200821_1058'),
    ]

    operations = [
        migrations.CreateModel(
            name='BookComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField(max_length=300)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='whoah.book')),
                ('commenter', models.ForeignKey(on_delete=models.SET('Anonymous User'), to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
