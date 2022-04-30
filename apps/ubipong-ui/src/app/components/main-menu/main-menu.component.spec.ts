import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatBadgeModule } from '@angular/material/badge'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatChipsModule } from '@angular/material/chips'
import { MatDatepickerModule} from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatRadioModule } from '@angular/material/radio'
import { MatRippleModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSliderModule } from '@angular/material/slider'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatStepperModule } from '@angular/material/stepper'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'
import { ClipboardModule } from '@angular/cdk/clipboard'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { LayoutModule } from '@angular/cdk/layout'

import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { MatMenuHarness } from '@angular/material/menu/testing'

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainMenuComponent } from './main-menu.component';
import { UserService } from '../../services/user.service';

describe('MainMenuComponent', () => {
  let mockUserServiceLogin: any
  let mockUserService: any

  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>
  let loader: HarnessLoader

  beforeEach(async () => {
    mockUserServiceLogin = {
      then: jest.fn()
    }
    mockUserService = {
      getUserId: jest.fn().mockResolvedValue(UserService.TEST_USER_ID),
      isLoggedIn: jest.fn().mockResolvedValue(true),
      login: jest.fn().mockReturnValue(mockUserServiceLogin),
      logout: jest.fn(),
    }

    TestBed.configureTestingModule({
      declarations: [MainMenuComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,

        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,        
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        ClipboardModule,
        DragDropModule,
        LayoutModule,
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

    loader = TestbedHarnessEnvironment.loader(fixture)
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
    expect(userControl).toBeTruthy()
    const userControlMenu = userControl.querySelector('button')
    expect(userControlMenu.textContent.trim()).toBe(UserService.TEST_USER_ID + ' arrow_drop_down')
  })

  it('should allow user to log out if user is logged in', async () => {
    const menu = await loader.getHarness(MatMenuHarness.with({
      triggerText: UserService.TEST_USER_ID + ' arrow_drop_down'
    }))
    expect(menu).toBeTruthy()
    await menu.open()
    const logout = await menu.getItems({
      text: 'Log Out'
    })

    expect(logout.length).toBe(1)
    await logout[0].click()
    expect(mockUserService.logout).toHaveBeenCalled()
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
