import { format, compareAsc } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export const generateElement = (name, attrs, ...children) => {
  let dom = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    dom.appendChild(child);
  }
  return dom;
};

export function generateId() {
  return uuidv4();
}

export function setCurrentActive(item, propClass) {
  let current = document.querySelector(`.${propClass}`);
  current.classList.remove(propClass);
  if (item.target) {
    item.target.classList.add(propClass);
  } else {
    item.classList.add(propClass);
  }
}

export function capitalize(string) {
  const stringCapitalized = string.charAt(0).toUpperCase() + string.slice(1);
  return stringCapitalized;
}

export function formatDate(date) {
  let newDate = new Date(date);
  return format(newDate, `PP`);
}

export function compareDate(dateA, dateB) {
  let result = compareAsc(new Date(dateA), new Date(dateB));
  return result;
}

export function compareString(stringA, stringB) {
  return stringA.localeCompare(stringB);
}

