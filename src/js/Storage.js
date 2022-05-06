export const Storage = (() => {
  function saveItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getItem(key) {
    let value = localStorage.getItem(key);
    return JSON.parse(value);
  }
  return {
    saveItem,
    getItem,
  };
})();

