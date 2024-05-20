import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { Categories } from 'src/app/models/categories';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-admin_category_edit',
  templateUrl: './admin_category_edit.component.html',
  styleUrls: ['./admin_category_edit.component.css'],
})
export class Admin_category_editComponent implements OnInit {
  categoriesForm: FormGroup;
  categories: Categories | undefined;
  id: string | null;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id_cate');
    this.categoriesForm = new FormGroup({
      name_ct: new FormControl(''),
      tag_ct: new FormControl(''),
    });
  }

  ngOnInit() {
    if (this.id) {
      this.categoriesService.getDetailCategories(this.id).subscribe({
        next: (data) => {
          console.log('Category data fetched:', data); // Debug log
          this.categories = data;
          this.categoriesForm.patchValue({
            name_ct: this.categories.name_ct,
            tag_ct: this.categories.tag_ct,
          });
        },
        error: (error) => {
          console.error(
            'There was an error fetching the category data:',
            error
          );
        },
      });
    }
  }

  onSubmit() {
    if (this.id) {
      this.categoriesService
        .editCategory(this.id, this.categoriesForm.value)
        .subscribe({
          next: (data) => {
            // console.log('Category updated successfully:', data);
            alert('Cập nhật thành công');
            // Correct the route path to be relative
            this.router.navigate(['/admin_category']);
          },
          error: (error) => {
            console.error('There was an error updating the category:', error);
          },
        });
    }
  }
}
