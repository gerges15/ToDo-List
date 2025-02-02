'use strict';

const taskDetails = {
  taskID: null,
  taskContent: null,
  completeTaskGroup: [],
  incompleteTaskGroup: [],
  addCompleteTask() {
    this.completeTaskGroup.push({
      getId: this.taskID,
      getTaskContent: this.taskContent,
    });

    if (this.incompleteTaskGroup === null) return;
    this.deleteTask(this.incompleteTaskGroup);
  },
  addIncompleteTask() {
    this.incompleteTaskGroup.push({
      getId: this.taskID,
      getTaskContent: this.taskContent,
    });
  },
  getIndexOfTask(groupType = 'incompleteTaskGroup') {
    const idGroup = this.getTaskGroupIDs(groupType);
    const index = idGroup.indexOf(this.taskID);
    return index;
  },
  deleteTask(groupType) {
    const index = this.getIndexOfTask(groupType);
    if (index > -1) groupType.splice(index, 1);
  },
  _isTaskExistInGroup(group) {
    return group.some(el => (this.taskID === el.taskID ? true : false));
  },
  getTaskGroupIDs(groupType) {
    return groupType.map(task => `task-${task.getId}`);
  },
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
const taskTab = document.querySelector('.task-tab');
const completeTaskTab = document.querySelector('.finished-tab');
const deleteImg = document.querySelector('#delete');

class ToDoApp {
  #date = new Date();
  constructor() {
    this._renderDate();
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

    this._addClickEventTargetAndCallBackFunction(
      taskGroup,
      this._renderCheckedTask.bind(this)
    );
    this._addClickEventTargetAndCallBackFunction(
      taskTab,
      this._renderIncompleteTaskGroup.bind(this)
    );
    this._addClickEventTargetAndCallBackFunction(
      completeTaskTab,
      this._renderCompleteTaskGroup.bind(this)
    );

    this._addClickEventTargetAndCallBackFunction(
      taskGroup,
      this._renderModifyingTask.bind(this)
    );

    this._addClickEventTargetAndCallBackFunction(
      container,
      this._closeModel.bind(this)
    );

    this._addClickEventTargetAndCallBackFunction(
      taskGroup,
      this._deleteTask.bind(this)
    );
    this._addClickEventTargetAndCallBackFunction(
      taskGroup,
      this._editTask.bind(this)
    );
    // this._addClickEventTargetAndCallBackFunction(btnEdit, function () {
    //   console.log("Hi i'm btn save you clicked me just now");
    // });
  }

  _renderDate() {
    const [dayString, monthString, dayToDo, yearToDo] = this.#date
      .toDateString()
      .split(' ');

    month.textContent = monthString;
    year.textContent = yearToDo;
    toDoAppDay.textContent = dayToDo;
    toDoAppDayString.textContent = dayString;
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
    taskDetails.taskID = task.getId;
    taskDetails.taskContent = task.getTaskContent;
    taskDetails.addIncompleteTask();
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

  _renderIncompleteTaskGroup() {
    this._clear(taskGroup);
    taskDetails.incompleteTaskGroup.forEach(task =>
      this._renderTask(task, 'input')
    );
    this._removeActiveTab(completeTaskTab);
    this._activeTab(taskTab);
  }
  _renderCompleteTaskGroup() {
    this._clear(taskGroup);
    taskDetails.completeTaskGroup.forEach(task =>
      this._renderTask(task, 'checked')
    );
    this._removeActiveTab(taskTab);
    this._activeTab(completeTaskTab);
  }

  _clear(container) {
    container.innerHTML = '';
  }
  _renderTask(task, type = 'input') {
    const markup = this._generateTaskMarkup(task, type);
    taskGroup.insertAdjacentHTML('beforeend', markup);
  }

  _generateTaskMarkup(task, type = 'input') {
    const taskID = task.getId;
    const taskContent = task.getTaskContent;
    return `
    <div class="task" id="task-${taskID}">
    
    <div class = "task__Content"><li>${taskContent}</li></div>
    ${this._generateTaskInputTypeMarkup(type)}
    
    </div>
    `;
  }

  _generateTaskInputTypeMarkup(inputType = 'input') {
    if (inputType === 'input')
      return `<div class="type type--input">
    <input type="checkbox" name="task" value="1"" />
    </div>`;
    if (inputType === 'checked')
      return `
    <div class=" type type--checked task-finished">
    <img src="./assets/Icons/checked.png" alt="" />
    </div>
    `;
    if (inputType === 'modify')
      return `
    <div class=" type type--modify task-edit">
                <img id="delete" src="./assets/Icons/delete.png" alt="" />
                <img id="edit" src="./assets/Icons/edit.png" alt="" />
    </div>
    `;
    if (inputType === 'edit')
      return `
    <div class = 'flex'>
      <li><input type="text" /></li>
      <div class="typ type--modify">
                  <button class="edit-btn">save</button>
      </div>
    </div>
    `;
  }

  _activeTab(tab) {
    tab.classList.add('tab--active');
  }
  _removeActiveTab(tab) {
    tab.classList.remove('tab--active');
  }
  _renderCheckedTask(e) {
    const target = e.target;
    const taskID = target.closest('.task').id;
    const task = document.querySelector(`#${taskID}`);
    const taskContent = task.getElementsByTagName('li')[0].textContent;
    const taskIdAndContentGroup = [taskID, taskContent];
    if (target.type === 'checkbox') {
      task.classList.toggle('task-checked');
      this._storeDataIdAndTaskContent(taskIdAndContentGroup, 'complete');
      this._hideSelectedModel(task);
    }
  }
  _isChecked() {
    return checkbox.checked;
  }

  _storeDataIdAndTaskContent(taskIdAndContentGroup, state = 'complete') {
    taskDetails.taskID = taskIdAndContentGroup[0];
    taskDetails.taskContent = taskIdAndContentGroup[1];
    if (taskDetails._isTaskExistInGroup(taskDetails.completeTaskGroup)) return;
    taskDetails.addCompleteTask();
    console.log(taskDetails.completeTaskGroup);
    console.log(taskDetails.incompleteTaskGroup);
  }

  _hideSelectedModel(selector) {
    selector.style.display = 'none';
  }

  _showSelectedModel(selector) {
    selector.style.display = 'auto';
  }

  _renderModifyingTask(e) {
    const target = e.target;
    const taskID = target.closest('.task').id;
    const task = document.querySelector(`#${taskID}`);

    if (target.type !== 'checkbox') {
      document
        .querySelectorAll('.type')
        .forEach(type => (type.style.display = 'none'));
      const markupModify = this._generateTaskInputTypeMarkup('modify');

      const markupInput = this._generateTaskInputTypeMarkup('input');

      task.insertAdjacentHTML('beforeend', markupModify);
      const taskIdGroup = taskDetails.getTaskGroupIDs(
        taskDetails.incompleteTaskGroup
      );

      taskIdGroup.forEach(id => {
        if (id !== taskID)
          document
            .querySelector(`#${id}`)
            .insertAdjacentHTML('beforeend', markupInput);
      });
    }
  }

  _closeModel(e) {
    const target = e.target;
    const isContainerClass = target.classList.contains('container');
    const isTodoAppClass = target.classList.contains('todoApp');
    const isFormClass = target.classList.contains('form');
    if (isContainerClass || isTodoAppClass) this._renderIncompleteTaskGroup();
    if (isContainerClass || isFormClass) {
      form.classList.add('hide');
      btnCreate.classList.remove('btn--active');
    }
  }
  _deleteTask(e) {
    const target = e.target;
    const taskID = target.closest('.task').id;
    const task = document.querySelector(`#${taskID}`);
    taskDetails.taskID = taskID;
    if (target.id === 'delete') {
      this._hideSelectedModel(task);
      taskDetails.deleteTask(taskDetails.incompleteTaskGroup);
    }
  }
  _editTask(e) {
    const target = e.target;

    const taskID = target.closest('.task').id;
    const task = document.querySelector(`#${taskID}`);
    taskDetails.taskID = taskID;
    if (target.id === 'edit') {
      this._renderTaskEditing(task);
      console.log('you clicked me :D');
    }
  }

  _renderTaskEditing(task) {
    const markupEdit = this._generateTaskInputTypeMarkup('edit');
    const markupInput = this._generateTaskInputTypeMarkup('input');
    const taskID = task.id;
    const taskIdGroup = taskDetails.getTaskGroupIDs(
      taskDetails.incompleteTaskGroup
    );
    document
      .querySelectorAll('.type')
      .forEach(type => (type.style.display = 'none'));
    this._clear(task);
    task.insertAdjacentHTML('beforeend', markupEdit);
    task.classList.add('task-edit');
    task.classList.add('task-edit--active');
    taskIdGroup.forEach(id => {
      if (id !== taskID)
        document
          .querySelector(`#${id}`)
          .insertAdjacentHTML('beforeend', markupInput);
    });
    task.classList.add('flex');
    task.style.padding = '0';
    this._saveNewEditedTask(task);
  }

  _saveNewEditedTask(task) {
    const taskIdGroup = taskDetails.getTaskGroupIDs(
      taskDetails.incompleteTaskGroup
    );
    const index = taskIdGroup.indexOf(task.id);
    let taskContent = taskDetails.incompleteTaskGroup[index].getTaskContent;
    console.log(taskContent);
    let inputVal = document.querySelector('input[type = text]');
    inputVal.value += taskContent;
    this.renderNewGroup(inputVal, index);
  }

  renderNewGroup(taskContent, index) {
    const btnEdit = document.querySelector('.edit-btn');
    btnEdit.addEventListener('click', () => {
      taskDetails.incompleteTaskGroup[index].getTaskContent = taskContent.value;
      this._renderIncompleteTaskGroup();
    });
  }
}

const app = new ToDoApp();
