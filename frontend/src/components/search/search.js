import React from 'react';
import { Link } from 'react-router-dom'
import '../../assets/stylesheets/search.css'

const Search = ({searchd}) => {
 
  function results()  {
    if (searchd.length === 0) {
      return <div>No users found</div>
    } else {
      return searchd.map(user => <div className="search-result"><Link to={{pathname: '/profile', state: {notCurrentUser: user._id}}}>{user.handle}</Link></div>) 
    }
  }

  return (
    <section className='search-container'>
      <h1>SEARCH RESULTS</h1>
      <div>
        {results()}
      </div>
      <Link to='/main'>
        <button className="submit">back</button>
      </Link>

    </section>
  )
};

export default Search;