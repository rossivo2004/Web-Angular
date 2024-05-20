import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Categories } from 'src/app/models/categories';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin_category.component.html',
  styleUrls: ['./admin_category.component.css'],
})
export class Admin_categoryComponent implements OnInit {
  categories!: Categories[];
  categoriesForm: FormGroup;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {
    this.categoriesForm = new FormGroup({
      name_ct: new FormControl(''),
      tag_ct: new FormControl(''),
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesService.getAllCategories().subscribe(
      (data) => {
        this.categories = data as Categories[];
      },
      (error) => {
        console.error('Error fetching categories:', error);
        alert('Có lỗi xảy ra khi tải danh mục');
      }
    );
  }

  async btn_delete_category(categoryId: string): Promise<void> {
    const confirmation = confirm('Bạn có chắc chắn muốn xóa loại này?');
    if (confirmation) {
      try {
        const response = await fetch(
          `http://localhost:3000/categories/delete/${categoryId}`,
          {
            method: 'DELETE',
          }
        );
        const data = await response.json();
        if (response.ok) {
          alert('Xóa loại thành công');
          this.loadCategories(); // Refresh the categories list
        } else {
          console.error('Error deleting category:', data);
          alert('Có lỗi xảy ra khi xóa danh mục');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra khi xóa danh mục');
      }
    }
  }

  onSubmit() {
    const categoryData = this.categoriesForm.value;
    this.categoriesService.addCategories(categoryData).subscribe(
      (data) => {
        alert('Thêm danh mục thành công');
        this.loadCategories(); // Refresh the categories list
        this.categoriesForm.reset(); // Reset the form after submission
      },
      (error) => {
        alert('Thêm danh mục thành công');
        window.location.reload();
      }
    );
  }
}
