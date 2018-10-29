import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import cssVars from 'css-vars-ponyfill';
import React, { Component } from 'react';
import initReactFastclick from 'react-fastclick';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './routes';
import { store, persistor } from './configureStore';
import registerServiceWorker from './registerServiceWorker';

// Assets
import 'normalize.css/normalize.css'; // this must be first!
import './assets/css/App.css';

// Define where React will mount
const appRoot = document.getElementById('app-root') as any;

/*
|--------------------------------------------------------------
| Fastclick
|--------------------------------------------------------------
|
| Remove 300ms delay when tapping content on mobile devices.
| Most devices don't have this delay but it can still occur in 
| certain situations such as adding a site as a web app on iOS.
|
*/

initReactFastclick();

/*
|--------------------------------------------------------------
| CSS Vars Polyfill
|--------------------------------------------------------------
|
| For IE11 we are using a polyfill to use CSS variables
| however it doesnt convert new vars when the dom updates
| therefore we will use a mutation observer to check the dom
| for updates and reload the latest CSS
|
*/

cssVars();

const observer = new MutationObserver(() => cssVars());

observer.observe(appRoot, {
  childList: true,
  attributes: true,
  subtree: true
});

/*
|--------------------------------------------------------------
| Mount the app
|--------------------------------------------------------------
|
*/

export default class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, appRoot);
registerServiceWorker();
