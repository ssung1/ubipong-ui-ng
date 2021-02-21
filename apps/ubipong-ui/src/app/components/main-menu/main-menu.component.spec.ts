import { LayoutModule } from '@angular/cdk/layout';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MainMenuComponent } from './main-menu.component';
import { UserService } from '../../services/user.service';

describe('MainMenuComponent', () => {
  let mockUserServiceLogin: any
  let mockUserService: any

  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(async () => {
    mockUserServiceLogin = {
      then: jest.fn()
    }
    mockUserService = {
      getUserId: jest.fn().mockResolvedValue(UserService.TEST_USER_ID),
      isLoggedIn: jest.fn().mockResolvedValue(true),
      login: jest.fn().mockReturnValue(mockUserServiceLogin),
    }

    TestBed.configureTestingModule({
      declarations: [MainMenuComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
  })

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should display login button if user is not logged in', async () => {
    mockUserService.isLoggedIn.mockResolvedValue(false)
    component.ngOnInit()
    await fixture.whenStable()
    fixture.detectChanges()

    const userControl = fixture.nativeElement.querySelector('.mat-toolbar .user-control')
    expect(userControl.disabled).toBe(false)
    expect(userControl.textContent).toBe('Log In')
  })

  it('should display user id if user is logged in', () => {
    fixture.detectChanges()

    const userControl = fixture.nativeElement.querySelector('.mat-toolbar .user-control')
    expect(userControl.textContent).toBe(UserService.TEST_USER_ID)
  })

  it('should login if user wants to', async () => {
    mockUserService.isLoggedIn.mockResolvedValue(false)
    component.ngOnInit()
    await fixture.whenStable()
    fixture.detectChanges()

    const userControl = fixture.nativeElement.querySelector('.mat-toolbar .user-control')
    expect(userControl.disabled).toBe(false)
    userControl.click()

    expect(mockUserService.login).toHaveBeenCalled()
    expect(mockUserServiceLogin.then).toHaveBeenCalled()
  })
});
