import { App } from "./App";
import { Navbar } from "./Navbar";
import { NoteSection } from "./NoteSection";
import { TaskSection } from "./TaskSection";
import { FormContainerAdd, FormContainerEditing } from "./FormContainer";
import { FormAdd, FormEdit } from "./Form";
import { Task } from "./Task";
import { Note } from "./Note";
import { Project } from "./Project";

export const Mediator = (() => {
  let formContainer = FormContainerAdd();
  let formContainerEditing = FormContainerEditing();
  let taskID = "";
  let wrapper = Navbar.getSubMenu().getSubContainers("Projects");

  function notify(sender, event) {
    if (sender === Navbar && event === "render") {
      App.changeTaskSection(Navbar.getCurrentId());
      App.renderPage(Navbar.getCurrentId());
    }

    if (sender === Navbar && event === "form") {
      formContainer.open();
    }

    if (sender === FormAdd && event === "submit") {
      formContainer.close();
    }

    if (sender === FormEdit && event === "submit") {
      formContainerEditing.close();
    }

    if (sender === NoteSection && event === "new") {
      let noteData = formContainer.getForm().getFormProps();
      let newNote = Note(noteData);
      NoteSection.addNew(newNote);
      Navbar.setCurrentById("notes");
      App.changeTaskSection("notes");
      App.renderPage("notes");
      App.updateNoteStorage();
    }

    if (sender === NoteSection && event === "delete") {
      App.renderPage("notes");
      App.updateNoteStorage();
    }

    if (sender instanceof TaskSection && event === "new") {
      let taskData = formContainer.getForm().getFormProps();
      let newTask = Task(taskData);
      if (sender.id !== "inbox") {
        App.inbox.addNew(newTask);
      }
      Navbar.setCurrentById(sender.id);
      sender.addNew(newTask);
      App.changeTaskSection(sender.id);
      App.renderPage(sender.id);
      App.updateInboxStorage();
      App.updateProjectStorage();
    }

    if (sender instanceof TaskSection && event === "edit") {
      let newTaskData = formContainerEditing.getForm().getFormProps();
      App.updateAll(taskID, newTaskData);
      App.updateInboxStorage();
      App.updateProjectStorage();
      App.renderPage(sender.id);
    }

    if (sender instanceof TaskSection && event === "render") {
      App.renderPage(sender.id);
    }

    if (sender === Task && event === "edit") {
      taskID = this.id;
      formContainerEditing.openWithValues(this);
    }

    if (sender === Task && event === "done") {
      App.updateAll(this.id, this);
      App.updateInboxStorage();
      App.updateProjectStorage();
      App.renderPage(App.getCurrentSection().id);
    }

    if (sender === Task && event === "delete") {
      App.deleteAll(this.id);
      App.updateProjectStorage();
      App.updateInboxStorage();
      App.renderPage(App.getCurrentSection().id);
    }

    if (sender === Note && event === "delete") {
      NoteSection.deleteNote(this);
    }

    if (sender === Project && event === "new") {
      let { title } = formContainer.getForm().getFormProps();
      let project = new Project(title);
      App.addNewProject(project);
      App.updateProjectStorage();
    }
    if (sender instanceof Project && event === "makelink") {
      wrapper.addChild(sender.link);
    }

    if (sender instanceof TaskSection && event === "delete") {
      App.deleteProject(sender.id);
      App.updateProjectStorage();
      App.updateInboxStorage();
      /*If current page is the project to delete, render inbox*/
      if (sender.id === App.getCurrentSection().id) {
        Navbar.setCurrentById("inbox");
        App.changeTaskSection("inbox");
        App.renderPage("inbox");
      } else {
        App.changeTaskSection(App.getCurrentSection().id);
        App.renderPage(App.getCurrentSection().id);
      }
    }
  }

  return {
    notify,
  };
})();

