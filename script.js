const inputForm = document.querySelector("#input-form");
const inputCategory = document.querySelector("#input-category");
const inputItem = document.querySelector("#input-item");
const inputPrice = document.querySelector("#input-price");
const submitBtn = document.querySelector("#submit-btn");
const clearAllBtn = document.querySelector("#clear-all-btn");

let submittedExpenses = [];

/*
    Take input.
    Take all three inputs, and create a <div> with each of them as a <p> beside each other, inside output-container. 
    Push to submittedExpenses.
    Store submittedExpenses in loaclStorage.
*/
const saveSubmittedExpensesToStorage = () =>
  localStorage.setItem("submittedExpenses", JSON.stringify(submittedExpenses));
const loadedSubmittedExpensesFromStorage = () =>
  JSON.parse(localStorage.getItem("submittedExpenses"));

// const buildPage = () => {
//   const loadedExpenses = loadedSubmittedExpensesFromStorage();
//   loadedExpenses.forEach((element) => {
//     // your code logic here

//     const eachObjectOutpuContainer = document.createElement("div");
//     eachObjectOutpuContainer.classList.add("each-object-output-container");

//     const eachObjectTimeStamp = document.createElement("p");
//     eachObjectTimeStamp.classList.add("each-object-time-stamp");
//     eachObjectTimeStamp.textContent = element.timestamp.toLocaleString("en-UK");

//     const eachObjectCategory = document.createElement("p");
//     eachObjectCategory.classList.add("eachObjCategory");
//     eachObjectCategory.textContent = element.eachObjCategory;

//     const eachObjectItem = document.createElement("p");
//     eachObjectItem.classList.add("each-object-item");

//     const eachObjectPriceTag = document.createElement("p");
//     eachObjectPriceTag.classList.add("each-object-price-tag");
//   });
// };

const outputContainer = document.querySelector("#output-container");

const buildPage = () => {
  const loadedExpenses = loadedSubmittedExpensesFromStorage();
  loadedExpenses.forEach((element) => {
    const eachObjectOutputContainer = document.createElement("div");
    eachObjectOutputContainer.classList.add("each-object-output-container");

    const categoryElement = document.createElement("p");
    categoryElement.textContent = `Category: ${element.categoryName}`;

    const itemElement = document.createElement("p");
    itemElement.textContent = `Item: ${element.itemName}`;

    const priceElement = document.createElement("p");
    priceElement.textContent = `Price: ${element.priceTag}`;

    eachObjectOutputContainer.appendChild(categoryElement);
    eachObjectOutputContainer.appendChild(itemElement);
    eachObjectOutputContainer.appendChild(priceElement);

    outputContainer.appendChild(eachObjectOutputContainer);
  });
};

buildPage();

clearAllBtn.addEventListener("click", () => localStorage.clear());

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(inputForm);
  const userInputCategory = formData.get("input-category");
  const userInputItem = formData.get("input-item");
  const userInputPrice = formData.get("input-price");

  inputCategory.value = "";
  inputItem.value = "";
  inputPrice.value = 0;

  const today = new Date();
  const dateOnly = today.toISOString().split("T")[0];

  submittedExpenses.push({
    timestamp: dateOnly,
    categoryName: userInputCategory,
    itemname: userInputItem,
    pricetag: userInputPrice,
  });
  saveSubmittedExpensesToStorage();
  buildPage();
});
