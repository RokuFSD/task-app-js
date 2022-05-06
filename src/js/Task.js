import { generateElement, generateId, formatDate } from "./utils";
import { Button } from "./componentes";
import { Mediator } from "./Mediator";

export const Task = (data) => {
  let element = generateElement("div", { class: "task" });
  let taskObj = {
    id: data.id ? data.id : generateId(),
    title: data.title,
    details: data.details,
    date: data.date,
    done: data.done ? data.done : false,
    priority: data.priority,
  };

  let modifyButton = Button("Modify");
  let removeButton = Button("Delete");

  modifyButton.addEvent({ type: "click", callback: modify });
  modifyButton.addClass("btn--modify");
  removeButton.addEvent({ type: "click", callback: remove });
  removeButton.addClass("btn--delete");

  domStatus();
  appendTaskElements();

  function getElement() {
    return element;
  }

  function domStatus() {
    if (taskObj.done) {
      element.classList.add("task--done");
      modifyButton.disable();
    } else {
      element.classList.remove("task--done");
      modifyButton.enable()
    }
  }

  function updateObj(props) {
    taskObj.title = props.title;
    taskObj.details = props.details;
    taskObj.date = props.date;
    taskObj.priority = props.priority;
    taskObj.done = props.done;
    domStatus();
    appendTaskElements();
  }

  function toggleDone() {
    taskObj.done = !taskObj.done;
    Mediator.notify.call(taskObj, Task, "done");
  }

  function createDOMElements() {
    let taskTitle = generateElement(
      "p",
      { class: "task__title main-content main-content--bold" },
      document.createTextNode(taskObj.title)
    );

    let taskDetails = generateElement(
      "p",
      { class: "task__details main-content" },
      document.createTextNode(taskObj.details)
    );

    let taskDueDate = generateElement(
      "p",
      { class: "task__due sub-content" },
      document.createTextNode(`Due Date: ${formatDate(taskObj.date)}`)
    );

    let taskCheck = generateElement("input", {
      type: "checkbox",
      id: "task-checkbox",
    });

    let taskPriority = generateElement("div", {
      class: `task__priority task__priority--${taskObj.priority}`,
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
    taskObj.done ? taskCheck.setAttribute("checked", "") : null;

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
    getElement,
    updateObj,
    taskObj,
  };
};

