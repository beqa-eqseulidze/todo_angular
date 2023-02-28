import { AfterContentChecked, AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IPerson } from 'src/app/common/interfaces/person.interface';
import { PersonService } from 'src/app/common/services/person.service';
import { TodoService } from 'src/app/common/services/todo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnDestroy, OnInit{
  constructor(
    private personService:PersonService,
    private todoService:TodoService,
    private router:Router,
    private route:ActivatedRoute
    ) { }

    subscription:Subscription | undefined;
    todoId:string|undefined;

  ngOnInit(): void {
    this.subscription=this.route.params.subscribe((params)=>{      
      if(params['id']){
        this.todoId=params['id'];
       this.getTodosById(params['id'])
      }
    })
    
  }
  getTodosById(id:string):void {
    this.subscription=this.todoService.getTodoById(id).subscribe(todo =>{
      if(todo){         
        this.form.patchValue(todo)
      }
    })
  }
  persons:Observable<IPerson[]>=this.personService.getPersons() // იქმნება ფროფერთი როგორც სერვისის ობზერვეიბლი შემდეგ ამ ცვლადს როგორც ობზერვებელს გამოვიყენებთ HთML-ში                                                                
  
  form:FormGroup=new FormGroup({                                
    title:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    dueDate:new FormControl('',Validators.required),
    responsiblePersonId:new FormControl('',Validators.required)
  });



  submit(): void {   
    if(!this.todoId){
          if(this.form.valid){
          this.subscription=this.todoService.addTodo(this.form.value)
            .subscribe(()=>{
              this.router.navigate([''])
            })
          }
          else return;
    }else{     
        this.subscription=this.todoService.updateTodo(this.todoId,this.form.value).subscribe((data) =>{
          console.log(data);          
          this.router.navigate([''])
        })
    }      

  }
  
 
  ngOnDestroy(): void {  
    this.subscription?.unsubscribe()
 }
}
