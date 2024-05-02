import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useMediaQuery, useTheme, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [openIncomeDialog, setOpenIncomeDialog] = useState(false);
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [incomeSource, setIncomeSource] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeTitle, setIncomeTitle] = useState('');
  const [incomeDetail, setIncomeDetail] = useState('');
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseType, setExpenseType] = useState(''); 
  const [additionalExpenseType, setAdditionalExpenseType] = useState(''); 
  const [incomeDetails, setIncomeDetails] = useState([]);
  const [expenseDetails, setExpenseDetails] = useState([]);
  const [expenseDetail, setExpenseDetail] = useState('');
  const [expenseTypeOptions, setExpenseTypeOptions] = useState(['Utility Bills', 'Shopping', 'Foods']); 
  const [selectedTable, setSelectedTable] = useState('combined');
  const [imageFile, setImageFile] = useState(null);
  const [imageDetail, setImageDetail] = useState('');
  const [paid, setPaid] = useState(false); 
  const [editIndex, setEditIndex] = useState(null);


  const handleAddIncome = () => {
    setOpenIncomeDialog(true);
  };

  const handleAddExpense = () => {
    setOpenExpenseDialog(true);
    setPaid(false);
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

  const handleExpenseDetailChange = (event) => {
    setExpenseDetail(event.target.value);
  };
  
  const handleExpenseTypeChange = (event) => {
    setExpenseType(event.target.value);
    setOpenImageDialog(true); 
  };

  const handleAdditionalExpenseTypeChange = (event) => {
    setAdditionalExpenseType(event.target.value);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setOpenExpenseDialog(true)
    // Populate the form fields with the data of the row to be edited
    const itemToEdit = selectedTable === 'income' ? incomeDetails[index] : expenseDetails[index];
    if (selectedTable === 'income') {
      setIncomeTitle(itemToEdit.title);
      setIncomeSource(itemToEdit.source);
      setIncomeAmount(itemToEdit.amount);
      setIncomeDetail(itemToEdit.detail);
    } else {
      setExpenseTitle(itemToEdit.title);
      setExpenseAmount(itemToEdit.amount);
      setExpenseDetail(itemToEdit.detail);
      setExpenseType(itemToEdit.type);
      setImageDetail(itemToEdit.imageDetail);
      setPaid(itemToEdit.paid);
    }
  };
  

  const handleSaveIncome = () => {
    // If editIndex is not null, update the existing row data
    if (editIndex !== null) {
      const updatedIncomeDetails = [...incomeDetails];
      updatedIncomeDetails[editIndex] = {
        source: incomeSource,
        title: incomeTitle,
        amount: incomeAmount,
        detail: incomeDetail,
        time: new Date().toLocaleString()
      };
      setIncomeDetails(updatedIncomeDetails);
      setEditIndex(null);
    } else {
      // Otherwise, add a new row
      const amount = Number(incomeAmount);
      const currentTime = new Date().toLocaleString();
      setTotalIncome(totalIncome + amount);
      setBalance(balance + amount);
      setIncomeDetails([...incomeDetails, { source: incomeSource, title: incomeTitle, amount: incomeAmount, detail: incomeDetail, time: currentTime }]);
    }
  
    // Reset form fields and dialog state
    setOpenIncomeDialog(false);
    setIncomeSource('');
    setIncomeAmount('');
    setIncomeTitle('');
    setIncomeDetail('');
  };
  

  const handleSaveExpense = () => {
    // If editIndex is not null, update the existing row data
    if (editIndex !== null) {
      const updatedExpenseDetails = [...expenseDetails];
      const amount = Number(expenseAmount);
      const currentTime = new Date().toLocaleString();
      const paidAmount = paid ? amount : 0;
      const prevPaidAmount = updatedExpenseDetails[editIndex].paid ? Number(updatedExpenseDetails[editIndex].amount) : 0;
      setTotalExpense(totalExpense - prevPaidAmount + paidAmount);
      setBalance(balance + prevPaidAmount - paidAmount);
      updatedExpenseDetails[editIndex] = {
        title: expenseTitle,
        amount: expenseAmount,
        detail: expenseDetail,
        type: expenseType,
        image: imageFile,
        imageDetail: imageDetail,
        time: currentTime,
        paid: paid
      };
      setExpenseDetails(updatedExpenseDetails);
      setEditIndex(null);
    } else {
      // Otherwise, add a new row
      const amount = Number(expenseAmount);
      const currentTime = new Date().toLocaleString();
      const paidAmount = paid ? amount : 0;
      setTotalExpense(totalExpense + paidAmount);
      setBalance(balance - paidAmount);
      setExpenseDetails([...expenseDetails, { title: expenseTitle, detail: expenseDetail, amount: expenseAmount, type: expenseType, image: imageFile, imageDetail: imageDetail, time: currentTime, paid: paid }]);
    }
  
    // Reset form fields and dialog state
    setOpenExpenseDialog(false);
    setExpenseTitle('');
    setExpenseAmount('');
    setExpenseType('');
    setImageFile(null);
    setImageDetail('');
    setOpenImageDialog(false);
  };
  

  const handleAddMoreType = () => {
    if (additionalExpenseType.trim() !== '') {
      setExpenseTypeOptions([...expenseTypeOptions, additionalExpenseType]);
      setAdditionalExpenseType('');
    }
  };

  const handleTableSelectChange = (event) => {
    setSelectedTable(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; 
    const maxFileSize = 2 * 1024 * 1024; 

    if (file && allowedTypes.includes(file.type) && file.size <= maxFileSize) {
      setImageFile(file);
    } else {
      alert("Please upload a valid image file (JPEG, PNG, or GIF) with a maximum size of 2MB.");
      event.target.value = null; 
    }
  };

  const handleImageDetailChange = (event) => {
    setImageDetail(event.target.value);
  };

  const handlePaidChange = (event) => {
    setPaid(event.target.checked);
  };

  return (
    <div style={{ margin: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleAddIncome}>Add Income</Button>
        <Button variant="contained" color="secondary" onClick={handleAddExpense} style={{ marginLeft: '10px' }}>Add Expense</Button>
      </div>
      <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between'}}>
        <div style={{textAlign: 'center', width: '40%', marginBottom: isMobile ? '20px' : '0'}}>
          <h2>{balance}</h2>
          <h1>Balance</h1>
        </div>  
        <div style={{textAlign: 'center', width: '50%'}}>
          <h2>{totalExpense}</h2>
          <h1>Total Expense</h1>
        </div>
      </div>

      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <FormControl variant="outlined" style={{ minWidth: '0px' }}>
          <Select
            labelId="table-select-label"
            value={selectedTable}
            onChange={handleTableSelectChange}
            style={{ fontSize: '12px' }} // Adjust the font size here
          >
            <MenuItem style={{ fontSize: '12px' }} value="combined">Combined</MenuItem>
            <MenuItem style={{ fontSize: '12px' }} value="income">Income</MenuItem>
            <MenuItem style={{ fontSize: '12px' }} value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </div>




      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
        {selectedTable === 'combined' && (
          <TableContainer component={Paper} style={{ width: isMobile ? '100%' : '70%', marginBottom: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Payment Status</TableCell>
                  
                  {/* <TableCell>Detail</TableCell> */}
                  <TableCell>Type</TableCell>
                  <TableCell>Date Time</TableCell>
                  {/* <TableCell>Image</TableCell> */}
                  <TableCell>Amount</TableCell>
                  <TableCell>Edit</TableCell>
                   
                </TableRow>
              </TableHead>
              <TableBody>
                {[...incomeDetails, ...expenseDetails].map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.title}</TableCell>
                    <TableCell>{data.source}</TableCell>
                    {/* <TableCell>{data.paid ? 'Paid' : 'Not Paid'}</TableCell>  */}
                    <TableCell>
                      {data.paid ? (
                        <input
                          type="checkbox"
                          checked={true} 
                          // disabled 
                        />
                      ) : (
                        <input
                          type="checkbox"
                          checked={false} 
                          onChange={(e) => handlePaidChange(e, index)}
                        />
                      )}
                    </TableCell>
                    {/* <TableCell>{data.detail}</TableCell> */}
                    <TableCell>{data.type}</TableCell>
                    <TableCell>{data.time}</TableCell>
                    {/* <TableCell>
                      {data.image && (
                        <div>
                          <img src={URL.createObjectURL(data.image)} alt="Expense" style={{ width: '100px' }} />
                          <p>{data.imageDetail}</p>
                        </div>
                      )}
                    </TableCell> */}
                    <TableCell>{data.amount}</TableCell>
                    <TableCell>
                    <IconButton onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {selectedTable === 'income' && (
          <TableContainer component={Paper} style={{ width: isMobile ? '100%' : '70%', marginBottom: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Income Title</TableCell>
                  <TableCell>Source of income</TableCell>
                  <TableCell>Income Amount</TableCell>
                  <TableCell>Income Detail</TableCell>
                  <TableCell>Income Time</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {incomeDetails.map((income, index) => (
                  <TableRow key={index}>
                    <TableCell>{income.title}</TableCell>
                    <TableCell>{income.source}</TableCell>
                    <TableCell>{income.amount}</TableCell>
                    <TableCell>{income.detail}</TableCell>
                    <TableCell>{income.time}</TableCell>
                    <IconButton onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </IconButton>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {selectedTable === 'expense' && (
          <TableContainer component={Paper} style={{ width: isMobile ? '100%' : '70%', marginBottom: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Expense Title</TableCell>
                  <TableCell>Payment Status</TableCell>
                  {/* <TableCell>Expense Detail</TableCell> */}
                  <TableCell>Expense Type</TableCell>
                  <TableCell>Expense Time</TableCell>
                  <TableCell>Expense Amount</TableCell>
                  <TableCell>Edit</TableCell>
                  {/* <TableCell>Image</TableCell> */}
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {expenseDetails.map((expense, index) => (
                  <TableRow key={index}>
                    <TableCell>{expense.title}</TableCell>
                    <TableCell>
                      {expense.paid ? (
                        <input
                          type="checkbox"
                          checked={true} 
                          // disabled 
                        />
                      ) : (
                        <input
                          type="checkbox"
                          checked={false} 
                          onChange={(e) => handlePaidChange(e, index)}
                        />
                      )}
                    </TableCell>
                    {/* <TableCell>{expense.detail}</TableCell> */}
                    <TableCell>{expense.type}</TableCell>
                    <TableCell>{expense.time}</TableCell>
                    {/* <TableCell>
                      {expense.image && (
                        <div>
                          <img src={URL.createObjectURL(expense.image)} alt="Expense" style={{ width: '100px' }} />
                          <p>{expense.imageDetail}</p>
                        </div>
                      )}
                    </TableCell> */}
                    {/* <TableCell>{expense.paid ? 'Paid' : 'Not Paid'}</TableCell> */}
                    <TableCell>{expense.amount}</TableCell>
                    <IconButton onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </IconButton>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

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
          <TextField 
            label="Detail" 
            variant="outlined"
            style={{ marginBottom: '10px' }}
            fullWidth 
            value={expenseDetail}
            onChange={handleExpenseDetailChange}
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
            <Checkbox
              checked={paid}
              onChange={handlePaidChange}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <label htmlFor="paid">Paid</label>
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
      <Dialog open={openImageDialog} onClose={() => setOpenImageDialog(false)}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <input type="file" onChange={handleImageUpload} />
          <TextField 
            label="Image Detail" 
            variant="outlined"
            style={{ marginBottom: '10px' }}
            fullWidth 
            value={imageDetail}
            onChange={handleImageDetailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpenImageDialog(false)} color="primary">
            Cancel
          </Button>
          <Button variant="outlined" onClick={() => { setOpenImageDialog(false); setOpenExpenseDialog(true); }} color="primary">
            Save and Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
  
export default App;
