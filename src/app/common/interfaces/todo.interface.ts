import { TodoStatus } from "../types/todo-status";
import { IPerson } from "./person.interface";


export interface ITodo{
  id?: number|string,
  title:string,
  description?:string,
  status?:TodoStatus,
  dueDate:Date,
  createdAt?:Date,
  updatedAt?:Date,
  removesAt?:Date,
  responsiblePersonId:string,
  responsiblePerson?:IPerson
}