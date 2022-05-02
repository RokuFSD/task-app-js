import { generateElement } from "./utils";

const Menu = () => {
  let menuElement = generateElement("section", { class: "menu" });
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

  function addChild(element) {
    menuElement.appendChild(element);
  }

  function addToSubContainers(child) {
    subContainers.push(child);
  }

  function getSubContainers(id) {
    return subContainers.find(container => container.id === id);
  }

  function handleClose() {
    menuElement.classList.remove("removed");
    menuElement.classList.remove("menu--active")
  }

  function closeMenu() {
    menuElement.classList.add("removed");
    menuElement.addEventListener("animationend", handleClose);
  }

  function openMenu() {
    let root = document.querySelector(".nav__menu");
    root.appendChild(menuElement);
    menuElement.removeEventListener("animationend", handleClose);
    menuElement.classList.add("menu--active")
  }

  return {
    addTitle,
    addButton,
    addInnerMenu,
    getSubContainers,
    openMenu,
    closeMenu,
  };
};

const MenuWrapper = (idWrapper) => {
  let wrapper = generateElement("section", {
    class: "menu__wrapper",
  });
  let id = idWrapper;

  function addChild(element) {
    wrapper.appendChild(element);
  }

  return {
    id,
    wrapper,
    addChild,
  };
};

export const MenuBottomBuilder = () => {
  let menu = Menu();

  function makeMenu(titleText) {
    let innerMenu = MenuWrapper(titleText);
    menu.addTitle(titleText);
    menu.addButton(
      {
        class: "menu__close",
        inner: generateElement("i", { class: "fa-solid fa-x" }),
      },
      { type: "click", callback: menu.closeMenu }
    );
    menu.addInnerMenu(innerMenu);
  }

  function getMenu() {
    return menu;
  }

  return {
    makeMenu,
    getMenu,
  };
};
