import { generateElement } from "../utils";

const Input = (type, id, name) => {
  let element = generateElement("input", {
    type: type,
    id: id,
    name: name,
    required: "required",
  });

  function addClass(className) {
    element.setAttribute("class", className);
  }

  function addPlaceholder(placeholder) {
    element.setAttribute("placeholder", placeholder);
  }

  function addAttribute(attr, value) {
    element.setAttribute(attr, value);
  }

  return {
    element,
    addClass,
    addAttribute,
    addPlaceholder,
  };
};

export default Input;

