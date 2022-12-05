export function resetModal(element, deep) {
    const newElement = element.cloneNode(deep);
    element.replaceWith(newElement);
    return newElement;
  }

  export function setOverlay(callback) {
    const overlay = document.querySelector(".main-overlay");
    overlay.addEventListener("click", (e) => {
      callback();
      toggleOverlay();
    });
  }
  
  export function toggleOverlay() {
    const overlay = document.querySelector(".main-overlay");
    const isNotThere = overlay.classList.toggle("main-overlay--hidden");
    if (isNotThere) resetModal(overlay);
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
  