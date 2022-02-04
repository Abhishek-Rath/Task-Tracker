import { useState } from 'react';
import Header from './components/Header'
import Navbar from './components/Navbar'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Study Japanese',
      day: 'Jan 29th at 7:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Watch anime',
      day: 'Jan 29th at 8:30pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Write a blog post',
      day: 'Jan 29th at 9:30pm',
      reminder: false,
    }
  ]);

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    // console.log(id);
    const newTask = { id, ...task }
    setTasks([...tasks, newTask]);
  }

  // Delete Task
  const deleteTask = (id) => {
    // console.log('delete', id);
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
