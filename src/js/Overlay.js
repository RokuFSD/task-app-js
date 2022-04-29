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
    const body = document.getElementById("body");
    if (toggled) {
      body.removeChild(overlay);
    } else {
      body.prepend(overlay);
    }
    setToggled();
  }
  return {
    toggleOverlay,
    addEvent,
  };
};

