import { generateElement } from "../utils";
const Label = (className) => {
  let element = generateElement("label", {
    class: className,
  });

  function addChild(childElement) {
    element.appendChild(childElement);
  }
  function addInnerText(text) {
    element.appendChild(document.createTextNode(text));
  }
  function addForTag(tag) {
    element.setAttribute("for", tag);
  }

  return {
    element,
    addChild,
    addForTag,
    addInnerText,
  };
};

export default Label;

