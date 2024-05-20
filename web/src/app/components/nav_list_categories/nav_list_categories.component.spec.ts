/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Nav_list_categoriesComponent } from './nav_list_categories.component';

describe('Nav_list_categoriesComponent', () => {
  let component: Nav_list_categoriesComponent;
  let fixture: ComponentFixture<Nav_list_categoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nav_list_categoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nav_list_categoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
