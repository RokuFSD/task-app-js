import { generateElement, capitalize } from "./utils";
import { TaskSection as inbox } from "./TaskSection";
import { NoteSection as notes } from "./NoteSection";

export const App = (() => {
  let header = document.querySelector(".app__header");
  let body = document.querySelector(".app__body");
  let headerTitle = "";
  let bodyContent = "";
  let currentPage = "";

  function createHeader() {
    headerTitle = generateElement("h1", { class: "header__title" });
    headerTitle.textContent = capitalize(currentPage);
  }

  function createBodyContent() {
    bodyContent = objectOf().getDOMElement();
  }

  function appendHeader() {
    header.appendChild(headerTitle);
  }

  function appendBodyContent() {
    if (bodyContent == "") return;
    body.appendChild(bodyContent);
  }

  function objectOf() {
    if (currentPage === "inbox") return inbox;
    return notes;
  }

  function reset() {
    header.innerHTML = "";
    body.innerHTML = "";
  }

  function handlePage(page) {
    currentPage = page;
    reset();
    createHeader();
    createBodyContent();
  }

  function renderPage(page) {
    handlePage(page);
    appendHeader();
    appendBodyContent();
  }

  return {
    renderPage,
  };
})();

//Initial state
App.renderPage("inbox");
