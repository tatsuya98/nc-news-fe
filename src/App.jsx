import "./App.css";
import "./reset.css";
import ArticleList from "./components/ArticleList";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Article from "./components/Article";
import { ErrorProvider } from "./context/ErrorContext";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/:topic?" element={<ArticleList />} />
        <Route
          path="/article/:article_id"
          element={
            <ErrorProvider>
              <Article />
            </ErrorProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
