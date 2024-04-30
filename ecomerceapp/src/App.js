import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel, Grid } from '@material-ui/core';

function App() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [openIncomeDialog, setOpenIncomeDialog] = useState(false);
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);
  const [incomeSource, setIncomeSource] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeTitle, setIncomeTitle] = useState('');
  const [incomeDetail, setIncomeDetail] = useState('');
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseType, setExpenseType] = useState(''); 
  const [additionalExpenseType, setAdditionalExpenseType] = useState(''); 
  const [showDetails, setShowDetails] = useState(false);
  const [incomeDetails, setIncomeDetails] = useState([]);
  const [expenseDetails, setExpenseDetails] = useState([]);
  const [expenseTypeOptions, setExpenseTypeOptions] = useState(['Utility Bills', 'Shopping', 'Foods']); 

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

  const handleIncomeTitleChange = (event) => {
    setIncomeTitle(event.target.value);
  };

  const handleIncomeDetailChange = (event) => {
    setIncomeDetail(event.target.value);
  };

  const handleExpenseTitleChange = (event) => {
    setExpenseTitle(event.target.value);
  };

  const handleExpenseAmountChange = (event) => {
    setExpenseAmount(event.target.value);
  };

  const handleExpenseTypeChange = (event) => {
    setExpenseType(event.target.value);
  };

  const handleAdditionalExpenseTypeChange = (event) => {
    setAdditionalExpenseType(event.target.value);
  };

  const handleSaveIncome = () => {
    const amount = Number(incomeAmount);
    const currentTime = new Date().toLocaleString();
    setTotalIncome(totalIncome + amount);
    setBalance(balance + amount);
    setIncomeDetails([...incomeDetails, { source: incomeSource, title: incomeTitle, amount: incomeAmount, detail: incomeDetail, time: currentTime }]);
    setOpenIncomeDialog(false);
    setIncomeSource('');
    setIncomeAmount('');
    setIncomeTitle('');
    setIncomeDetail('');
  };

  const handleSaveExpense = () => {
    const amount = Number(expenseAmount);
    const currentTime = new Date().toLocaleString();
    setTotalExpense(totalExpense + amount);
    setBalance(balance - amount);
    setExpenseDetails([...expenseDetails, { title: expenseTitle, amount: expenseAmount, type: expenseType, time: currentTime }]);
    setOpenExpenseDialog(false);
    setExpenseTitle('');
    setExpenseAmount('');
    setExpenseType('');
  };

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  const handleAddMoreType = () => {
    if (additionalExpenseType.trim() !== '') {
      setExpenseTypeOptions([...expenseTypeOptions, additionalExpenseType]);
      setAdditionalExpenseType('');
    }
  };
  
  
  return (
    <div style={{ margin: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleAddIncome}>Add Income</Button>
        <Button variant="contained" color="secondary" onClick={handleAddExpense} style={{ marginLeft: '10px' }}>Add Expense</Button>
      </div>
      <h1>Balance: {balance}</h1>
      <h2>Total Expense: {totalExpense}</h2>
      <Button variant="contained" color="default" onClick={handleShowDetails}>Show Details</Button>
      <Dialog open={openIncomeDialog} onClose={() => setOpenIncomeDialog(false)}>
        <DialogTitle>Add Income</DialogTitle>
        <DialogContent>
          <TextField 
            label="Income Title" 
            variant="outlined"
            style={{ marginBottom: '10px' }}
            fullWidth 
            value={incomeTitle}
            onChange={handleIncomeTitleChange}
          />
          <TextField 
            label="Source of Income" 
            variant="outlined" 
            style={{ marginBottom: '10px' }}
            fullWidth 
            value={incomeSource}
            onChange={handleIncomeSourceChange}
          />
          <TextField 
            label="Amount" 
            variant="outlined"
            style={{ marginBottom: '10px' }}
            type="number" 
            fullWidth 
            value={incomeAmount}
            onChange={handleIncomeAmountChange}
          />
          <TextField 
            label="Income Detail" 
            variant="outlined"
            style={{ marginBottom: '10px' }}
            multiline 
            rows={4}
            fullWidth 
            value={incomeDetail}
            onChange={handleIncomeDetailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpenIncomeDialog(false)} color="primary">
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleSaveIncome} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openExpenseDialog} onClose={() => setOpenExpenseDialog(false)}>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <TextField 
            label="Expense Title" 
            variant="outlined"
            style={{ marginBottom: '10px' }}
            fullWidth 
            value={expenseTitle}
            onChange={handleExpenseTitleChange}
          />
          <TextField 
            label="Amount" 
            variant="outlined"
            style={{ marginBottom: '10px' }}
            type="number" 
            fullWidth 
            value={expenseAmount}
            onChange={handleExpenseAmountChange}
          />
          <FormControl>
            <InputLabel id="expense-type-label">Expense Type</InputLabel>
            <Select
              labelId="expense-type-label"
              variant="outlined"
              value={expenseType}
              onChange={handleExpenseTypeChange}
              style={{ minWidth: 200 }}
            >
              {expenseTypeOptions.map((option, index) => (
                <MenuItem key={index} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField 
            label="Add More Type" 
            variant="outlined"
            style={{ marginLeft: '10px', marginRight: '10px' }}
            value={additionalExpenseType}
            onChange={handleAdditionalExpenseTypeChange}
          />
          <Button variant="outlined" color="primary" onClick={handleAddMoreType} style={{ marginTop: '10px', alignSelf: 'center' }}>Add</Button>
          <Grid container  alignItems="center">
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpenExpenseDialog(false)} color="primary">
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleSaveExpense} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showDetails} onClose={handleCloseDetails}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          <h3>Income Details</h3>
          {incomeDetails.map((income, index) => (
            <div key={index}>
              <p>Title: {income.title}</p>
              <p>Source: {income.source}</p>
              <p>Amount: {income.amount}</p>
              <p>Detail: {income.detail}</p>
              <p>Time: {income.time}</p>
              <hr />
            </div>
          ))}
          <h3>Expense Details</h3>
          {expenseDetails.map((expense, index) => (
            <div key={index}>
              <p>Title: {expense.title}</p>
              <p>Amount: {expense.amount}</p>
              <p>Expense Type: {expense.type}</p>
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
