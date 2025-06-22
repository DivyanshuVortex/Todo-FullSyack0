import { useEffect, useState } from "react";

export function Todos() {
  const [todos, setTodos] = useState([]);

  // Fetch all todos from backend
  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todos); // Assuming your backend returns { todos: [...] }
      })
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  // Delete todo
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTodos(todos.filter((todo) => todo._id !== id));
      } else {
        console.error("Failed to delete todo");
      }
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  return (
    <div style={styles.container}>
      {todos.map((todo) => (
        <div key={todo._id} style={styles.card}>
          <h1 style={styles.title}>{todo.title}</h1>
          <h2 style={styles.description}>{todo.description}</h2>
          <button
            onClick={() => {
              if (!todo.completed) handleDelete(todo._id);
            }}
            style={{
              ...styles.button,
              backgroundColor: todo.completed ? "#16a34a" : "#dc2626",
            }}
          >
            {todo.completed ? "Completed" : "Delete it"}
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#1f2937",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    color: "#f9fafb",
    transition: "transform 0.2s",
  },
  title: {
    fontSize: "20px",
    marginBottom: "8px",
  },
  description: {
    fontSize: "16px",
    marginBottom: "12px",
    color: "#d1d5db",
  },
  button: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
};
