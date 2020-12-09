import { createContext, useState } from "react";

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const refreshTodos = async () => {
    try {
      const res = await fetch("/api/getTodos");
      const latestTodos = await res.json();
      setTodos(latestTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async (description) => {
    try {
      const res = await fetch("/api/createTodo", {
        method: "POST",
        body: JSON.stringify({ description }),
        headers: { "Content-Type": "application/json" },
      });
      const newTodo = await res.json();
      setTodos((prevTodos) => {
        return [newTodo, ...prevTodos];
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (updateTodo) => {
    try {
      const res = await fetch("/api/updateTodo", {
        method: "PUT",
        body: JSON.stringify(updateTodo),
        headers: { "Content-Type": "application/json" },
      });
      await res.json();
      setTodos((prevTodos) => {
        const existingTodos = [...prevTodos];
        const existingTodo = existingTodos.find(
          (todo) => todo.id === updateTodo.id
        );
        existingTodo.fields = updateTodo.fields;
        return existingTodos;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const res = await fetch("/api/deleteTodo", {
        method: "Delete",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });

      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TodosContext.Provider
      value={{ todos, setTodos, refreshTodos, addTodo, updateTodo, deleteTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };
