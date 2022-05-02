import { Mediator } from "./Mediator";
import { generateElement } from "./utils";

export const NoteSection = (() => {
  let element = "";
  let allNotes = [];

  function addNew(note) {
    allNotes.push(note);
    renderList();
  }

  function renderList() {
    element = generateElement(
      "section",
      { class: "notes" },
      ...allNotes.map((note) => note.element)
    );
  }
  function getDOMElement() {
    return element;
  }

  function deleteNote(noteToDelete) {
    allNotes = allNotes.filter((note) => note.noteObj._id !== noteToDelete._id);
    renderList();
    Mediator.notify(NoteSection, "delete");
  }

  return {
    addNew,
    getDOMElement,
    deleteNote,
    renderList
  };
})();

