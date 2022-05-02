import { TaskSection } from "./TaskSection";
import { generateElement } from "./utils";

export function Project(title) {
  TaskSection.call(this, title);
  this.link = generateElement(
    "li",
    {
      class: "wrapper__item",
      id: title.toLowerCase(),
    },
    document.createTextNode(title)
  );
  this.link.setAttribute("data__item", "");
}

Project.prototype = Object.create(TaskSection.prototype);

