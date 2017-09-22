import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from 'components/main';
import BookList from 'components/book-list';
import BookCreate from 'components/book-create';
import BookDetail from 'components/book-detail';

ReactDOM.render((
  <BrowserRouter>
    <Main>
      <Route path="/" component={BookList} />
      <Route path="/books/new" component={BookCreate} />
      <Route path="/books/:id" component={BookDetail} />
    </Main>
  </BrowserRouter>
), document.getElementById('root'));
