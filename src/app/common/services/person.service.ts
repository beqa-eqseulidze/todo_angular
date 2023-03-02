import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { persons } from 'src/app/shared/datas/persons';
import { IPerson } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor() { }
  persons:IPerson[]=persons

  getPersons(): Observable<IPerson[]> {
    return of(this.persons)
  }

  getPerson(id:string|number): Observable<IPerson|undefined> {
    return of(this.persons.find(person => person.id === id))
  }

}
