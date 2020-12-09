import Head from "next/head";
import { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";
import { TodosContext } from "../contexts/TodoContext";
import { minifyRecords, table } from "../pages/api/utils/Airtable";

export default function Home({ initialTodos }) {
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  return (
    <div>
      <Head>
        <title>Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <h1>Todo App</h1>
        <ul>
          {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
        </ul>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const todos = await table.select({}).firstPage();
    return {
      props: {
        initialTodos: minifyRecords(todos),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        err: "something went wrong",
      },
    };
  }
}
