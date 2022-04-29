import { capitalize, generateElement } from "../utils";

const Select = (name) => {
  let element = generateElement("select", { name: name });

  function addOption(value, { selected = false } = {}) {
    let option = generateElement(
      "option",
      selected ? { value: value, selected: "selected" } : { value: value },
      document.createTextNode(capitalize(value))
    );
    element.appendChild(option);
  }

  function addEvent(evt) {
    element.addEventListener(evt.type, evt.callback);
  }

  function addClass(className) {
    element.setAttribute("class", className)
  }

  return {
    addOption,
    addEvent,
    addClass,
    element,
  };
};

export default Select;

