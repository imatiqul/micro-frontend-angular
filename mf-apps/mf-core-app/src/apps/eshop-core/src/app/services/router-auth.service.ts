import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouterAuthService {
  roles!: Array<string>; // Store the actions for which this user has permission
 // Store the actions for which this user has permission

  constructor(private authService: AuthService) { }

  public hasPermissionOnOrganizationModule = (): boolean => {
    const r: string[] = [''];

    return this.hasPermissionByRoles(r);
  }

  public hasPermissionByRoles = (roles: string[]): boolean => {
    // if (!this.roles) {
    //   this.initializePermissions();
    // }

    // if (this.roles) {
    //   return this.roles.some(role => roles.includes(role));
    // }
    // return false;

    return this.authService.getRoles().some(role => roles.includes(role));
  }

  // This method is called once and a list of permissions is stored in the permissions property
  public initializePermissions = (): void => {
    this.roles = this.authService.getRoles();
  }

}
