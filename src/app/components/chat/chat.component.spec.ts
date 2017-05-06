import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { AuthGuard } from '../../guards/auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { ChatService } from '../../services/chat.service';
import { HttpModule } from '@angular/http';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatComponent,
        HomeComponent,
        RegisterComponent,
        LoginComponent,
        DashboardComponent,
        ProfileComponent,
      ],
      imports: [
        FormsModule,
        HttpModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        AuthGuard,
        ChatService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

