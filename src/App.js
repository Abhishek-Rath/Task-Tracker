import { useState, useEffect } from 'react';
import Header from './components/Header'
import Navbar from './components/Navbar'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    
    getTasks();
  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:8000/tasks');
    const data = await res.json()

    console.log(data);
    return data;
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:8000/tasks`, {
      method: "POST",
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json();

    setTasks([...tasks, data]);
  }

  // Delete Task
  const deleteTask = async (id) => { 
    await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'DELETE'
    })
    
    setTasks(tasks.filter((task) => task.id !== id ))
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <div className="App">
    <Navbar />
      <div className="container">
      <Header />
      <AddTask onAdd={ addTask }/>
      { tasks.length > 0 ? (
        <Tasks tasks={ tasks } onDelete={ deleteTask } onToggle = { toggleReminder }
        />
      ) : (
        'No Tasks to Show'
      )}
    </div>
    </div>
  );
}

export default App;
