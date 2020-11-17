import React from 'react';
import { Link } from 'react-router-dom'
import '../../assets/stylesheets/search.css'

const Search = ({search}) => {
  function results()  {
  
    if (search.length === 0) {
      return <div>No users found</div>
    } else {

      return search.map(user => <div>{user.handle}</div>) 
    }
  }

  return (
    <section className='search-container'>
      <h1>SEARCH RESULTS</h1>
      <div>
        {results()}
      </div>

      <Link>
        <button>back</button>
      </Link>
    </section>
  )
};

export default Search;