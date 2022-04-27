import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import {OAuthService} from 'angular-oauth2-oidc';

import { UserService } from './user.service';

describe('UserService', () => {
  const baseHref = 'baseHref'
  let mockOAuthService: any
  let mockDocument: any
  let service: UserService

  beforeEach(() => {
    mockDocument = {
      querySelector: jest.fn().mockReturnValue({
        getAttribute: jest.fn().mockReturnValue(baseHref)
      })
    }
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
        { provide: DOCUMENT, useValue: mockDocument },
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('in dev environment', () => {
    beforeEach(() => {
      service.oAuthEnabled = false
    })
    it('should return user email as form of ID', async () => {
      expect(await service.getUserId()).toBe(UserService.TEST_USER_ID);
    })

    it('should know if the user has write access', async () => {
      expect(await service.hasWriteAccess()).toBe(true);
    })
  })

  /**
   * this happens right after authorization_endpoint calls our app back with authcode
   *
   * when we try to get user information, we first need to call token_endpoint with the authcode
   */
  describe('in qa/prod environment, with authcode and successful token retrieval', () => {
    const email = 'realuser@email.com'
    beforeEach(() => {
      service.oAuthEnabled = true
      mockOAuthService.tryLogin.mockResolvedValue(true)
      mockOAuthService.getIdentityClaims.mockReturnValue({email})
      // we do not have access token the first time we check, but after we call tryLogin, we would have it
      mockOAuthService.hasValidAccessToken.mockReturnValueOnce(false).mockReturnValue(true)
      mockOAuthService.hasValidIdToken.mockReturnValue(true)
    })

    it('should return user email as form of ID', async () => {
      expect(await service.getUserId()).toBe(email)
      expect(mockOAuthService.tryLogin).toHaveBeenCalled()
      // no need to redirect to authorization_endpoint
      expect(mockOAuthService.initLoginFlow).not.toHaveBeenCalled()
    })

    it('should know if the user has write access', async () => {
      expect(await service.hasWriteAccess()).toBe(true)
      expect(mockOAuthService.tryLogin).toHaveBeenCalled()
      // no need to redirect to authorization_endpoint
      expect(mockOAuthService.initLoginFlow).not.toHaveBeenCalled()
    })
  })

  /**
   * this happens before user logs in, meaning we do not have authcode and thus
   * cannot get a token
   */
  describe('in qa/prod environment, without authcode', () => {
    beforeEach(() => {
      service.oAuthEnabled = true
      // tryLogin always returns true even if token is not retrieved
      mockOAuthService.tryLogin.mockResolvedValue(true)
      mockOAuthService.hasValidAccessToken.mockReturnValue(false)
      mockOAuthService.hasValidIdToken.mockReturnValue(false)
    })

    it('should return user email as form of ID', async () => {
      return service.getUserId().then(() => {
        fail("expected error to be thrown")
      }).catch(() => {
        expect(mockOAuthService.tryLogin).toHaveBeenCalled()
        // no need to redirect to authorization_endpoint
        expect(mockOAuthService.initLoginFlow).not.toHaveBeenCalled()
      })
    })

    it('should know if the user has write access', async () => {
      expect(await service.hasWriteAccess()).toBe(false)
      expect(mockOAuthService.tryLogin).toHaveBeenCalled()
      // no need to redirect to authorization_endpoint
      expect(mockOAuthService.initLoginFlow).not.toHaveBeenCalled()
    })
  })

  /**
   * this happens before user logs in, meaning we do not have authcode and thus
   * cannot get a token
   */
  describe('in qa/prod environment, failed to get authcode', () => {
    const errorMessage = 'cannot get token'
    beforeEach(() => {
      service.oAuthEnabled = true
      // tryLogin always returns true even if token is not retrieved
      mockOAuthService.tryLogin.mockRejectedValue(new Error(errorMessage))
      mockOAuthService.hasValidAccessToken.mockReturnValue(false)
      mockOAuthService.hasValidIdToken.mockReturnValue(false)
    })

    it('should return user email as form of ID', async () => {
      return service.getUserId().then(() => {
        fail("expected error to be thrown")
      }).catch((error) => {
        expect(error.message).toBe(errorMessage)
        expect(mockOAuthService.tryLogin).toHaveBeenCalled()
        // no need to redirect to authorization_endpoint
        expect(mockOAuthService.initLoginFlow).not.toHaveBeenCalled()
      })
    })

    it('should know if the user has write access', async () => {
      return service.hasWriteAccess().then(() => {
        fail("expected error to be thrown")
      }).catch((error) => {
        expect(error.message).toBe(errorMessage)
        expect(mockOAuthService.tryLogin).toHaveBeenCalled()
        // no need to redirect to authorization_endpoint
        expect(mockOAuthService.initLoginFlow).not.toHaveBeenCalled()
      })
    })
  })
})
