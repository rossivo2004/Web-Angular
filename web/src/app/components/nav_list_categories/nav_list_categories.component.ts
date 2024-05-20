import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/categories';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-nav_list_categories',
  templateUrl: './nav_list_categories.component.html',
  styleUrls: ['./nav_list_categories.component.css'],
})
export class Nav_list_categoriesComponent implements OnInit {
  categories!: Categories[];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = data as Categories[];
      // console.log('Categories data:', this.categories);
    });
  }
}
