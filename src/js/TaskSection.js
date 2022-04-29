import { generateElement, compareDate, compareString } from "./utils";
import { Mediator } from "./Mediator";
import { Select } from "./componentes";

export const TaskSection = (() => {
  let element = "";
  let allTasks = [];
  let sortedTasks = [];
  let sortMode = "date";
  let selectSort = Select("sortBy");
  selectSort.addClass("tasks__sort")
  selectSort.addOption("date", { selected: true });
  selectSort.addOption("priority");
  selectSort.addEvent({ type: "change", callback: setSortMode });

  function setTasks(tasks) {
    allTasks = tasks;
  }

  function setSortMode() {
    sortMode = this.value;
    renderTaskList();
  }

  /*
    true will be coerced to 1 and false to 0 when subtracting. || will return the first truthy operand, 
    so if the first comparison results in 0 (equal), it will use the result of the second comparison
  */
  function triggerSort() {
    sortedTasks = allTasks.sort((a, b) => {
      if (sortMode === "date") {
        return (
          a.taskObj._done - b.taskObj._done ||
          compareDate(a.taskObj._created, b.taskObj._created)
        );
      } else {
        return (
          a.taskObj._done - b.taskObj._done ||
          compareString(a.taskObj._priority, b.taskObj._priority)
        );
      }
    });
  }

  function getTaskById(id) {
    return allTasks.find((task) => task.taskObj._id === id);
  }

  function updateTask(task, props) {
    task.updateObj(props);
    renderTaskList();
  }

  function deleteTask(taskToDelete) {
    allTasks = allTasks.filter((task) => task.taskObj._id !== taskToDelete._id);
    renderTaskList();
  }

  function addNew(task) {
    allTasks.push(task);
    renderTaskList();
  }

  function renderTaskList() {
    triggerSort();
    let allTaskElements = sortedTasks.map((task) => task.element);
    element = generateElement(
      "section",
      { class: "tasks" },
      ...[selectSort.element, ...allTaskElements]
    );

    element.addEventListener("click", (evt) => {
      if (evt.target.classList && evt.target.classList.contains("task")) {
        evt.target.classList.toggle("task__expanded");
      }
    });
    Mediator.notify(TaskSection, "render");
  }

  function getDOMElement() {
    return element;
  }

  return {
    addNew,
    getDOMElement,
    deleteTask,
    getTaskById,
    updateTask,
    renderTaskList,
  };
})();

