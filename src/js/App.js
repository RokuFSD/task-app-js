import { generateElement, capitalize } from "./utils";
import { Project } from "./Project";
import { TaskSection } from "./TaskSection";
import { NoteSection } from "./NoteSection";
import { Storage } from "./Storage";
import { Note } from "./Note";
import { Task } from "./Task";

export const App = (() => {
  let header = document.querySelector(".app__header");
  let body = document.querySelector(".app__body");
  let headerTitle = "";
  let bodyContent = "";
  let currentPage = "";
  let inbox = new TaskSection("inbox");
  let projects = [];
  let notes = [];
  let currentTaskSection = inbox;
  let currentSection = inbox;

  function createHeader() {
    headerTitle = generateElement("h1", { class: "header__title" });
    headerTitle.textContent = capitalize(currentPage);
  }

  function updateNoteStorage() {
    Storage.saveItem("notes", NoteSection.getAllNotes());
  }

  function updateProjectStorage() {
    Storage.saveItem("projects", projects);
  }

  function updateInboxStorage() {
    Storage.saveItem("inbox", inbox.getAllTasks());
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
      console.log(project)
      project.updateTask(id, props);
    });
  }

  function deleteProject(projectId) {
    let deletedProjectTasks = projects
      .find((project) => project.id === projectId)
      .getAllTasks();
    deletedProjectTasks.forEach((task) => inbox.deleteTask(task.taskObj.id));
    projects = projects.filter((project) => project.id !== projectId);
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

  function initialState() {
    let inboxTasks = Storage.getItem("inbox");
    let savedProjects = Storage.getItem("projects") || [];
    notes = Storage.getItem("notes");
    if (savedProjects && savedProjects.length > 0) {
      savedProjects.forEach((project) => {
        let newProject = new Project(project.id);
        if (project.allTasks.length > 0) {
          project.allTasks.forEach((task) => {
            let newTask = Task(task.taskObj);
            newProject.addNew(newTask);
          });
        }
        addNewProject(newProject);
      });
    }
    if (inboxTasks && inboxTasks.length > 0) {
      inboxTasks.forEach((task) => {
        let newTask = Task(task.taskObj);
        inbox.addNew(newTask);
      });
    }
    if (notes && notes.length > 0) {
      notes.forEach((note) => {
        let newNote = Note(note.noteObj);
        NoteSection.addNew(newNote);
      });
    }
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
    deleteProject,
    initialState,
    updateNoteStorage,
    updateProjectStorage,
    updateInboxStorage,
  };
})();

//Initial state
App.initialState();
App.renderPage("inbox");

