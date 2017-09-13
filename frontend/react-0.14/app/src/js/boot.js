ReactDOM.render((
  <App.Router history={ App.hashHistory }>

    <App.Route path='/'>
      <App.IndexRoute component={ App.BookList } />

      <App.Route component={ App.BookForm }    path='books/new' />
      <App.Route component={ App.BookDetails } path='books/:bookId'  />
    </App.Route>

  </App.Router>
), document.getElementById('app'));
