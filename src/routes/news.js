import React, { useState } from "react";
import axios from 'axios'

const NewsApiPage = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleText = (event) => {
    setSearchText(event.target.value);
  };

  const go=() => {
    axios.get(`https://newsapi.org/v2/everything?q=${searchText}&from=2023-06-12&sortBy=publishedAt&apiKey=9e941f72e1e04675ac8f512ca1930058`)
    .then((response) => {
        setSearchResult(response.data.articles);
        console.log(response.data.articles);
    })
    .catch(() => {
        console.log('Failed to fetch data');
    });
}

  return (
    <div>
      <input onChange={handleText}></input>
      <button className="btn btn-danger" onClick={() => go()}>검색하기</button>
      {
        searchResult.map((article, index) => (
          <p key={index}>{article.title}</p>
        ))
      }
    </div>
  );
};

export default NewsApiPage;
