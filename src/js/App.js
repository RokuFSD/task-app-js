import { generateElement, capitalize } from "./utils";
import { TaskSection } from "./TaskSection";
import { NoteSection } from "./NoteSection";

export const App = (() => {
  let header = document.querySelector(".app__header");
  let body = document.querySelector(".app__body");
  let headerTitle = "";
  let bodyContent = "";
  let currentPage = "";
  let inbox = new TaskSection("inbox");
  let projects = [];
  let currentTaskSection = inbox;
  let currentSection = inbox;

  function createHeader() {
    headerTitle = generateElement("h1", { class: "header__title" });
    headerTitle.textContent = capitalize(currentPage);
  }

  function deleteAll(id) {
    inbox.deleteTask(id);
    projects.map((project) => {
      let task = project.getTaskById(id);
      if (task && task !== "") project.deleteTask(id);
    });
  }

  function updateAll(id, props) {
    inbox.updateTask(id, props);
    projects.map((project) => {
      project.updateTask(id, props);
    });
  }

  function createBodyContent() {
    currentSection.renderList();
    bodyContent = currentSection.getDOMElement();
  }

  function appendHeader() {
    header.appendChild(headerTitle);
  }

  function appendBodyContent() {
    if (bodyContent == "") return;
    body.appendChild(bodyContent);
  }

  function reset() {
    header.innerHTML = "";
    body.innerHTML = "";
  }

  function addNewProject(project) {
    projects.push(project);
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

  function changeTaskSection(id) {
    let isProject = projects.find((project) => project.id === id);
    if (isProject) {
      currentTaskSection = isProject;
      currentSection = isProject;
    } else {
      switch (id) {
        case "inbox":
          currentTaskSection = inbox;
          currentSection = inbox;
          break;
        case "notes":
          currentSection = NoteSection;
          break;
        default:
          throw new Error("Invalid id");
      }
    }
  }

  function getCurrentSection() {
    return currentSection;
  }

  function getTaskSection() {
    return currentTaskSection;
  }

  return {
    renderPage,
    changeTaskSection,
    addNewProject,
    getCurrentSection,
    getTaskSection,
    inbox,
    updateAll,
    deleteAll,
  };
})();

//Initial state
App.renderPage("inbox");

