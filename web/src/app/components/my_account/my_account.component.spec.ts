/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { My_accountComponent } from './my_account.component';

describe('My_accountComponent', () => {
  let component: My_accountComponent;
  let fixture: ComponentFixture<My_accountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ My_accountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(My_accountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
