import { TestBed } from '@angular/core/testing';
import {OAuthService} from 'angular-oauth2-oidc';

import { UserService } from './user.service';

describe('UserService', () => {
  let mockOAuthService
  let service: UserService

  beforeEach(() => {
    mockOAuthService = {
      configure: jest.fn(),
      tryLogin: jest.fn().mockResolvedValue(true),
      hasValidAccessToken: jest.fn().mockReturnValueOnce(false).mockReturnValue(true),
      hasValidIdToken: jest.fn().mockReturnValueOnce(false).mockReturnValue(true),
      initLoginFlow: jest.fn(),
      getIdentityClaims: jest.fn(),
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
    it('should return user email as form of ID', () => {
      expect(service.userId).toBe(UserService.TEST_USER_ID);
    })

    it('should know if the user has write access', () => {
      expect(service.hasWriteAccess).toBe(true);
    })
  })

  describe('in qa/prod environment', () => {
    const email = 'realuser@email.com'
    beforeEach(() => {
      service.oauthEnabled = true
      mockOAuthService.getIdentityClaims.mockReturnValue({
        email
      })
    })
    it('should return user email as form of ID', () => {
      // before loggin in
      expect(oAuthService.hasValidAccessToken: jest.fn().mockReturnValueOnce(false).mockReturnValue(true),
      expect(oAuthService.hasValidIdToken: jest.fn().mockReturnValueOnce(false).mockReturnValue(true),
      expect(service.initLoginFlow).toHaveBeenCalled()
      expect(service.userId).toBe(email)
    })

    it('should know if the user has write access', () => {
      expect(service.hasWriteAccess).toBe(true);
    })
  })
});
