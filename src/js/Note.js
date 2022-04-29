import { Mediator } from "./Mediator";
import { generateElement, generateId } from "./utils";

export const Note = (data) => {
  let element = generateElement("div", { class: "note" });
  let noteObj = {
    _id: generateId(),
    _title: data.title,
    _details: data.description,
  };
  let domElements = createDOMElements();
  appendChildElements();

  function createDOMElements() {
    let title = generateElement(
      "p",
      { class: "note__title" },
      document.createTextNode(noteObj._title)
    );
    let details = generateElement(
      "p",
      {
        class: "note__description",
      },
      document.createTextNode(noteObj._details)
    );
    let closeBtn = generateElement(
      "button",
      { class: "note__btn" },
      generateElement("i", {
        class: "fa-solid fa-x",
      })
    );
    closeBtn.addEventListener("click", remove);

    return {
      title,
      details,
      closeBtn,
    };
  }

  function remove() {
    Mediator.notify.call(noteObj, Note, "delete");
  }

  function appendChildElements() {
    addChild(domElements.title);
    addChild(domElements.details);
    addChild(domElements.closeBtn);
  }

  function addChild(elementChild) {
    element.appendChild(elementChild);
  }

  return {
    element,
    noteObj,
  };
};

