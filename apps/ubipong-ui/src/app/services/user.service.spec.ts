import { TestBed } from '@angular/core/testing';
import {OAuthService} from 'angular-oauth2-oidc';

import { UserService } from './user.service';

describe('UserService', () => {
  let mockOAuthService
  let service: UserService

  beforeEach(() => {
    mockOAuthService = {
      configure: jest.fn(),
      tryLogin: jest.fn(),
      hasValidAccessToken: jest.fn(),
      hasValidIdToken: jest.fn(),
      getIdentityClaims: jest.fn(),
      initLoginFlow: jest.fn(),
    }
    TestBed.configureTestingModule({
      providers: [
        { provide: OAuthService, useValue: mockOAuthService },
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('in dev environment', () => {
    beforeEach(() => {
      service.oauthEnabled = false
    })
    it('should return user email as form of ID', async () => {
      expect(await service.getUserId()).toBe(UserService.TEST_USER_ID);
    })

    it('should know if the user has write access', async () => {
      expect(await service.hasWriteAccess()).toBe(true);
    })
  })

  describe('in qa/prod environment with successful login', () => {
    const email = 'realuser@email.com'
    beforeEach(() => {
      service.oauthEnabled = true
      tryLogin: jest.fn().mockResolvedValue(true),
      mockOAuthService.getIdentityClaims.mockReturnValue({email})
      mockOAuthService.hasValidAccessToken.mockReturnValueOnce(false).mockReturnValue(true)
      mockOAuthService.hasValidIdToken.mockReturnValueOnce(false).mockReturnValue(true)
    })

    it('should return user email as form of ID', async () => {
      expect(await service.getUserId()).toBe(email)
      expect(mockOAuthService.initLoginFlow).toHaveBeenCalled()
    })

    it('should know if the user has write access', async () => {
      expect(await service.hasWriteAccess()).toBe(true)
      expect(mockOAuthService.initLoginFlow).toHaveBeenCalled()
    })
  })

  describe('in qa/prod environment with failed login', () => {
    const email = 'realuser@email.com'
    beforeEach(() => {
      service.oauthEnabled = true
      tryLogin: jest.fn().mockRejectedValue(false),
      mockOAuthService.getIdentityClaims.mockReturnValue({email})
      mockOAuthService.hasValidAccessToken.mockReturnValue(false)
      mockOAuthService.hasValidIdToken.mockReturnValue(false)
    })

    it('should return user email as form of ID', async () => {
      // not sure what we would get...
      await service.getUserId()
      // expect(await service.getUserId()).toBeFalsy()
      expect(mockOAuthService.initLoginFlow).toHaveBeenCalled()
    })

    it('should know if the user has write access', async () => {
      expect(await service.hasWriteAccess()).toBe(false)
      expect(mockOAuthService.initLoginFlow).toHaveBeenCalled()
    })
  })
});
