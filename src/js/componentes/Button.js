import { generateElement } from "../utils";
const Button = (value) => {
  let element = generateElement(
    "button",
    { class: "btn" },
    document.createTextNode(value)
  );
  let disabled = false;

  function addClass(className) {
    element.classList.add(`${className}`);
  }
  function addEvent(event) {
    element.addEventListener(event.type, event.callback);
  }
  function toggleDisable() {
    if (!disabled) {
      element.setAttribute("disabled", "");
    } else {
      element.removeAttribute("disabled", "");
    }
    disabled = !disabled
  }

  return {
    element,
    addClass,
    addEvent,
    toggleDisable,
  };
};

export default Button;
