export function resetModal(element, deep) {
  const newElement = element.cloneNode(deep);
  element.replaceWith(newElement);
  return newElement;
}

export function deleteModal(element, deep) {
  const newElement = element.cloneNode(deep);
  const parent = element.parentNode;
  element.replaceWith(newElement);
  parent.removeChild(newElement);
}

export function setOverlay(callback = null) {
  const overlay = document.querySelector(".main-overlay");
  if (!callback) {
    overlay.addEventListener("click", (e) => {
      if (e.target !== overlay) return;
      toggleOverlay();
    });
    return;
  }
  overlay.addEventListener("click", (e) => {
    if (e.target !== overlay) return;
    callback();
    toggleOverlay();
  });
}

export function toggleOverlay() {
  const overlay = document.querySelector(".main-overlay");
  //*If --hidden class is not present, return true
  const isNotThere = overlay.classList.toggle("main-overlay--hidden");
  if (isNotThere) resetModal(overlay, false);
}

export function toggleModal(element, classname) {
  element.classList.toggle(classname + "--hidden");
}

export function attachEventHandler(element, handler, event, data) {
  element.addEventListener(event, (e) => handler(e, data));
}

export function positionModal(ref, pop, x = 0, y = 0) {
  Popper.createPopper(ref, pop, {
    placement: "bottom",
    strategy: "fixed",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [x, y],
        },
      },
    ],
  });
}
