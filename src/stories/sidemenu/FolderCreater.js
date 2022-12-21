export const createFolderCreater = ({ createFolder, name = null, color = null}) => {
  const createModal = document.createElement("div");
  createModal.className = "createmodal";

  const string = `<form action="" class="createmodal__form">
      <label for="create" class="createmodal__namelabel">Name</label>
      <input
        type="text"
        name="create"
        id="create"
        class="createmodal__nameinput"
      />
      <span class="createmodal__colorlabel">Colors</span>
      <div class="createmodal__colorbox">
        <div
          class="createmodal__color-item createmodal__color-item--red"
          data-color="red"
        ></div>
        <div
          class="createmodal__color-item createmodal__color-item--yellow"
          data-color="yellow"
        ></div>
        <div
          class="createmodal__color-item createmodal__color-item--blue"
          data-color="blue"
        ></div>
        <div
          class="createmodal__color-item createmodal__color-item--purple"
          data-color="purple"
        ></div>
        <div
          class="createmodal__color-item createmodal__color-item--green"
          data-color="green"
        ></div>
        <div
          class="createmodal__color-item createmodal__color-item--black"
          data-color="black"
        ></div>
        <div
          class="createmodal__color-item createmodal__color-item--orange"
          data-color="orange"
        ></div>
        <div
          class="createmodal__color-item createmodal__color-item--pink"
          data-color="pink"
        ></div>
      </div>
      <button type="button" class="createmodal__button">Ok</button>
    </form>`;

  createModal.insertAdjacentHTML("afterbegin", string);
  createModal.addEventListener("click", (e) => pickColor(e, createModal));

  const nameInput = createModal.querySelector('.createmodal__nameinput');
  nameInput.value = name || ""

  if(color){
    const colorItems = createModal.querySelectorAll("div[data-color]");
    colorItems.forEach(colorItem =>{
      if(colorItem.dataset.color === color){
          colorItem.classList.add("createmodal__color-item--chosen");
          return;
      }
    });
  }

  const pickColor = (e, createModal) => {
    const colorItems = createModal.querySelectorAll("div[data-color]");
    colorItems.forEach((ci) => {
      if (e.target === ci) {
        colorItems.forEach((colorItem) =>
          colorItem.classList.remove("createmodal__color-item--chosen")
        );
        e.target.classList.add("createmodal__color-item--chosen");
        return;
      }
    });
  };

  //   const nameInput = createModal.querySelector('.createmodal__nameinput')
  const button = createModal.querySelector(".createmodal__button");
  button.addEventListener("click", createFolder);

  return createModal;
};
