import { Mediator } from "./Mediator";
import { App } from "./App";
import { NoteSection } from "./NoteSection";
import { Project } from "./Project";
import { generateElement } from "./utils";
import { Input, Label, ButtonGroup, TextArea } from "./componentes";
import { TaskSection } from "./TaskSection";

const Form = (element) => {
  let formElement = generateElement("form", { class: `form ${element}` });
  let formData = "";
  let formProps = "";

  formElement.addEventListener("submit", handleSubmit);

  function handleSubmit(evt) {
    evt.preventDefault();
    evt.target.checkValidity();
    fillData();
  }

  function fillData() {
    formData = new FormData(formElement);
    formProps = Object.fromEntries(formData);
  }

  function getFormProps() {
    return formProps;
  }

  function addTextArea({ className, id, name, placeholder }) {
    let newTextArea = TextArea(className, id, name, placeholder);
    addChild(newTextArea.element);
  }

  function addButtonGroup({ quantity, label, inners, name }) {
    let buttonGroup = ButtonGroup(quantity);
    let groupLabel = Label("btn-group__label");
    groupLabel.addInnerText(label);
    buttonGroup.addChild(groupLabel.element);
    buttonGroup.generateOptions(inners, name);
    addChild(buttonGroup.element);
  }

  function addInput({ className, type, id, name, placeholder }) {
    let newInput = Input(type, id, name);
    if (className && className != "") newInput.addClass(className);
    if (placeholder && placeholder != "") newInput.addPlaceholder(placeholder);
    addChild(newInput.element);
  }

  function addLabel({ className, text, forTag }) {
    let newLabel = Label(className);
    if (forTag && forTag != "") newLabel.addForTag(forTag);
    newLabel.addInnerText(text);
    addChild(newLabel.element);
  }

  function addChild(element) {
    formElement.appendChild(element);
  }

  function reset() {
    formElement.remove();
  }

  return {
    formElement,
    addLabel,
    addInput,
    addButtonGroup,
    addTextArea,
    reset,
    getFormProps,
  };
};

export const FormEdit = (section) => {
  let prototype = Form("form__edit");

  prototype.formElement.addEventListener("submit", onSubmit);

  function onSubmit() {
    Mediator.notify(section, "edit");
    Mediator.notify(FormEdit, "submit");
  }

  return Object.assign({}, prototype);
};

export const FormAdd = (section) => {
  let prototype = Form("form__add");

  prototype.formElement.addEventListener("submit", onSubmit);

  function onSubmit() {
    Mediator.notify(section, "new");
    Mediator.notify(FormAdd, "submit");
  }

  return Object.assign({}, prototype);
};

export const FormTaskBuilder = (editor) => {
  let taskSection = App.getTaskSection()
  let form = editor ? FormEdit(taskSection) : FormAdd(taskSection);

  function makeForm() {
    form.addInput({
      className: "form__input",
      type: "text",
      id: "title",
      name: "title",
      placeholder: "Title...",
    });

    form.addTextArea({
      className: "form__textarea",
      id: "description",
      name: "description",
      placeholder: "Description...",
    });

    form.addLabel({
      className: "form__label",
      text: "Date:",
      forTag: "date",
    });

    form.addInput({
      type: "date",
      id: "date",
      name: "date",
    });

    form.addButtonGroup({
      label: "Priority",
      quantity: 3,
      inners: ["high", "medium", "normal"],
      name: "priority",
    });
    form.addInput({
      className: "form__btn form__btn--submit",
      type: "submit",
      id: "submit",
      name: "submit",
    });
  }

  function getForm() {
    return form;
  }

  return {
    makeForm,
    getForm,
  };
};

export const FormNoteBuilder = () => {
  let form = FormAdd(NoteSection);

  function makeForm() {
    form.addInput({
      className: "form__input",
      type: "text",
      id: "title",
      name: "title",
      placeholder: "Title...",
    });

    form.addTextArea({
      className: "form__textarea",
      id: "description",
      name: "description",
      placeholder: "Description...",
    });

    form.addInput({
      className: "form__btn form__btn--submit",
      type: "submit",
      id: "submit",
      name: "submit",
    });
  }
  function getForm() {
    return form;
  }

  return {
    makeForm,
    getForm,
  };
};

export const FormProjectBuilder = () => {
  let form = FormAdd(Project);

  function makeForm() {
    form.addInput({
      className: "form__input",
      type: "text",
      id: "title",
      name: "title",
      placeholder: "Title...",
    });

    form.addInput({
      className: "form__btn form__btn--submit",
      type: "submit",
      id: "submit",
      name: "submit",
    });
  }
  function getForm() {
    return form;
  }
  return {
    getForm,
    makeForm,
  };
};

