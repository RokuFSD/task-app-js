import { MenuBottomBuilder } from "./Menu.js";
import { setCurrentActive } from "./utils";
import { Mediator } from "./Mediator";

export const Navbar = (() => {
  let domElement = document.querySelector(".nav__menu");
  let menuBuilder = MenuBottomBuilder();
  let subMenu = "";
  setNavigationsEvents();

  function setNavigationsEvents() {
    domElement.addEventListener("click", (evt) => {
      handleClick(evt);
    });
    domElement.addEventListener("keydown", (evt) => {
      handlePress(evt);
    });
  }

  function getCurrentId() {
    return document.querySelector(".nav__item--active").id;
  }

  function setCurrentById(id) {
    let element = document.querySelector(`#${id}`);
    setCurrentActive(element, "nav__item--active");
  }

  function onClickPress(evt) {
    if (evt.target.matches("[data__item]")) {
      setCurrentActive(evt, "nav__item--active");
      Mediator.notify(Navbar, "render");
    }
    if (evt.target.matches("#add")) Mediator.notify(Navbar, "form");
    if (evt.target.matches("#nav__toggable")) subMenu.openMenu();
  }

  function handleClick(evt) {
    evt.preventDefault();
    onClickPress(evt);
  }

  function handlePress(evt) {
    if (evt.keyCode === 13 || evt.keyCode === 32) {
      onClickPress(evt);
    }
  }

  function createMenu(title) {
    menuBuilder.makeMenu(title);
    subMenu = menuBuilder.getMenu();
  }

  function getSubMenu() {
    return subMenu;
  }

  return {
    createMenu,
    getCurrentId,
    setCurrentById,
    getSubMenu,
  };
})();
Navbar.createMenu("Projects");

