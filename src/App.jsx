import "./App.css";
import "./reset.css";
import ArticleList from "./components/ArticleList";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Article from "./components/Article";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/:topic?" element={<ArticleList />} />
        <Route path="/article/:article_id" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
