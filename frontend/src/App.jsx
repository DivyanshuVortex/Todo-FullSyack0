import { useEffect, useState } from "react";
import "./App.css";
import { CreateTodo } from "./compenents/CreateTodo";
import { Todos } from "./compenents/Todos";
function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
     // Define the fetch function
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:3000/todos");
        const json = await res.json();
        setTodos(json.todos);
      } catch (err) {
        console.error("Error fetching todos:", err);
      }
    };

    fetchTodos(); // Call it once immediately

    const interval = setInterval(() => {
      fetchTodos(); // Call it every 500ms
    }, 3200);

    // Cleanup the interval when component unmounts
    return () => clearInterval(interval);
  }, []);
  //Infinite requires is going out
  return (
    <div>
      <CreateTodo />
      <Todos todos={todos} />
    </div>
  );
}

export default App;
