import { Mediator } from "./Mediator";
import { TaskSection } from "./TaskSection";
import { generateElement } from "./utils";

export function Project(title) {
  TaskSection.call(this, title);
  this.deleteButton = generateElement(
    "button",
    { class: "wrapper__delete" },
    generateElement("i", { class: "fa-solid fa-trash" })
  );

  this.link = generateElement(
    "li",
    {
      class: "wrapper__item",
      id: title.toLowerCase(),
      tabindex: "0",
    },
    ...[document.createTextNode(title), this.deleteButton]
  );

  this.link.setAttribute("data__item", "");
  this.deleteButton.addEventListener("click", () => {
    Mediator.notify(this, "delete");
    this.link.remove();
  });
}

Project.prototype = Object.create(TaskSection.prototype);
