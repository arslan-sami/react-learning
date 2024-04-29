import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

function App() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [openIncomeDialog, setOpenIncomeDialog] = useState(false);
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);
  const [incomeSource, setIncomeSource] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expensePerson, setExpensePerson] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [incomeDetails, setIncomeDetails] = useState([]);
  const [expenseDetails, setExpenseDetails] = useState([]);

  const handleAddIncome = () => {
    setOpenIncomeDialog(true);
  };

  const handleAddExpense = () => {
    setOpenExpenseDialog(true);
  };

  const handleIncomeSourceChange = (event) => {
    setIncomeSource(event.target.value);
  };

  const handleIncomeAmountChange = (event) => {
    setIncomeAmount(event.target.value);
  };

  const handleExpenseTitleChange = (event) => {
    setExpenseTitle(event.target.value);
  };

  const handleExpenseAmountChange = (event) => {
    setExpenseAmount(event.target.value);
  };

  const handleExpensePersonChange = (event) => {
    setExpensePerson(event.target.value);
  };

  const handleSaveIncome = () => {
    const amount = Number(incomeAmount);
    const currentTime = new Date().toLocaleString();
    setTotalIncome(totalIncome + amount);
    setBalance(balance + amount);
    setIncomeDetails([...incomeDetails, { source: incomeSource, amount: incomeAmount, time: currentTime }]);
    setOpenIncomeDialog(false);
    setIncomeSource('');
    setIncomeAmount('');
  };

  const handleSaveExpense = () => {
    const amount = Number(expenseAmount);
    const currentTime = new Date().toLocaleString();
    setTotalExpense(totalExpense + amount);
    setBalance(balance - amount);
    setExpenseDetails([...expenseDetails, { title: expenseTitle, amount: expenseAmount, person: expensePerson, time: currentTime }]);
    setOpenExpenseDialog(false);
    setExpenseTitle('');
    setExpenseAmount('');
    setExpensePerson('');
  };

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <div style={{ margin: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleAddIncome}>Add Income</Button>
        <Button variant="contained" color="secondary" onClick={handleAddExpense} style={{ marginLeft: '10px' }}>Add Expense</Button>
      </div>
      <h1>Balance: {balance}</h1>
      <Button variant="contained" color="default" onClick={handleShowDetails}>Show Details</Button>

      {/* Income Dialog */}
      <Dialog open={openIncomeDialog} onClose={() => setOpenIncomeDialog(false)}>
        <DialogTitle>Add Income</DialogTitle>
        <DialogContent>
          <TextField 
            label="Source of Income" 
            fullWidth 
            value={incomeSource}
            onChange={handleIncomeSourceChange}
          />
          <TextField 
            label="Amount" 
            type="number" 
            fullWidth 
            value={incomeAmount}
            onChange={handleIncomeAmountChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenIncomeDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveIncome} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Expense Dialog */}
      <Dialog open={openExpenseDialog} onClose={() => setOpenExpenseDialog(false)}>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <TextField 
            label="Expense Title" 
            fullWidth 
            value={expenseTitle}
            onChange={handleExpenseTitleChange}
          />
          <TextField 
            label="Amount" 
            type="number" 
            fullWidth 
            value={expenseAmount}
            onChange={handleExpenseAmountChange}
          />
          <TextField 
            label="Person" 
            fullWidth 
            value={expensePerson}
            onChange={handleExpensePersonChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExpenseDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveExpense} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={showDetails} onClose={handleCloseDetails}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          <h3>Income Details</h3>
          {incomeDetails.map((income, index) => (
            <div key={index}>
              <p>Source: {income.source}</p>
              <p>Amount: {income.amount}</p>
              <p>Time: {income.time}</p>
              <hr />
            </div>
          ))}
          <h3>Expense Details</h3>
          {expenseDetails.map((expense, index) => (
            <div key={index}>
              <p>Title: {expense.title}</p>
              <p>Amount: {expense.amount}</p>
              <p>Person: {expense.person}</p>
              <p>Time: {expense.time}</p>
              <hr />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
