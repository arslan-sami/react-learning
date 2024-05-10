import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  IconButton, // Import IconButton component
  Menu, // Import Menu component
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings'; // Import settings icon
import EditIcon from '@material-ui/icons/Edit';


import './App.css';

const IncomeTable = ({ data, handleEdit }) => (
  <div className="table-container">
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Source</TableCell>
          <TableCell>Type</TableCell>
          {/* <TableCell>Detail</TableCell> */}

          <TableCell>Date</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Edit</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          row.incomeTitle ? (
            <>
              <TableRow key={index}>
                <TableCell>{row.incomeTitle}</TableCell>
                <TableCell>{row.SourceOfIncome}</TableCell>

                <TableCell>{row.expType}</TableCell>



                {/* <TableCell>{row.detail}</TableCell> */}
                <TableCell className="hover-date">
                  {new Date(row.dateTime).toLocaleDateString()}
                  <span className="hover-time">
                    {new Date(row.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </TableCell>
                <TableCell>{row.IncomeAmount}</TableCell>

                <TableCell>
                  <IconButton onClick={() => handleEdit(index, 'income')} color="primary">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </>
          ) : (<></>)

        ))}
      </TableBody>
    </Table>
  </div>
);


const ExpenseTable = ({ data, handleEdit }) => (
  <div className="table-container">
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Type</TableCell>
          {/* <TableCell>Detail</TableCell> */}
          <TableCell>Date</TableCell>
          {/* <TableCell>Image</TableCell> */}
          <TableCell>Amount</TableCell>
          <TableCell>Edit</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          row.expTitle ? (
            <TableRow key={index}>
              <TableCell>{row.expTitle}</TableCell>
              <TableCell>
                <Checkbox checked={row.status} color="primary" disable />
              </TableCell>
              <TableCell>{row.expType}</TableCell>
              {/* <TableCell>{row.expDetail}</TableCell> */}
              <TableCell className="hover-date">
                {new Date(row.dateTime).toLocaleDateString()}
                <span className="hover-time">
                  {new Date(row.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </TableCell>
              <TableCell>{row.expAmount}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(index, 'expense')} color="primary">
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>) : (<></>)
        ))}
      </TableBody>
    </Table>
  </div>
);

