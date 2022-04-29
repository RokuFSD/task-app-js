import { generateElement, capitalize } from "../utils";
import Label from "./Label";
import Input from "./Input";

const ButtonGroup = (quantity) => {
  let element = generateElement("div", {
    class: "btn-group",
  });

  function addChild(childElement) {
    element.appendChild(childElement);
  }

  function generateOptions(inners, name) {
    for (let i = 0; i < quantity; i++) {
      let label = Label(
        `btn-group__option btn-group__option--${inners[i]}`
      );
      let input = Input("radio", inners[i], name);
      input.addAttribute("value", inners[i]);
      label.addForTag(inners[i]);
      label.addInnerText(capitalize(inners[i]));
      addChild(input.element);
      addChild(label.element);
    }
  }

  return {
    element,
    generateOptions,
    addChild,
  };
};

export default ButtonGroup;

