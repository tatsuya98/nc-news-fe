import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://be-nc-news-project-0i36.onrender.com/api",
});

export const fetchArticles = ({ topic, sort_by, order_by }) => {
  return newsApi
    .get("/articles", { params: { topic, sort_by, order_by } })
    .then(({ data: { articles } }) => {
      if (articles.length === 0) {
        return Promise.reject({
          response: {
            data: { message: "No articles found for this topic" },
            status: 404,
          },
        });
      }
      return articles;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
export const fetchArticleById = (article_id) => {
  return newsApi
    .get(`/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
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

export const updateVotesByCommentId = (comment_id, voteObject) => {
  return newsApi.patch(`/comments/${comment_id}`, voteObject);
};
export const updateCommentsByArticleId = (article_id, comment) => {
  return newsApi
    .post(`/articles/${article_id}/comments`, comment)
    .then(({ data: { userComment } }) => {
      return userComment;
    });
};

export const deleteCommentByCommentId = (comment_id) => {
  return newsApi.delete(`/comments/${comment_id}`);
};
