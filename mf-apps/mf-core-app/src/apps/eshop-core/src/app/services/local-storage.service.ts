import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  /**
   * For any sort of sensitive data we must use session storage.
  */
  private storage: Storage;
  constructor() {
      this.storage = localStorage;
  }

  public store(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public clear(key: string) {
    this.storage.removeItem(key);
  }
  public clearAll(){
    this.storage.clear();
  }
  public retrieve(key: string): any {
    const item = this.storage.getItem(key);

    if (item && item !== 'undefined') {
      const value = this.storage.getItem(key);
      if(value)
      return JSON.parse(value);
    }

    return null;
  }
}
