class Task {
  #date = new Date();
  #id = (Date.now() + "").slice(-10) + Math.floor(Math.random() * 5) + 1;
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

class IncompleteTask extends Task {
  constructor() {
    super();
    this._setTaskStateCompleteOrIncomplete = "incomplete";
  }
}

const taskIncomplete = new IncompleteTask();
const date = taskIncomplete.getDate;
const id = taskIncomplete.getId;
const state = taskIncomplete.getTaskStateCompleteOrIncomplete;
console.log(date, id, state);

class CompleteTask extends Task {
  constructor() {
    super();
    this._setTaskStateCompleteOrIncomplete = "complete";
  }
}
const taskComplete = new CompleteTask();
const taskComplete2 = new CompleteTask();
const dateComplete = taskComplete.getDate;
const idComplete = taskComplete.getId;
const idComplete2 = taskComplete2.getId;
const stateComplete = taskComplete.getTaskStateCompleteOrIncomplete;
console.log(dateComplete, idComplete, idComplete2, stateComplete);
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
