import { generateElement, generateId, formatDate } from "./utils";
import { Button } from "./componentes";
import { Mediator } from "./Mediator";

export const Task = (data) => {
  let element = generateElement("div", { class: "task" });
  let taskObj = {
    _id: generateId(),
    _title: data.title,
    _details: data.description,
    _created: data.date,
    _done: false,
    _priority: data.priority,
  };

  let modifyButton = Button("Modify");
  let removeButton = Button("Delete");

  modifyButton.addEvent({ type: "click", callback: modify });
  modifyButton.addClass("btn--modify");
  removeButton.addEvent({ type: "click", callback: remove });
  removeButton.addClass("btn--delete");

  appendTaskElements();

  function updateObj(props) {
    taskObj._title = props.title;
    taskObj._details = props.description;
    taskObj._created = props.date;
    taskObj._priority = props.priority;
    appendTaskElements();
  }

  function toggleDone() {
    taskObj._done = !taskObj._done;
    element.classList.toggle("task--done");
    modifyButton.toggleDisable();
    Mediator.notify(Task, "done");
  }

  function createDOMElements() {
    let taskTitle = generateElement(
      "p",
      { class: "task__title main-content main-content--bold" },
      document.createTextNode(taskObj._title)
    );

    let taskDetails = generateElement(
      "p",
      { class: "task__details main-content" },
      document.createTextNode(taskObj._details)
    );

    let taskDueDate = generateElement(
      "p",
      { class: "task__due sub-content" },
      document.createTextNode(`Due Date: ${formatDate(taskObj._created)}`)
    );

    let taskCheck = generateElement("input", {
      type: "checkbox",
      id: "task-checkbox",
    });

    let taskPriority = generateElement("div", {
      class: `task__priority task__priority--${taskObj._priority}`,
    });

    let taskDescription = generateElement(
      "div",
      {
        class: "task__description",
      },
      ...[taskTitle, taskDueDate]
    );

    let taskOpen = generateElement(
      "div",
      {
        class: "task__open",
      },
      ...[modifyButton.element, removeButton.element, taskDetails]
    );

    taskCheck.addEventListener("click", toggleDone);

    return {
      taskOpen,
      taskCheck,
      taskPriority,
      taskDescription,
    };
  }

  function modify() {
    Mediator.notify.call(taskObj, Task, "edit");
  }

  function remove() {
    Mediator.notify.call(taskObj, Task, "delete");
  }

  function appendTaskElements() {
    element.innerHTML = "";
    let innerContent = createDOMElements();
    element.appendChild(innerContent.taskCheck);
    element.appendChild(innerContent.taskDescription);
    element.appendChild(innerContent.taskPriority);
    element.appendChild(innerContent.taskOpen);
  }

  return {
    updateObj,
    element,
    taskObj,
  };
};

