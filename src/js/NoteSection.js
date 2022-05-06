import { Mediator } from "./Mediator";
import { generateElement } from "./utils";

export const NoteSection = (() => {
  let element = "";
  let allNotes = [];
  let id = "notes";

  function getAllNotes() {
    return allNotes;
  }

  function addNew(note) {
    allNotes.push(note);
    renderList();
  }

  function renderList() {
    element = generateElement(
      "section",
      { class: "notes" },
      ...allNotes.map((note) => note.getElement())
    );
  }
  function getDOMElement() {
    return element;
  }

  function deleteNote(noteToDelete) {
    console.log(noteToDelete)
    allNotes = allNotes.filter((note) => note.noteObj.id !== noteToDelete.id);
    renderList();
    Mediator.notify(NoteSection, "delete");
  }

  return {
    addNew,
    getDOMElement,
    deleteNote,
    renderList,
    id,
    getAllNotes,
  };
})();
