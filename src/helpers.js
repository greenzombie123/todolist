import { transform } from "lodash";

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

//Add className to main overlay to change its CSS properties
export function changeOverlay(className) {
  const overlay = document.querySelector(".main-overlay");
  overlay.classList.toggle(className);
}

export function getOverlay(element = null, isNeeded = false) {
  const overlay = document.querySelector(".main-overlay");
  if (!element) return overlay;
  overlay.appendChild(element);
  if (!isNeeded) return;
  return overlay;
}

export function toggleOverlay() {
  const overlay = document.querySelector(".main-overlay");
  //*If --hidden class is not present, return true
  const isHidden = overlay.classList.toggle("main-overlay--hidden");
  const isCentered = overlay.classList.contains("main-overlay--center");
  if (isHidden && isCentered) changeOverlay("main-overlay--center");
  if (isHidden) resetModal(overlay, false);
}

export function toggleModal(element, classname) {
  element.classList.toggle(classname + "--hidden");
}

export function positionModal(ref, pop, placement = "bottom", x = 0, y = 0) {
  Popper.createPopper(ref, pop, {
    placement: placement,
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

export function transformOverlay({ element, center = true, callback = null}) {
  toggleOverlay();
  getOverlay(element);
  if (center) changeOverlay("main-overlay--center");
  callback ? setOverlay(callback) : setOverlay()
}
