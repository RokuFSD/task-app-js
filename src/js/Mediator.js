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
      NoteSection.addNew(Note(formContainer.getForm().getFormProps()));
      Navbar.setCurrentById("notes");
      App.changeTaskSection("notes");
      App.renderPage("notes");
    }

    if (sender === NoteSection && event === "delete") {
      App.renderPage("notes");
    }

    if (sender instanceof TaskSection && event === "new") {
      let newTask = Task(formContainer.getForm().getFormProps());
      App.changeTaskSection(sender.id);
      if (sender.id !== "inbox") {
        App.inbox.addNew(newTask);
      }
      sender.addNew(newTask);
      App.renderPage(sender.id);
      Navbar.setCurrentById(sender.id);
    }

    if (sender instanceof TaskSection && event === "edit") {
      App.updateAll(taskID, formContainerEditing.getForm().getFormProps());
      App.renderPage(sender.id);
    }

    if (sender instanceof TaskSection && event === "render") {
      App.renderPage(sender.id);
    }

    if (sender === Task && event === "edit") {
      taskID = this._id;
      formContainerEditing.openWithValues(this);
    }

    if (sender === Task && event === "done") {
      App.renderPage(App.getCurrentSection().id);
    }

    if (sender === Task && event === "delete") {
      App.deleteAll(this._id);
      App.renderPage(App.getCurrentSection().id);
    }

    if (sender === Note && event === "delete") {
      NoteSection.deleteNote(this);
    }

    if (sender === Project && event === "new") {
      let { title } = formContainer.getForm().getFormProps();
      let project = new Project(title);
      App.addNewProject(project);
      wrapper.addChild(project.link);
    }

    if (sender instanceof TaskSection && event === "delete") {
      App.deleteProject(sender.id);

      /*If current page is the project to delete, render inbox*/
      if (sender.id === App.getCurrentSection().id) {
        Navbar.setCurrentById("inbox");
        App.changeTaskSection("inbox");
        App.renderPage("inbox");
      } else {
        console.log(App.getCurrentSection().id);
        App.changeTaskSection(App.getCurrentSection().id);
        App.renderPage(App.getCurrentSection().id);
      }
    }
  }

  return {
    notify,
  };
})();

