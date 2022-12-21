export const createConfirmBox = ({
  headingText = "Do you want to delete this folder",
}) => {
  const confirmBox = document.createElement("div");
  confirmBox.className = "confirmBox";

  const heading = document.createElement("h2");
  heading.className = "confirmBox__title";
  heading.textContent = headingText;
  confirmBox.appendChild(heading);

  const yesButton = document.createElement("button");
  yesButton.classList.add("confirmBox__button", "confirmBox__button--yes");
  yesButton.textContent = "Yes";
  confirmBox.appendChild(yesButton);

  const noButton = document.createElement("button");
  noButton.classList.add("confirmBox__button", "confirmBox__button--no");
  noButton.textContent = "No";
  confirmBox.appendChild(noButton);

  return confirmBox;
};
