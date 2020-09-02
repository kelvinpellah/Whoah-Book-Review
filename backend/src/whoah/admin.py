from django.contrib import admin
from .models import Book, BookComment
from import_export.admin import ImportExportModelAdmin

@admin.register(Book)
@admin.register(BookComment)
class ViewAdmin(ImportExportModelAdmin):
    pass