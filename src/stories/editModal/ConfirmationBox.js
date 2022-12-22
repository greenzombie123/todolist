export const createConfirmBox = ({
  headingText = "Do you want to delete this folder",
  onClickYes,
  onClickNo,
  chosenText = "Something"
}) => {
  const confirmBox = document.createElement("div");
  confirmBox.className = "confirmBox";

  const heading = document.createElement("h2");
  heading.className = "confirmBox__title";
  heading.textContent = headingText;
  confirmBox.appendChild(heading);

  const chosen = document.createElement("span");
  chosen.classList.add("confirmBox__title")
  chosen.textContent = chosenText;
  confirmBox.appendChild(chosen);

  const yesButton = document.createElement("button");
  yesButton.classList.add("confirmBox__button", "confirmBox__button--yes");
  yesButton.textContent = "Yes";
  yesButton.addEventListener('click', onClickYes)
  confirmBox.appendChild(yesButton);

  const noButton = document.createElement("button");
  noButton.classList.add("confirmBox__button", "confirmBox__button--no");
  noButton.textContent = "No";
  noButton.addEventListener("click", onClickNo)
  confirmBox.appendChild(noButton);

  return confirmBox;
};
