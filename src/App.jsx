import "./App.css";
import "./reset.css";
import ArticleList from "./components/ArticleList";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Article from "./components/Article";
import NotFound from "./components/NotFound";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/articles/:fake"
          element={<Navigate to="/error" replace />}
        />
        <Route path="/error" element={<NotFound />} />
        <Route path="/articles/:topic?" element={<ArticleList />} />
        <Route path="/articles/article/:article_id" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
