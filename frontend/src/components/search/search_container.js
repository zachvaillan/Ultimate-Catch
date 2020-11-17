import { connect } from 'react-redux';
import Search from './search';

const mSTP = (state) => {
  return {
    search: state.entities.search
  }
};

export default connect(mSTP, null)(Search)