import { MenuBottomBuilder } from "./Menu.js";
import { setCurrentActive } from "./utils";
import { Mediator } from "./Mediator";

export const Navbar = (() => {
  let navLinks = document.querySelectorAll(".nav__item");
  let menuBuilder = MenuBottomBuilder();
  let subMenu = "";
  setNavigationsEvents();

  function setNavigationsEvents() {
    navLinks.forEach((linkItem) =>
      linkItem.addEventListener("click", (evt) => {
        handleClick(evt);
      })
    );
  }

  function getCurrentId() {
    return document.querySelector(".nav__item--active").id;
  }

  function setCurrentById(id) {
    let element = document.querySelector(`#${id}`)
    setCurrentActive(element, "nav__item--active")
  }

  function handleClick(evt) {
    if (evt.target.matches("[data__item]")) {
      setCurrentActive(evt, "nav__item--active");
      Mediator.notify(Navbar, "render");
    }
    if (evt.target.matches("#add")) Mediator.notify(Navbar, "form");
    if (evt.target.matches("#nav__toggable")) subMenu.openMenu();
  }

  function createMenu(title) {
    menuBuilder.makeMenu(title);
    subMenu = menuBuilder.getMenu();
  }

  return {
    createMenu,
    getCurrentId,
    setCurrentById
  };
})();

Navbar.createMenu("Projects");
