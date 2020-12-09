import { TodosProvider } from "../contexts/TodoContext";
import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  return (
    <TodosProvider>
      <div className="container mx-auto py-6 max-w-xl">
        <Component {...pageProps} />
      </div>
    </TodosProvider>
  );
}

export default MyApp;
