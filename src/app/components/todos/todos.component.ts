import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import {Todo} from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos : Todo[];

  constructor(public todoServices:TodoService) { }

  ngOnInit(): void {
    this.todoServices.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo:Todo){
    console.log('delete me...')
    this.todos = this.todos.filter(t=> t.id !== todo.id);
    // above is the deletion from UI
    // this will filter out the todos we have deleted and dont show in UI 
    
    // now to delete from server I will make a func in service
    this.todoServices.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo){
    this.todoServices.addTodo(todo).subscribe(todo =>{
      this.todos.push(todo);
    })
  }

}
