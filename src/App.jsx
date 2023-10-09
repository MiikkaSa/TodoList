import  { useState, useRef } from 'react';
import Header from './components/Header';
import Container from '@mui/system/Container';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import  dayjs  from 'dayjs';



function App() {
  const [todo, setTodo] = useState({
    description: '',
    date: '',
    priority: ''
  }); 
  const [todos, setTodos] = useState([]); 
const gridRef = useRef();

  const [columnDefs] = useState([
    {field: 'description', sortable: true, filter: true},
    {field: 'priority', sortable: true, filter: true,
   cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}},
    {field: 'date', sortable: true, filter: true
    } 
  ]);
  const addTodo = () => {
    const formattedDate = dayjs(todo.date).format('MM/DD/YYYY');
    setTodos([...todos, {...todo, date: formattedDate}]);
    setTodo({description: '', date: '', priority: ''});
  }



  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
    const row = (gridRef.current.getSelectedNodes()[0].id);
    setTodos(todos.filter((item, index) => row != index));
    }
    else {
      alert('Select at least one row');
    }
  }

  return (
    <Container>
      <Header/>
        <Stack direction="row" 
        spacing={2} 
        alignItems="center" 
        justifyContent="center"
        mt={2}>
        <TextField 
          label='Description'
          value={todo.description}
          onChange={e => setTodo({...todo, description: e.target.value})} 
        />

  <TextField 
          label='Priority'
          value={todo.priority}
          onChange={e => setTodo({...todo, priority: e.target.value})} 
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
           label='Date'
           format='DD.MM.YYYY'
           value={todo.date}
           onChange={(date) => setTodo({...todo, date})}
        />
        </LocalizationProvider>

        <Button variant="contained" onClick={addTodo}> Add Todo </Button>
        <Button variant="contained" color="error" onClick={deleteTodo}>Delete</Button>
        </Stack>
 <Stack alignItems="center"
 justifyContent="center">
      <div className='ag-theme-material' style={{width: 600, height: 500}}>
       <AgGridReact
       ref={gridRef}
       onGridReady={params => gridRef.current = params.api}
       rowSelection='single'
        columnDefs={columnDefs}
        rowData={todos}
       />

      </div>
      </Stack>
    </Container>
  );
}

export default App;

