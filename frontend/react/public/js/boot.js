'use strict';

ReactDOM.render(React.createElement(
  App.Router,
  { history: App.hashHistory },
  React.createElement(
    App.Route,
    { path: '/' },
    React.createElement(App.IndexRoute, { component: App.BookList }),
    React.createElement(App.Route, { component: App.BookForm, path: 'books/new' }),
    React.createElement(App.Route, { component: App.BookDetails, path: 'books/:bookId' })
  )
), document.getElementById('app'));