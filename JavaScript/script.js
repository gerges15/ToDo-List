class Task {}

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
