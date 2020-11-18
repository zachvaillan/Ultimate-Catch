import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
// We'll create this soon
import App from './app';
import ScrollToTop from './ScrollToTop'
const Root = ({ store }) => (
  <Provider store={ store }>
    <HashRouter>
      {/* <ScrollToTop> */}
      <App />
        {/* </ScrollToTop> */}

    </HashRouter>
  </Provider>
);

export default Root;