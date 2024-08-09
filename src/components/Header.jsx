import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopics } from "../../newsApi";
const Header = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    fetchTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);
  return (
    <>
      <header className="flex-header">
        <a className="home" href="/articles">
          <h1>nc news</h1>
        </a>
        <nav>
          <ul className="flex-nav">
            {topics.map((topic) => {
              return (
                <Link key={topic.slug} to={`/articles/${topic.slug}`}>
                  <li>{topic.slug}</li>
                </Link>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
