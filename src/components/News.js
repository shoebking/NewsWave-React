import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7b665a5c3c284143a1b09785f9955b8d&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    setLoading(true)
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setLoading(true)
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
  useEffect(()=>{
    updateNews();
  },[])
  
  // const handlePrev = async () => {
  //   setPage(page-1)
  //   updateNews()
  // }
  // const handleNext = async () => {
  //   setPage(page+1)
  //   updateNews()
  // }

  const fetchData = async () => {
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7b665a5c3c284143a1b09785f9955b8d&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)

  }
    return (
      <>
        <InfiniteScroll
          dataLength={articles.length} //This is important field to render the next data
          next={fetchData}
          hasMore={articles.length !== totalResults}
          loader={< Spinner />}>
          <div className='container'>
            <h2><div className='text-center' style={{margin:'80px'}}>News Monkey-Top HeadLines</div></h2>
            {loading && < Spinner />}
            <div className='row my-3'>
              {articles.map((element) => {
                return <div className='col-md-4' key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                    imageUrl={element.urlToImage ? element.urlToImage : "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/6EEB2YQLZQH3GSG6MCJBJRPY54_size-normalized.jpg&w=1440"}
                    newsUrl={element.url} author={element.author} date={element.publishedAt} newsName={element.source.name} />
                </div>
              })}
            </div>
            {/* <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev}>&larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>&rarr; Next</button>
        </div> */}

          </div>
        </InfiniteScroll>
      </>
    )

}


News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News
