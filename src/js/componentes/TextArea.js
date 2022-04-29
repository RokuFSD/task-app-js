import { generateElement } from "../utils";
const TextArea = (className, id, name, placeholder) => {
  let element = generateElement("textarea", {
    class: className,
    id: id,
    name: name,
    placeholder: placeholder,
    required: "required"
  });

return {element}
};

export default TextArea;
