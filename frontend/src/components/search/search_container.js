import { connect } from 'react-redux';
import Search from './search';

const mSTP = (state) => {
  return {
    searchd: Object.values(state.entities.search)
  }
};

export default connect(mSTP, null)(Search)