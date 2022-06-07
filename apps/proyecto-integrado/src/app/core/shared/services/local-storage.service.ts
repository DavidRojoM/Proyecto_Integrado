import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(key: string, value: any) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
      window.localStorage.setItem(key, value);
      return;
    }
    window.localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    window.localStorage.removeItem(key);
  }

  clear() {
    window.localStorage.clear();
  }

  getItem(key: string) {
    const value = window.localStorage.getItem(key);
    if (value && value[0] === '{') {
      return JSON.parse(value);
    }
    return value;
  }
}
