import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import { SessionStorageService } from './session-storage.service';
export interface IIdentityService extends CanActivateChild {

  canActivateChild(): boolean;

  isAuthorized(): boolean;

  getBearerToken(): string;
  hasClaimSequence(claimValues: string[], claimName: string): boolean;
  hasClaim(name: string, value: string): boolean;

  getScalarClaimValue(name: string): string;

  getArrayClaimValue(name: string): Array<string>;
  setAuthorizationData(token: any, idToken: any): void;
  resetAuthorizationData(): void;

}

@Injectable({
  providedIn: 'root'
})
export class IdentityService implements IIdentityService {

  constructor(private sessionStorageService: SessionStorageService) { }

  canActivateChild(): boolean {
    return this.isAuthorized();
  }

  public isAuthorized(): boolean {
    const authorized = this.sessionStorageService.retrieve('IsAuthorized');
    return authorized !== undefined && authorized;
  }

  public getBearerToken(): string {
    return this.sessionStorageService.retrieve('authorizationData');
  }

  public hasClaimSequence(claimValues: string[], claimName: string): boolean {

    // Are there any matching claimValues in the
    // list of validClaimValues for this claimName

    const validClaimValues = this.getArrayClaimValue(claimName);

    if (validClaimValues == null) {
      return false;
    }

    const foundUserApps = validClaimValues.filter((validClaimValue) => {
      return claimValues.find((claimValue) => {
        return validClaimValue === claimValue;
      });
    });

    if (foundUserApps.length > 0) {
      return true;
    }
    return false;
  }

  public hasClaim(name: string, value: string): boolean {
    const property = '';
    const token = this.getDataFromToken(this.sessionStorageService.retrieve('authorizationData'));
    if (!token) {
        return false;
    }
    const claim = token[name];
    if (!claim) {
        return false;
    } else if (claim === value) {
        return true;
    } else {
        return false;
    }
  }

  public getScalarClaimValue(name: string): any {
    const property = '';
    const token = this.getDataFromToken(this.sessionStorageService.retrieve('authorizationData'));
    const claim = token[name];
    if (!claim) {
        return null;
    }
    return claim;
}

public getArrayClaimValue(name: string): Array<string> {
    const property = ' ';
    const token = this.getDataFromToken(this.sessionStorageService.retrieve('authorizationData'));
    let claim = token[name];
    if (!claim) {
        return [];
        // An array claim will present itself as a string if there's only
        // one value, so make sure we always return an array in this case.
    } else if (!(claim instanceof Array)) {
        claim = [claim];
    }
    return claim;
}

  public resetAuthorizationData(): void {
    this.sessionStorageService.store('authorizationData', '');
    this.sessionStorageService.store('authorizationDataIdToken', '');
    this.sessionStorageService.store('HasAdminRole', false);
    this.sessionStorageService.store('IsAuthorized', false);
  }

  private getDataFromToken(token: any): any {
    let data = {};
    if (token) {
      const encoded = token.split('.')[1];
      data = JSON.parse(this.urlBase64Decode(encoded));
    }
    return data;
  }

  private urlBase64Decode(str: string) {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }

    return window.atob(output);
  }

  public setAuthorizationData(token: any, idToken: any): void {
    if (this.sessionStorageService.retrieve('authorizationData') !== '') {
        this.sessionStorageService.store('authorizationData', '');
    }

    this.sessionStorageService.store('authorizationData', token);
    this.sessionStorageService.store('authorizationDataIdToken', idToken);
    this.sessionStorageService.store('IsAuthorized', true);
}
}