const App = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
  const [totalexpAmount, setTotalexpAmount] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [incomeTitle, setincomeTitle] = useState('');
  const [SourceOfIncome, setSourceOfIncome] = useState('');
  const [IncomeAmount, setIncomeAmount] = useState('');
  const [detail, setDetail] = useState('');
  const [expTitle, setexpTitle] = useState('');
  const [expAmount, setexpAmount] = useState('');
  const [expDetail, setexpDetail] = useState('');
  const [expType, setexpType] = useState('');
  const [status, setstatus] = useState(false);
  const [isIncome, setIsIncome] = useState(false);
  const [isCombined, setIsCombined] = useState(false);
  const [image, setImage] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [nestedAnchorEl, setNestedAnchorEl] = useState(null);

  useEffect(() => {
    let total = 0;
    let num = 0;
    data.forEach((item) => {
      if (!isNaN(parseFloat(item.IncomeAmount)))
        total += parseFloat(item.IncomeAmount);
      if (!isNaN(parseFloat(item.expAmount)))
        num += parseFloat(item.expAmount);
    });
    setTotalIncomeAmount(total - num);
    setTotalexpAmount(num);
  }, [data]);

  const handleSave = () => {
    const newData = {
      incomeTitle,
      SourceOfIncome,
      IncomeAmount: parseFloat(IncomeAmount),
      detail,
      expTitle,
      expAmount: parseFloat(expAmount),
      expDetail,
      expType,
      status,
      image,
      dateTime: new Date().toLocaleString(),
    };
    if (editingIndex !== null) {
      const updatedData = [...data];
      setTotalIncomeAmount(totalIncomeAmount + parseFloat(IncomeAmount) - data[editingIndex].IncomeAmount);
      setTotalexpAmount(totalexpAmount - data[editingIndex].expAmount + parseFloat(expAmount));
      updatedData[editingIndex] = newData;
      setData(updatedData);
      setEditingIndex(null);
    } else {
      setData([...data, newData]);
      setTotalIncomeAmount(totalIncomeAmount + parseFloat(IncomeAmount));
      setTotalexpAmount(totalexpAmount + parseFloat(expAmount));
    }
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setincomeTitle('');
    setSourceOfIncome('');
    setIncomeAmount('');
    setDetail('');
    setexpTitle('');
    setexpAmount('');
    setexpDetail('');
    setexpType('');
    setstatus(false);
    setImage(null);
  };

  const handleEdit = (index, type) => {
    const rowData = data[index];
    setincomeTitle(rowData.incomeTitle || ''); // Set empty string if undefined
    setSourceOfIncome(rowData.SourceOfIncome || ''); // Set empty string if undefined
    setIncomeAmount(rowData.IncomeAmount ? rowData.IncomeAmount.toString() : ''); // Set empty string if undefined
    setDetail(rowData.detail || ''); // Set empty string if undefined
    setexpTitle(rowData.expTitle || ''); // Set empty string if undefined
    setexpAmount(rowData.expAmount ? rowData.expAmount.toString() : ''); // Set empty string if undefined
    setexpDetail(rowData.expDetail || ''); // Set empty string if undefined
    setexpType(rowData.expType || ''); // Set empty string if undefined
    setstatus(rowData.status || false); // Set false if undefined
    setImage(rowData.image || null); // Set null if undefined
    setEditingIndex(index);
    setIsIncome(type === 'income'); // Set isIncome state based on the type parameter
    setOpen(true);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024;
      if (fileSize <= 2) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("File size exceeds 2 MB limit.");
      }
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNestedMenuClose = () => {
    setNestedAnchorEl(null);
  };

  const handleNestedMenuOpen = (event) => {
    setNestedAnchorEl(event.currentTarget);
  };

  return (
    <div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" style={{ margin: '10px 10px' }} onClick={() => { setOpen(true); setIsIncome(false); }}>Add Expense</Button>
        <Button variant="contained" color="secondary" style={{ margin: '10px 10px' }} onClick={() => { setOpen(true); setIsIncome(true); }}>Add Income</Button>

        <IconButton onClick={handleMenuOpen}>
          <SettingsIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleNestedMenuOpen}>View</MenuItem>
        </Menu>


        <Menu
          anchorEl={nestedAnchorEl}
          open={Boolean(nestedAnchorEl)}
          onClose={handleNestedMenuClose}
        >
          <MenuItem onClick={() => { setIsCombined(true); handleNestedMenuClose(); }}>Combined</MenuItem>
          <MenuItem onClick={() => { setIsCombined(false); handleNestedMenuClose(); }}>Separated</MenuItem>
        </Menu>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
        <div style={{ textAlign: 'center', width: '50%' }}>
          <span style={{ fontSize: '80px' }}>{totalIncomeAmount}</span>
          <h1 style={{ fontSize: '22px' }}>Balance</h1>
        </div>
        <div style={{ textAlign: 'center', width: '50%' }}>
          <span style={{ fontSize: '80px' }}>{totalexpAmount}</span>
          <h1 style={{ fontSize: '22px' }}>Total Expense</h1>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingIndex !== null ? 'Edit Data' : (isIncome ? 'Add Income' : 'Add Expense')}</DialogTitle>
        <DialogContent>
          {isIncome ? (
            <>
              <TextField label="Income Title" value={incomeTitle} onChange={(e) => setincomeTitle(e.target.value)} fullWidth variant="outlined" className="input-field" style={{ marginBottom: '10px' }} />
              <TextField label="Source Of Income" value={SourceOfIncome} onChange={(e) => setSourceOfIncome(e.target.value)} fullWidth variant="outlined" className="input-field" style={{ marginBottom: '10px' }} />
              <TextField label="Income Amount" type="number" value={IncomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} fullWidth variant="outlined" className="input-field" style={{ marginBottom: '10px' }} />
              <TextField multiline maxRows={4} label="Detail" value={detail} onChange={(e) => setDetail(e.target.value)} fullWidth variant="outlined" className="input-field" style={{ marginBottom: '10px' }} />
              <Select
                label="Expense Type"
                variant="outlined"
                value={expType}
                onChange={(e) => setexpType(e.target.value)}
                fullWidth
              >
                <MenuItem value="Bill">Bill</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Purchases">Purchases</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </>
          ) : (
            <>
              <TextField label="Expense Title" value={expTitle} onChange={(e) => setexpTitle(e.target.value)} fullWidth variant="outlined" className="input-field" style={{ marginBottom: '10px' }} />
              <TextField label="Expense Amount" type="number" value={expAmount} onChange={(e) => setexpAmount(e.target.value)} fullWidth variant="outlined" className="input-field" style={{ marginBottom: '10px' }} />
              <TextField label="Detail" multiline value={expDetail} onChange={(e) => setexpDetail(e.target.value)} fullWidth variant="outlined" className="input-field" style={{ marginBottom: '10px' }} />
              <Select
                label="Expense Type"
                variant="outlined"
                value={expType}
                onChange={(e) => setexpType(e.target.value)}
                fullWidth
              >
                <MenuItem value="Bill">Bill</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Purchases">Purchases</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              <FormControlLabel
                control={<Checkbox checked={status} onChange={(e) => setstatus(e.target.checked)} />}
                label="Paid"
              />
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {/* {image && <img src={image} alt="Uploaded" style={{ width: '100%', marginTop: '10px' }} />} */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>


      {isCombined ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ minWidth: '800px' }}>
              <div className="table-container">
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Source/Status</TableCell>
                      <TableCell>Type</TableCell>
                      {/* <TableCell>Detail</TableCell> */}
                      <TableCell>Date</TableCell>
                      <TableCell>Amount</TableCell>
                      {/* <TableCell>Expense Detail</TableCell> */}
                      {/* <TableCell>Expense Amount</TableCell> */}
                      <TableCell>Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row, index) => (
                      <TableRow key={index}>
                        {row.incomeTitle ? (<TableCell>{row.incomeTitle}</TableCell>) : (<TableCell>{row.expTitle}</TableCell>)}
                        <TableCell>{row.incomeTitle ? "Income" : "Expense"}</TableCell>
                        {row.incomeTitle ? (<TableCell>{row.SourceOfIncome}</TableCell>) : (<TableCell><Checkbox checked={row.status} color="primary" /></TableCell>)}
                        <TableCell>{row.expType}</TableCell>
                        {/* {detail ? ( <TableCell>{row.detail}</TableCell> ) : (<TableCell>{row.expDetail}</TableCell>) } */}
                        <TableCell className="hover-date">
                          {new Date(row.dateTime).toLocaleDateString()}
                          <span className="hover-time">
                            {new Date(row.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </TableCell>
                        <TableCell>{row.incomeTitle ? row.IncomeAmount : row.expAmount}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(index, row.incomeTitle ? 'income' : 'expense')} color="primary">
                            <EditIcon />
                          </IconButton>
                          {/* <IconButton onClick={() => handleEdit(index, 'expense')} color="primary">
                            <EditIcon />
                          </IconButton> */}

                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

            </div>
          </div>
        </>
      ) : (
        <>
          <div className="table-wrapper">
            <div className="table-container">
              <h2 style={{ textAlign: 'left', marginBottom: '10px' }}>Income</h2>
              <IncomeTable data={data} handleEdit={handleEdit} />
            </div>
            <div className="table-container">
              <h2 style={{ textAlign: 'left', marginBottom: '10px' }}>Expense</h2>
              <ExpenseTable data={data} handleEdit={handleEdit} />
            </div>
          </div>
        </>

      )}
    </div>
  );
};

export default App;
