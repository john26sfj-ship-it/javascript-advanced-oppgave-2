const inputForm = document.querySelector("#input-form");
const inputCategory = document.querySelector("#input-category");
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

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(inputForm);
  const userInputCategory = formData.get("input-category");
  const userInputItem = formData.get("input-item");
  const userInputPrice = formData.get("input-price");

  inputCategory.value = "";
  inputItem.value = "";
  inputPrice.value = 0;

  submittedExpenses.push({
    timestamp: new Date(),
    categoryName: userInputCategory,
    itemname: userInputItem,
    pricetag: userInputPrice,
  });
  console.log(submittedExpenses);
});
