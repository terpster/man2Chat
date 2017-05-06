import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {HttpModule} from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import {FlashMessagesService} from 'angular2-flash-messages';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        HttpModule,
        RouterTestingModule.withRoutes( [])
      ],
      providers: [AuthService,
        FlashMessagesService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
