import React  from 'react'

const NewsItem=(props)=> {
    let { title, description, imageUrl, newsUrl, author, date, newsName } = props;
    return (

      <div>
        <div className="card">
          <div className='container' style={{
            display: 'flex',
            justifyContent: 'flex-end',
            right: '0',
            position: 'absolute'
          }}>
            <span className="badge rounded-pill bg-danger">{newsName}
              <span className="visually-hidden">unread messages</span></span>
          </div>

          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">


            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By:{(!author) ? "Unkown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='__blank' className="btn btn-sm btn-dark">Go somewhere</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem
