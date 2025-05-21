// Local Storage Key Constants
const DATA_KEY = "duitly";
const THEME_KEY = "theme";

// Update transaction data in local storage
export const getTransactions = () => {
  const data = localStorage.getItem(DATA_KEY);
  return data ? JSON.parse(data) : [];
};

export const getTransactionById = (id) => {
  const transactions = getTransactions();
  return transactions.find((tx) => String(tx.id) === String(id)) || null;
};

export const setTransactions = (transactions) => {
  localStorage.setItem(DATA_KEY, JSON.stringify(transactions));
};

export const addTransaction = (transaction) => {
  const transactions = getTransactions();
  transactions.push(transaction);
  setTransactions(transactions);
  return transactions;
};

export const removeTransaction = (id) => {
  const transactions = getTransactions();
  const newTransactions = transactions.filter((transaction) => transaction.id !== id);
  setTransactions(newTransactions);
  return newTransactions;
};

export const updateTransaction = (id, updatedTransaction) => {
  const transactions = getTransactions();
  const index = transactions.findIndex((transaction) => String(transaction.id) === String(id));
  if (index !== -1) {
    transactions[index] = { ...transactions[index], ...updatedTransaction };
    setTransactions(transactions);
  }
  return transactions;
};

export const clearTransactions = () => {
  localStorage.removeItem(DATA_KEY);
};

export const exportTransactions = () => {
  const transactions = getTransactions();
  const blob = new Blob([JSON.stringify(transactions)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  // Date format: yyyy-mm-dd-hhmmss
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  const dateStr = `${yyyy}-${mm}-${dd}-${hh}${min}${ss}`;
  a.href = url;
  a.download = `DuitLy-${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const importTransactions = (file) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const transactions = JSON.parse(event.target.result);
    setTransactions(transactions);
  };
  reader.readAsText(file);
};

// Theme management
export const getTheme = () => {
  const theme = localStorage.getItem(THEME_KEY);
  return theme ? JSON.parse(theme) : "light";
};

export const setTheme = (theme) => {
  localStorage.setItem(THEME_KEY, JSON.stringify(theme));
};
