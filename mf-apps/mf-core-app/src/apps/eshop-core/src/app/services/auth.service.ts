import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userManager: UserManager;
  private loginChangedSubject = new Subject<boolean>();
  private userSubject!: BehaviorSubject<User>;
  private user!: User | null;

  public loginChanged = this.loginChangedSubject.asObservable();

  private get idpSettings(): UserManagerSettings {
    return {
      authority: environment.identityserveruri,
      client_id: environment.app.clientId,
      redirect_uri: `${environment.app.uri}/signin-response`,
      response_type: "id_token token",
      scope: "openid profile email offline_access basket ordering shoppingaggr",
      filterProtocolClaims: true,
      loadUserInfo: true,
      post_logout_redirect_uri: `${environment.app.uri}/signout-response`,
      revokeAccessTokenOnSignout: true,
      silent_redirect_uri: `${window.location.origin}/silent-renew.html`,
      automaticSilentRenew: true
    };
  }

  constructor(
    private sessionStorageService: SessionStorageService
  ) {
    this.userManager = new UserManager(this.idpSettings);
    this.retriveUserFromStorage();
    this.userManager.events.addAccessTokenExpiring(event => {
      console.log('Acess token is about to expire shortly');
    });



    this.userManager.events.addAccessTokenExpired(event => {
      console.log('access token expired');
      this.logout();
    });
  }

  private retriveUserFromStorage() {
    const user = this.sessionStorageService.retrieve('user');
    if (user && user != 'null') {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(this.sessionStorageService.retrieve('user')));
      this.user = this.userSubject.value;
    }
  }

  public isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  public login = (redirect_url?: string) => {
    return this.userManager.signinRedirect({
      data: {
        redirect_url: redirect_url
      }
    });
  }

  public isAuthenticated = (): Promise<boolean> => {

    if (this.user) {
      return new Promise<boolean>((resolve, reject) => {
        resolve(this.checkUser(this.user));
      })
    }

    return this.userManager.getUser()
      .then(user => {
        if (this.user !== user) {
          this.loginChangedSubject.next(this.checkUser(user));
        }

        this.sessionStorageService.store('user', JSON.stringify(user));
        this.user = user;
        return this.checkUser(user);
      });
  }

  public finishLogin = (): Promise<User> => {
    return this.userManager.signinRedirectCallback()
      .then(user => {
        this.storeUser(user);
        return user;
      });
  }

  startAuthentication(obj: any): Promise<void> {

    return this.userManager.signinRedirect(obj);
  }

  completeAuthentication(): Promise<void> {
    return this.userManager.signinRedirectCallback().then(user => {
      this.user = user;
    });
  }

  storeUser(user: User) {
    this.user = user;
    this.sessionStorageService.store('user', JSON.stringify(user));
    this.loginChangedSubject.next(this.checkUser(user));
  }

  public logout = () => {
    this.userManager.signoutRedirect();
    this.sessionStorageService.clear('user');

    /*
      this is for triggering a event on local storage which method on the index.html file
    */
    localStorage.setItem('flushSessionStorage', 'do not change the key');
    localStorage.removeItem('flushSessionStorage');
  }

  public finishLogout = () => {
    this.user = null;
    this.sessionStorageService.clear('user');
    return this.userManager.signoutRedirectCallback();
  }

  public getAccessToken = (): Promise<any> => {
    return this.userManager.getUser()
      .then(user => {
        return !!user && !user.expired ? user.access_token : null;
      });
  }

  public getIdToken = (): Promise<any> => {
    return this.userManager.getUser()
      .then(user => {
        return !!user && !user.expired ? user.id_token : null;
      });
  }

  public hasPermissionByRole = (role: string): boolean => {
    return this.hasPermissionByRoles([role]);
  }

  public hasPermissionByRoles = (roles: string[]): boolean => {
    const userRoles = this.user?.profile['role'];

    let _roles = [];
    if (!Array.isArray(userRoles)) {
      _roles = [userRoles];
    } else {
      _roles = userRoles;
    }

    return _roles.some(role => roles.includes(role));
  }

  public getRoles = (): string[] => {
    const userRoles = this.user?.profile['role'];

    let _roles = [];
    if (!Array.isArray(userRoles)) {
      _roles = [userRoles];
    } else {
      _roles = userRoles;
    }

    return _roles;
  }

  public getUserId = (): string => {
    return this.user?.profile['user_id'];
  }

  private checkUser = (user: any): boolean => {
    return !!user && !user.expired;
  }
}
