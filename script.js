const inputForm = document.querySelector("#input-form");
const inputItem = document.querySelector("#input-item");
const inputPrice = document.querySelector("#input-price");
const submitBtn = document.querySelector("#submit-btn");

let submittedExpenses = [];

/*
    Take input.
    Take all three inputs, and create a <div> with each of them as a <p> beside each other, inside output-container. 
    Push to submittedExpenses.
    Store submittedExpenses in loaclStorage.
*/

// Popup error-message if input is empty on submit. Må innrømme at denne er bare lånt.
const errorModal = (message) => {
  const modal = document.createElement("dialog");
  modal.classList.add("modal");

  const errorElement = document.createElement("p");
  errorElement.textContent = message;

  const closeModalBtn = document.createElement("button");
  closeModalBtn.textContent = "Ok";

  modal.append(errorElement, closeModalBtn);
  document.body.append(modal);

  modal.showModal();
  modal.addEventListener("click", () => {
    modal.remove();
  });
};

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(inputForm);
  const userInputItem = formData.get("input-item");
  const userInputPrice = formData.get("input-price");
  inputItem.value = "";
  inputPrice.value = "";
  //   if (!userInputItem) {
  //     return errorModal("Item field can´t be empty!");
  //   }
  submittedExpenses.push({
    timestamp: new Date(),
    itemname: userInputItem,
    pricetag: userInputPrice,
  });
  console.log(submittedExpenses);
});
