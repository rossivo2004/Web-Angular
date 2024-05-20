/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Btn_move_topComponent } from './btn_move_top.component';

describe('Btn_move_topComponent', () => {
  let component: Btn_move_topComponent;
  let fixture: ComponentFixture<Btn_move_topComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Btn_move_topComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Btn_move_topComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
