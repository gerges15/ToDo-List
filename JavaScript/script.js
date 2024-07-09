'use strict';

const taskDetails = {
  task: { taskID: null, taskContent: null },
};

class Task {
  #date = new Date();
  #id = (Date.now() + '').slice(-10) + Math.floor(Math.random() * 5) + 1;
  #taskContent;
  #taskState = 'incomplete';
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
  set _setTaskContent(content = '') {
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
    this._setTaskStateCompleteOrIncomplete = 'incomplete';
  }
}

class CompleteTask extends Task {
  constructor() {
    super();
    this._setTaskStateCompleteOrIncomplete = 'complete';
  }
}

/////////////////////////////////
const container = document.querySelector('.container');
const toDoApp = document.querySelector('.todoApp');
const toDoAppHeader = document.querySelector('.todoApp__header');
const toDoAppDate = document.querySelector('.todoApp-date');
const toDoAppDay = document.querySelector('.todoApp-day--number');
const toDoAppMonthAndYearContainer = document.querySelector(
  '.todoApp-month-year'
);
const month = document.querySelector('.month');
const year = document.querySelector('.year');
const toDoAppDayString = document.querySelector('.todoApp-day--string');
const toDoAppBody = document.querySelector('.todoApp__body');
const taskGroup = document.querySelector('.task__list');
const task = document.querySelector('.task');
const btnCreate = document.querySelector('.btn__create');
const btnSave = document.querySelector('.btn__save');
const form = document.querySelector('.form');
const inputField = document.querySelector('.input-field');

const checkbox = document.querySelector('input[type = "checkbox"]');
class ToDoApp {
  #date = new Date();
  constructor() {
    this._addClickEventTargetAndCallBackFunction(
      btnCreate,
      this._activeBtnCreate.bind(this)
    );
    this._addClickEventTargetAndCallBackFunction(
      btnCreate,
      this._renderSelectedElementToggle.bind(this, form)
    );

    this._addClickEventTargetAndCallBackFunction(
      btnSave,
      this._makeIncompleteTask.bind(this)
    );
    this._addClickEventTargetAndCallBackFunction(
      btnSave,
      this._activeBtnCreate.bind(this)
    );

    this._addClickEventTargetAndCallBackFunction(taskGroup, () =>
      console.log('checked')
    );
  }

  _addClickEventTargetAndCallBackFunction(target, callBackFunction) {
    target.addEventListener('click', callBackFunction);
  }

  _activeBtnCreate() {
    btnCreate.classList.toggle('btn--active');
  }

  _renderTaskCreationFiled() {
    form.classList.toggle('hide');
  }

  _makeIncompleteTask() {
    const task = this._makeNewTask();
    if (this._isInputNull(inputField.value))
      return this._renderSelectedElementToggle(form);
    task._setTaskContent = inputField.value;
    this._renderSelectedElementToggle(form);
    this._clearInputFieldValue(inputField);
    this._renderTask(task, 'input');
    taskDetails.task.taskID = task.getId;
    taskDetails.task.taskContent = task.getTaskContent;
  }

  _makeNewTask() {
    return new IncompleteTask();
  }
  _isInputNull(inputFieldValue) {
    return inputFieldValue === '' ? true : false;
  }

  _renderSelectedElementToggle(selector) {
    selector.classList.toggle('hide');
  }

  _clearInputFieldValue(Element) {
    Element.value = '';
  }

  _renderTask(task, type = 'input') {
    const markup = this._generateTaskMarkup(task, type);
    taskGroup.insertAdjacentHTML('afterbegin', markup);
  }

  _generateTaskMarkup(task, type = 'input') {
    const taskID = task.getId;
    const taskContent = task.getTaskContent;
    return `
    <div class="task" id="task-${taskID}">

              <li>${taskContent}</li>
              ${this._generateTaskInputTypeMarkup(type)}
              
    </div>
    `;
  }

  _generateTaskInputTypeMarkup(inputType = 'input') {
    if (inputType === 'input')
      return `<div class="type--input">
                <input type="checkbox" name="task" value="1"" />
              </div>`;
    if (inputType === 'checked')
      return `
              <div class="type--checked">
                <img src="./assets/Icons/checked.png" alt="" />
                </div>
                `;
  }

  _hideSelectedModel(selector) {
    selector.style.display = 'none';
  }

  _showSelectedModel(selector) {
    selector.style.display = 'auto';
  }
  _clear(container) {
    container.innerHTML = '';
  }
}

const app = new ToDoApp();
