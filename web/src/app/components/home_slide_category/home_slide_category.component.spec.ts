/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Home_slide_categoryComponent } from './home_slide_category.component';

describe('Home_slide_categoryComponent', () => {
  let component: Home_slide_categoryComponent;
  let fixture: ComponentFixture<Home_slide_categoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Home_slide_categoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Home_slide_categoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
