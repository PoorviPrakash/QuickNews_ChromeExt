/* Handles the main News view and the calling the backround script*/
import React, { useState } from 'react';
/*global chrome*/
import './news.css';

function News() {
  const [articles, setArticles] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchingUrl = `https://newsapi.org/v2/top-headlines?q=${keyword}&category=${category}&apiKey=a8b86a55406846d6a4ca44088ab6b1e7&language=en`
    //Using chrome runtime function to send message to the background.js to call API
    chrome.runtime.sendMessage({
      event: "fetchNews",
      url: fetchingUrl
    }, function(response) {
      console.log(response);
      //Only selecting the first 10 articles from the responses returned
      setArticles(response.articles.slice(0,10));
    });
  };

  return (
    <div className="my-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Keyword"
          className="my-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        required/>
        <select value={category} className="my-dropdown" onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Category</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
        <button type="submit" className="my-button">Search</button>
      </form>

      <ul className="news-list">
        {articles.map((article) => (
          <li key={article.url}>
            <a href={article.url} target="_blank" rel="noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default News;
