import { generateElement, compareDate, compareString } from "./utils";
import { Select } from "./componentes";
import { Mediator } from "./Mediator";

export function TaskSection(title) {
  this.id = title.toLowerCase();
  this.element = "";
  this.allTasks = [];
  this.sortedTasks = [];
  this.sortMode = "date";
  this.selectSort = Select("sortBy");
  this.selectSort.addClass("tasks__sort");
  this.selectSort.addOption("date", { selected: true });
  this.selectSort.addOption("priority");
  this.selectSort.addEvent({
    type: "change",
    callback: (evt) => {
      this.sortMode = evt.target.value;
      Mediator.notify(this, "render");
    },
  });
}

TaskSection.prototype.getAllTasks = function () {
  return this.allTasks;
};

TaskSection.prototype.triggerSort = function () {
  this.sortedTasks = this.allTasks.sort((a, b) => {
    if (this.sortMode === "date") {
      return (
        a.taskObj.done - b.taskObj.done ||
        compareDate(a.taskObj.date, b.taskObj.date)
      );
    } else {
      return (
        a.taskObj.done - b.taskObj.done ||
        compareString(a.taskObj.priority, b.taskObj.priority)
      );
    }
  });
};

TaskSection.prototype.getTaskById = function (id) {
  return this.allTasks.find((task) => task.taskObj.id === id);
};

TaskSection.prototype.updateTask = function (taskID, props) {
  let task = this.getTaskById(taskID);
  console.log(task)
  if (task && task !== "") task.updateObj(props);
};

TaskSection.prototype.deleteTask = function (taskToDelete) {
  this.allTasks = this.allTasks.filter(
    (task) => task.taskObj.id !== taskToDelete
  );
};

TaskSection.prototype.addNew = function (task) {
  this.allTasks.push(task);
};

TaskSection.prototype.renderList = function () {
  let toRender = "";
  this.triggerSort();
  if (this.allTasks.length > 0) {
    toRender = [
      this.selectSort.element,
      ...this.sortedTasks.map((task) => task.getElement()),
    ];
  } else {
    toRender = [...this.sortedTasks.map((task) => task.getElement())];
  }
  this.element = generateElement("section", { class: "tasks" }, ...toRender);
  this.element.addEventListener("click", (evt) => {
    if (evt.target.classList && evt.target.classList.contains("task")) {
      evt.target.classList.toggle("task__expanded");
    }
  });
};

TaskSection.prototype.getDOMElement = function () {
  return this.element;
};

