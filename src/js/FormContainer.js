import { Overlay } from "./Overlay";
import { setCurrentActive } from "./utils";
import { FormTaskBuilder, FormNoteBuilder, FormProjectBuilder } from "./Form";

const FormContainer = (elementSelector) => {
  let element = document.querySelector(`.${elementSelector}`);
  let outterOverlay = Overlay();
  let builder = "";
  let form = "";

  outterOverlay.addEvent({ type: "click", callback: close });

  function close() {
    form.reset();
    element.classList.remove("form-container--active");
    outterOverlay.toggleOverlay();
  }

  function open() {
    element.classList.toggle("form-container--active");
    builder = FormTaskBuilder;
    outterOverlay.toggleOverlay();
  }

  function buildForm({ editMode = false } = {}) {
    let callBuilder = builder(editMode);
    callBuilder.makeForm();
    form = callBuilder.getForm();
  }

  function setBuilder(newBuilder) {
    builder = newBuilder;
  }

  function getForm() {
    return form;
  }

  function appendFormDOM(root) {
    if (root && root != "") {
      element.querySelector(`.${root}`).appendChild(form.formElement);
    } else {
      element.appendChild(form.formElement);
    }
  }

  return {
    open,
    close,
    getForm,
    buildForm,
    element,
    setBuilder,
    appendFormDOM,
  };
};

export const FormContainerEditing = () => {
  let prototype = FormContainer("form-container-editing");

  function openWithValues(values) {
    prototype.open();
    prototype.buildForm({ editMode: true });
    let formDom = prototype.getForm().formElement;
    formDom.querySelector("#title").setAttribute("value", values._title);
    formDom.querySelector("#description").textContent = values._details;
    formDom.querySelector("#date").setAttribute("value", values._created);
    formDom
      .querySelector(`#${values._priority}`)
      .setAttribute("checked", "checked");
    prototype.appendFormDOM();
  }

  return Object.assign({}, prototype, { openWithValues });
};

export const FormContainerAdd = () => {
  let prototype = FormContainer("form-container");
  let tabs = document.querySelectorAll(".tab");

  tabs.forEach((tab) => tab.addEventListener("click", handleClick));

  function open() {
    prototype.open();
    prototype.buildForm();
    setCurrentActive(tabs[0], "tab--active");
    prototype.appendFormDOM("form-container__form");
  }

  function handleClick(evt) {
    prototype.getForm().reset();
    setCurrentActive(evt, "tab--active");
    switchForm(evt.target.id);
    prototype.appendFormDOM("form-container__form");
  }

  function switchForm(id) {
    switch (id) {
      case "note":
        prototype.setBuilder(FormNoteBuilder);
        break;
      case "task":
        prototype.setBuilder(FormTaskBuilder);
        break;
      case "project":
        prototype.setBuilder(FormProjectBuilder);
        break;
      default:
        throw new Error("No existe builder valido");
    }
    prototype.buildForm();
  }

  return Object.assign({}, prototype, { open });
};
