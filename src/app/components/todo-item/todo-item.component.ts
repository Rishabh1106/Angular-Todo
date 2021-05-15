import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo:Todo; // it means todo is a variable Input from parent component of this component. 
  //Parent component ki html file me ye call ho rha hoga with as property binding as todo in this componets html selector
  //refer todos.component.html-> usme app-todo-item ko call pe property binded he jis se @INPUT ki value aa rhi he
  //https://angular.io/guide/inputs-outputs

  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  onToggle(todo){
    //toggle in UI
    todo.completed = !todo.completed;
    //toggle on server
    this.todoService.toggleCompleted(todo).subscribe((todo)=>{
      console.log(todo);
    })
  }

  onDelete(todo){
    this.deleteTodo.emit(todo);
    //emitting todo up in parent component
  }

}
