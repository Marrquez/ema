import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {LoginComponent } from './login.component';

describe('LoginComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));
});
