import { useState} from "react"
import "./App.css";
import { CreateTodo } from "./compenents/CreateTodo";
import { Todos } from "./compenents/Todos";
function App() {
  const [todos, setTodos] = useState([]);

  fetch("http://localhost:3000/todos")
    .then(async function(res) {
      const json = await res.json();
      setTodos(json.todos);//this run again the app function 
    });
//Infinite requires is going out
  return (
    <div>
      <CreateTodo />
      <Todos todos={todos} />
    </div>
  );
}


export default App;