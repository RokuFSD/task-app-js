import { generateElement } from "./utils";

export const Overlay = () => {
  let overlay = generateElement("div", { class: "overlay" });
  let toggled = false;

  function setToggled() {
    toggled = !toggled;
  }

  function addEvent(event) {
    overlay.addEventListener(event.type, event.callback);
  }

  function toggleOverlay() {
    let root = document.querySelector("#body")
    if (toggled) {
      root.removeChild(overlay);
    } else {
      root.prepend(overlay);
    }
    setToggled();
  }
  return {
    toggleOverlay,
    addEvent,
  };
};

