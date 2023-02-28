import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  get(key:string):any {
    let value = localStorage.getItem(key);
    return value? JSON.parse(value): null;
  }
  remove(key:string): void {
    localStorage.removeItem(key);
  }
}
