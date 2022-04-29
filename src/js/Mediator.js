import { App } from "./App";
import { Navbar } from "./Navbar";
import { NoteSection } from "./NoteSection";
import { TaskSection } from "./TaskSection";
import { FormContainerAdd, FormContainerEditing } from "./FormContainer";
import { FormAdd, FormEdit } from "./Form";
import { Task } from "./Task";
import { Note } from "./Note";

export const Mediator = (() => {
  let formContainer = FormContainerAdd();
  let formContainerEditing = FormContainerEditing();
  let task = "";

  function notify(sender, event) {
    if (sender === Navbar && event === "render") {
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
      App.renderPage("notes");
      Navbar.setCurrentById("notes");
    }

    if (sender === NoteSection && event === "delete") {
      App.renderPage("notes");
      Navbar.setCurrentById("notes");
    }

    if (sender === TaskSection && event === "new") {
      TaskSection.addNew(Task(formContainer.getForm().getFormProps()));
    }

    if (sender === TaskSection && event === "edit") {
      TaskSection.updateTask(
        task,
        formContainerEditing.getForm().getFormProps()
      );
    }

    if (sender === TaskSection && event === "render") {
      App.renderPage("inbox");
      Navbar.setCurrentById("inbox");
    }

    if (sender === Task && event === "edit") {
      task = TaskSection.getTaskById(this._id);
      formContainerEditing.openWithValues(task.taskObj);
    }
    if (sender === Task && event === "done") {
      TaskSection.renderTaskList();
      App.renderPage("inbox");
    }
    if (sender === Task && event === "delete") {
      TaskSection.deleteTask(this);
    }
    if (sender === Note && event === "delete") {
      NoteSection.deleteNote(this);
    }
  }

  return {
    notify,
  };
})();

