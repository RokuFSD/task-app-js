import { generateElement, generateId } from "./utils";
import { Overlay } from "./Overlay";

const Menu = () => {
  let menuElement = generateElement("section", { class: "menu" });
  let outterOverlay = false;
  let subContainers = [];

  function addTitle(titleText) {
    let title = generateElement("h3", { class: "menu__title" });
    title.textContent = titleText;
    addChild(title);
  }

  function addButton(type, event) {
    let button = generateElement("button", { class: type.class }, type.inner);
    if (event) {
      button.addEventListener(event.type, event.callback);
    }
    addChild(button);
  }

  function addInnerMenu(menu) {
    addChild(menu.wrapper);
    addToSubContainers(menu);
  }

  function addOverlay(overlay) {
    outterOverlay = overlay;
  }

  function addChild(element) {
    menuElement.appendChild(element);
  }

  function addToSubContainers(child) {
    subContainers.push(child);
  }

  function getSubContainers(id) {
    return subContainers.find(
      (element) => element.wrapper.getAttribute("id") === id
    );
  }

  function handleClose() {
    menuElement.classList.remove("removed");
    menuElement.remove();
    outterOverlay.toggleOverlay();
  }

  function closeMenu() {
    menuElement.classList.add("removed");
    menuElement.addEventListener("animationend", handleClose);
  }

  function openMenu() {
    let root = document.querySelector(".header");
    root.appendChild(menuElement);
    menuElement.removeEventListener("animationend", handleClose);
    outterOverlay.toggleOverlay();
  }

  return {
    addTitle,
    addButton,
    addInnerMenu,
    addOverlay,
    getSubContainers,
    openMenu,
    closeMenu,
  };
};

const MenuWrapper = () => {
  let wrapper = generateElement("section", {
    class: "menu__wrapper",
    id: `${generateId()}`,
  });

  function addChild(element) {
    wrapper.appendChild(element);
  }

  return {
    wrapper,
    addChild,
  };
};

export const MenuBottomBuilder = () => {
  let menu = Menu();

  function makeMenu(titleText) {
    let innerMenu = MenuWrapper();
    let outterOverlay = Overlay();
    menu.addTitle(titleText);
    menu.addButton(
      {
        class: "menu__close",
        inner: generateElement("i", { class: "fa-solid fa-x" }),
      },
      { type: "click", callback: menu.closeMenu }
    );
    menu.addInnerMenu(innerMenu);
    outterOverlay.addEvent({ type: "click", callback: menu.closeMenu });
    menu.addOverlay(outterOverlay);
  }

  function getMenu() {
    return menu;
  }

  return {
    makeMenu,
    getMenu,
  };
};

