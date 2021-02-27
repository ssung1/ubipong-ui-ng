import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatDatepickerModule} from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { LayoutModule } from '@angular/cdk/layout'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { ComponentFixture, TestBed } from '@angular/core/testing';
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
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,

        NoopAnimationsModule,
        MatMenuModule,
        MatButtonModule,
        MatCardModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatToolbarModule,
        LayoutModule,
        MatSidenavModule,
        MatListModule,
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
    expect(userControl.textContent).toBe(UserService.TEST_USER_ID + ' arrow_drop_down')
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
