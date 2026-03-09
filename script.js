

// get elements
const amount = document.getElementById("amount");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const balance = document.getElementById("balance");
const add = document.getElementById("add");
const incomeRadio = document.getElementById("income-radio");
const expenseRadio = document.getElementById("expense-radio");
const transactionList = document.getElementById("transactionList");
const description = document.getElementById("description");

const allRadioBtn = document.getElementById("all-radio-btn");
const incomeRadioBtn = document.getElementById("income-radio-btn");
const expenseRadioBtn = document.getElementById("expense-radio-btn");

// get data from localStorage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// save function
function saveToLocalStorage(){
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// add transaction
add.addEventListener("click", () => {

  let value = Number(amount.value);
  let type = incomeRadio.checked ? "income" : "expense";

  transactions.push({
    desc: description.value,
    amount: value,
    type: type
  });

  saveToLocalStorage();
  updateSummary();
  showTransaction();

  amount.value = "";
  description.value = "";
});

// show transactions
const showTransaction = () => {

  transactionList.innerHTML = "";
 
  let filtered = transactions;

  if (incomeRadioBtn.checked) {
    filtered = transactions.filter(t => t.type === "income");
  }

  else if (expenseRadioBtn.checked) {
    filtered = transactions.filter(t => t.type === "expense");
  }

  filtered.forEach((t, index) => {

    transactionList.innerHTML += `
    <div class="flex justify-between px-3 m-2 my-1 bg-white rounded-lg"> 
      <span>${t.desc} - ${t.amount}</span>  
      <span class="flex gap-5 p-2"> 
        <i onclick="editTransaction(${index})" class="fa-solid fa-pen-to-square cursor-pointer"></i>
        <i onclick="deleteTransaction(${index})" class="fa-solid fa-trash cursor-pointer"></i>
      </span> 
    </div>
    `;
  });
};

// update income expense balance
function updateSummary(){

  let incomeTotal = 0;
  let expenseTotal = 0;

  transactions.forEach(t => {

    if(t.type === "income"){
      incomeTotal += t.amount;
    }
    else{
      expenseTotal += t.amount;
    }

  });

  income.innerText = incomeTotal;
  expense.innerText = expenseTotal;
  balance.innerText = incomeTotal - expenseTotal;
}

// delete
function deleteTransaction(index){

  transactions.splice(index,1);

  saveToLocalStorage();
  updateSummary();
  showTransaction();

}

// edit
function editTransaction(index){

  let t = transactions[index];

  description.value = t.desc;
  amount.value = t.amount;

  if(t.type === "income"){
    incomeRadio.checked = true;
  }else{
    expenseRadio.checked = true;
  }

  transactions.splice(index,1);

  saveToLocalStorage();
  updateSummary();
  showTransaction();

}

// filter
allRadioBtn.addEventListener("change", showTransaction);
incomeRadioBtn.addEventListener("change", showTransaction);
expenseRadioBtn.addEventListener("change", showTransaction);

// page load
updateSummary();
showTransaction();