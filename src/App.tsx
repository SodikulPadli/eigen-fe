import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Carousel } from 'antd';

function App() {
  const [news, setNews] = useState([]);
  interface Data {
    id: number;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
  }
  async function getNews() {
    try {
      const response = await axios.get('https://newsapi.org/v2/everything?q=tesla&from=2022-10-10&sortBy=publishedAt&apiKey=62b64518b4d548a193b591832eb4e86e');

      if (response.data.articles.author !== '') {
        setNews(response.data.articles);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="App" style={{ backgroundImage: 'url(../public/bg.png)' }}>
      <h1>The News World</h1>
      <Carousel autoplay style={{ height: '400px', color: '#fff', lineHeight: '20px', textAlign: 'center', background: '#364d79' }}>
        {news.map((item: Data) => (
          <div>
            <img src={item.urlToImage} width="200px" style={{ margin: '20px auto', borderRadius: '10px' }} />
            <h2>{item.title}</h2>
            <p style={{ padding: '20px' }}>{item.description}</p>
            <a href={item.url} target="_blank">
              Show More
            </a>
            <p>Author : {item.author}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
