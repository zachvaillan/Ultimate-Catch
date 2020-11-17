import { connect } from 'react-redux';
import Search from './search';

const mSTP = (state) => {
  return {
    searchd: state.entities.search[0]
  }
};

export default connect(mSTP, null)(Search)