const inputForm = document.querySelector("#input-form");
const inputCategory = document.querySelector("#input-category");
const inputItem = document.querySelector("#input-item");
const inputPrice = document.querySelector("#input-price");
const submitBtn = document.querySelector("#submit-btn");
const sortPriceAscending = document.querySelector("#sort-by-price-ascending");
const sortPriceDescending = document.querySelector("#sort-by-price-descending");
const reloadBtn = document.querySelector("#reload-btn");
const clearAllBtn = document.querySelector("#clear-all-btn");
const filterForm = document.querySelector("#filter-form");
const justUnderInput = document.querySelector("#just-under-input");
const applyFilter = document.querySelector("#apply-filter");

let submittedExpenses = [];
let totalPrice = 0;

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

const outputContainer = document.querySelector("#output-container");

const buildPage = () => {
  outputContainer.innerHTML = "";

  const loadedExpenses = loadedSubmittedExpensesFromStorage();
  console.log(loadedExpenses);
  if (loadedExpenses != null) {
    const [first, ...rest] = loadedExpenses;
    outputFirst(first);
  }
  if (!loadedExpenses) return;
  loadedExpenses.forEach((element) => {
    const eachObjectOutputContainer = document.createElement("div");
    eachObjectOutputContainer.classList.add("each-object-output-container");

    const dateElement = document.createElement("p");
    dateElement.textContent = `Created: ${element.timestamp}`;

    const categoryElement = document.createElement("p");
    categoryElement.textContent = `Category: ${element.categoryname}`;

    const itemElement = document.createElement("p");
    itemElement.textContent = `Item: ${element.itemname}`;

    const priceElement = document.createElement("p");
    priceElement.textContent = `Price: ${element.pricetag}`;

    eachObjectOutputContainer.appendChild(categoryElement);
    eachObjectOutputContainer.appendChild(itemElement);
    eachObjectOutputContainer.appendChild(priceElement);

    // removableContainer.appendChild(eachObjectOutputContainer);
    outputContainer.appendChild(eachObjectOutputContainer);
  });
};

buildPage();

reloadBtn.addEventListener("click", () => {
  buildPage();
});

clearAllBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
  // buildPage();
});

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
    categoryname: userInputCategory,
    itemname: userInputItem,
    pricetag: userInputPrice,
  });
  saveSubmittedExpensesToStorage();
  buildPage();
});

sortPriceAscending.addEventListener("click", () => {
  const myArray = loadedSubmittedExpensesFromStorage();
  myArray.sort((a, b) => a.pricetag - b.pricetag);
  submittedExpenses = myArray;
  saveSubmittedExpensesToStorage();
  buildPage();
});

sortPriceDescending.addEventListener("click", () => {
  const myArray = loadedSubmittedExpensesFromStorage();
  myArray.sort((a, b) => b.pricetag - a.pricetag);
  submittedExpenses = myArray;
  saveSubmittedExpensesToStorage();
  buildPage();
});

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Addeventlistener is running");
  const formData = new FormData(filterForm);
  const filterNum = formData.get("just-under-input");
  console.log(filterNum);
  const myArray = loadedSubmittedExpensesFromStorage();
  console.log("myArray: ", myArray);
  const filteredByNum = myArray.filter((items) => items.pricetag >= filterNum);
  console.log("Filtered by num: ", filteredByNum);
  submittedExpenses = filteredByNum;
  saveSubmittedExpensesToStorage();
  buildPage();
});

function outputFirst(first) {}
