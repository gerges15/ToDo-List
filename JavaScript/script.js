class Task {
  #date = new Date();
  #id = (Date.now() + "").slice(-10);
  #taskContent;
  #taskState = "incomplete";
  constructor() {}

  get getDate() {
    return this.#date;
  }
  get getId() {
    return this.#id;
  }
  get getTaskContent() {
    return this.#taskContent;
  }
  set _setTaskContent(content = "") {
    this.#taskContent = content;
  }

  get getTaskStateCompleteOrIncomplete() {
    return this.#taskState;
  }
  set _setTaskStateCompleteOrIncomplete(taskState) {
    this.#taskState = taskState;
  }
}
const task1 = new Task();
console.log(task1.getDate.toDateString());
console.log(task1.getId);
task1._setTaskContent = "complete todoApp today";
console.log(task1.getTaskContent);
console.log(task1.getTaskStateCompleteOrIncomplete);

class IncompleteTask extends Task {}

class CompleteTask extends Task {}
/////////////////////////////////
const container = document.querySelector(".container");
const toDoApp = document.querySelector(".todoApp");
const toDoAppHeader = document.querySelector(".todoApp__header");
const toDoAppDate = document.querySelector(".todoApp-date");
const toDoAppDay = document.querySelector(".todoApp-day--number");
const toDoAppMonthAndYearContainer = document.querySelector(
  ".todoApp-month-year"
);
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const toDoAppDayString = document.querySelector(".todoApp-day--string");
const toDoAppBody = document.querySelector(".todoApp__body");
const taskGroup = document.querySelector(".task__list");
const task = document.querySelector(".task");
const btnCreate = document.querySelector(".btn__create");
const btnSave = document.querySelector(".btn__save");

class ToDoApp {}
