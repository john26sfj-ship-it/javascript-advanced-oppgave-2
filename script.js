const inputForm = document.querySelector("#input-form");
const inputCategory = document.querySelector("#input-category");
const inputItem = document.querySelector("#input-item");
const inputPrice = document.querySelector("#input-price");
const submitBtn = document.querySelector("#submit-btn");
const sortPriceAscending = document.querySelector("#sort-by-price-ascending");
const sortPriceDescending = document.querySelector("#sort-by-price-descending");
const reloadBtn = document.querySelector("#reload-btn");
const clearAllBtn = document.querySelector("#clear-all-btn");
const topItem = document.querySelector("#top-item");
const filterForm = document.querySelector("#filter-form");
const justUnderInput = document.querySelector("#just-under-input");
const applyFilter = document.querySelector("#apply-filter");

// Arrayet som blir lagret i localStorage.
let submittedExpenses = [];

// Sender til localStorage.
const saveSubmittedExpensesToStorage = () =>
  localStorage.setItem("submittedExpenses", JSON.stringify(submittedExpenses));
// Leser fra localStorage.
const loadedSubmittedExpensesFromStorage = () =>
  JSON.parse(localStorage.getItem("submittedExpenses"));
// Hoved div i html, hvor all html herfra blir lagt.
const outputContainer = document.querySelector("#output-container");

// Hovedfunksjon. Henter, lagrer, og viser alle IKKE-statiske html-elementer.
const buildPage = () => {
  outputContainer.innerHTML = "";

  const loadedExpenses = loadedSubmittedExpensesFromStorage();
  console.log(loadedExpenses);
  if (loadedExpenses != null) {
    // Finner første objekt i arrayet.
    const [first, ...rest] = loadedExpenses;
    outputFirst(first);
  }
  // Stopper videre kode hvis loadedExpenses ikke eksisterer.
  if (!loadedExpenses) return;
  loadedExpenses.forEach((element) => {
    console.log(
      `Price with discount: ${element.itemname}: ${Number(applyDiscount(element.pricetag))}`,
    );
    // Lager <div> hvor timestamp, categoryname, itemname og pricetag blir vist på samme linje.
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

    eachObjectOutputContainer.appendChild(dateElement);
    eachObjectOutputContainer.appendChild(categoryElement);
    eachObjectOutputContainer.appendChild(itemElement);
    eachObjectOutputContainer.appendChild(priceElement);

    outputContainer.appendChild(eachObjectOutputContainer);
  });
  // Sender loadedExpenses til outputTotalPrice for output.
  outputTotalPrice(loadedExpenses);
};

buildPage();

reloadBtn.addEventListener("click", () => {
  buildPage();
});

clearAllBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});

// Inputfeltene for data til nytt objekt.
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
    timestamp: dateOnly,
    categoryname: userInputCategory,
    itemname: userInputItem,
    pricetag: userInputPrice,
  });
  saveSubmittedExpensesToStorage();
  buildPage();
});

// Sorterer etter stigende pris.
sortPriceAscending.addEventListener("click", () => {
  const myArray = loadedSubmittedExpensesFromStorage();
  myArray.sort((a, b) => a.pricetag - b.pricetag);
  submittedExpenses = myArray;
  saveSubmittedExpensesToStorage();
  buildPage();
});
// Sorterer etter fallende pris.
sortPriceDescending.addEventListener("click", () => {
  const myArray = loadedSubmittedExpensesFromStorage();
  myArray.sort((a, b) => b.pricetag - a.pricetag);
  submittedExpenses = myArray;
  saveSubmittedExpensesToStorage();
  buildPage();
});

/*
    Er ment å skulle fjerne alle objekter under en gitt pris, og kun vise de over.
    Kan ikke for mitt bare liv skjønne hvorfor denne
    noen ganger virker fint, men andre ganger ikke
    fjerner object med laveste pricetag...
*/
filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Addeventlistener is running");
  const formData = new FormData(filterForm);
  const filterNum = formData.get("just-under-input");
  const myArray = loadedSubmittedExpensesFromStorage();
  let filteredByNum = myArray.filter((item) => item.pricetag > filterNum);
  console.log("Filtered by num: ", filteredByNum);
  submittedExpenses = filteredByNum;
  saveSubmittedExpensesToStorage();
  buildPage();
});

function outputFirst(first) {
  topItem.textContent = `Item on top is: ${first.itemname}`;
}
// Finner total pris for objektene i localStorage, og viser på page.
function outputTotalPrice(loadedExpenses) {
  const totalPrice = loadedExpenses.reduce((acc, curr) => {
    return acc + +curr.pricetag; // Unary (+) tvinger til nummer!
  }, 0);
  console.log("expected total", totalPrice);
  const totalOutputContainer = document.createElement("div");
  totalOutputContainer.classList.add("total-container");

  const totalElement = document.createElement("p");
  totalElement.textContent = `Total price: ${totalPrice}`;

  // Kun beskjed, tall i console.
  const discountElement = document.createElement("p");
  discountElement.textContent = `Prices for items with discount in console`;

  outputContainer.appendChild(totalElement);
  outputContainer.appendChild(discountElement);
}

function applyDiscount(fullPrice) {
  return fullPrice * 0.75;
}
