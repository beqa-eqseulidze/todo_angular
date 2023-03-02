import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITodo } from '../interfaces/todo.interface';
import { StorageService } from './storage.service';
import {PersonService} from './person.service';
import { IPerson } from '../interfaces/person.interface';
import { TodoStatus } from '../types/todo-status';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private storageService:StorageService,
    private personService:PersonService

    ) { }

  
  get todos():ITodo[]{
    return this.storageService.get('todos')|| []
  }
  
  getTodos():Observable<ITodo[]>{
    return of(this.todos)
  }

  getTodoById(id:string):Observable<ITodo|undefined>{
    return of(this.todos.find(todo => todo.id === id))
  }

  addTodo(todo:ITodo):Observable<ITodo>{
    todo.id=this.generateId();
    todo.status='pending';
    todo.createdAt=new Date();   
    this.personService.getPerson(todo.responsiblePersonId).subscribe((person)=>{
     todo.responsiblePerson=person;    
    })   
    let todos=this.todos;
    todos.push(todo);
    this.storageService.set('todos', todos);
    return of(todo)
  }

  updateTodo(id:number|string,todo:ITodo):Observable<boolean>{    
    let todos=this.todos;
    let index=todos.findIndex(todo =>todo.id === id);
   
    todos[index].responsiblePerson?.id!==todo.responsiblePersonId? this.personService.getPerson(todo.responsiblePersonId).subscribe((person)=>todos[index].responsiblePerson=person):null;
    todos[index] ={...todos[index],... todo};
    this.storageService.set('todos', todos)
    return of(true)
  }
  changeTodoStatus(id:number|string,newStatus:any):Observable<boolean>{    
    let todos=this.todos;
    let index=todos.findIndex(todo =>todo.id === id);
    todos[index] ={...todos[index],... {status:newStatus}};
    this.storageService.set('todos', todos)
    return of(true)
  }
  deleteTodoById(id:number|string):Observable<boolean>{
    let todos=this.todos;
    let index=todos.findIndex(todo =>todo.id === id);
    todos.splice(index, 1);
    this.storageService.set('todos', todos)
    return of(true);
  }
  generateId():string{
    return Math.random().toString(36).substring(2,12)
  }

}
