import React from 'react';
import { Link } from 'react-router-dom'
import '../../assets/stylesheets/search.css'

const Search = ({searchd}) => {
  console.log(searchd)
  function results()  {
    if (searchd.length === 0) {
      return <div>No users found</div>
    } else {
      return searchd.map(user => <div className="search-result">{user.handle}</div>) 
    }
  }

  return (
    <section className='search-container'>
      <h1>SEARCH RESULTS</h1>
      <div>
        {results()}
      </div>
      <Link to='/main'>
        <button>back</button>
      </Link>
    </section>
  )
};

export default Search;