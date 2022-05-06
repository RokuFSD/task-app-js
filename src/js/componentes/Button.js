import { generateElement } from "../utils";
const Button = (value) => {
  let element = generateElement(
    "button",
    { class: "btn" },
    document.createTextNode(value)
  );

  function addClass(className) {
    element.classList.add(`${className}`);
  }
  function addEvent(event) {
    element.addEventListener(event.type, event.callback);
  }

  function disable() {
    element.setAttribute("disabled", "");
  }

  function enable() {
    element.removeAttribute("disabled", "");
  }

  return {
    element,
    addClass,
    addEvent,
    disable,
    enable,
  };
};

export default Button;

