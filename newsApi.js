import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://be-nc-news-project-0i36.onrender.com/api",
});

export const fetchArticles = () => {
  return newsApi.get("/articles").then(({ data: { articles } }) => {
    return articles;
  });
};
export const fetchTopics = () => {
  return newsApi.get("/topics").then(({ data: { topics } }) => {
    return topics;
  });
};
export const fetchCommentsByArticleId = (article_id) => {
  return newsApi
    .get(`/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};
