import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITodo } from 'src/app/common/interfaces/todo.interface';
import { StorageService } from 'src/app/common/services/storage.service';
import { TodoService } from 'src/app/common/services/todo.service';
import { TodoStatus } from 'src/app/common/types/todo-status';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  
  subscriptions: Subscription|undefined ;

  todos:ITodo[]=[];

  constructor(
    private todoService:TodoService    
    ) {}

  ngOnInit(): void {
    this.getTodos();    
  }

  getTodos(){
    this.subscriptions=this.todoService.getTodos().subscribe((todo)=>{
      this.todos =todo;    
    })
   
  }
  
  // edit($event: any): ITodo|undefined{
    
    //   return this.todos.find(todo=>todo.id == todoId)
    // }
    delete(id: any): void{    
    this.subscriptions=this.todoService.deleteTodoById(id).subscribe((res)=>{this.getTodos()})
  } 
  statChange(id:any,status:TodoStatus|undefined): void{
    let stat;
    if(status){
       if(status=='complited'){
        stat="pending"
       }else{
         stat="complited"
       }
       this.todoService.changeTodoStatus(id,stat).subscribe((res)=>{this.getTodos(); })
  }
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
