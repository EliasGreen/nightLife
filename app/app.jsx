const React = require('react');
const { render } = require('react-dom');

// router
const Route = require('react-router-dom').Route;
const BrowserRouter = require('react-router-dom').BrowserRouter;
const hashHistory = require('react-router-dom').hashHistory;

// redux
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const reducers = require('./reducers');

let store = createStore(reducers);

store.subscribe( () => {
  console.log(store.getState());
});

/* Import Components */
const Main = require('./components/Main');

render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Main}/>
      </div>
    </BrowserRouter>
  </Provider>), document.getElementById('main'));