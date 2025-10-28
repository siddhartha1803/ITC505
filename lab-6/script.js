// Array to hold expense data
let expenses = [];

document.getElementById("expenseForm").addEventListener("submit", e => {
  e.preventDefault(); // Prevent form refresh
  const item = document.getElementById("item").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);

  if (!item || isNaN(amount) || amount <= 0) {
    alert("Enter a valid item name and amount!");
    return;
  }

  expenses.push({ item, amount });
  updateExpenseList();
  e.target.reset();
});

// Display expenses dynamically
function updateExpenseList() {
  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  expenses.forEach((exp, i) => {
    const div = document.createElement("div");
    div.className = "expense-item";
    div.innerHTML = `
      <span>${i + 1}. ${exp.item}</span>
      <span>$${exp.amount.toFixed(2)}</span>`;
    list.appendChild(div);
  });

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  document.getElementById("summary").textContent =
    expenses.length === 0
      ? ""
      : `Total Expenses: $${total.toFixed(2)} | Average: $${(total / expenses.length).toFixed(2)}`;
}

// Reset all data
function resetExpenses() {
  if (confirm("Clear all expenses?")) {
    expenses = [];
    updateExpenseList();
  }
}

// Footer date
document.getElementById("lastModified").textContent = document.lastModified;
