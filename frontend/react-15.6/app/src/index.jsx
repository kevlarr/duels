import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from 'components/main';
import BookList from 'components/book-list';
import BookCreate from 'components/book-create';
import BookDetail from 'components/book-detail';
import BookEdit from 'components/book-edit';

ReactDOM.render((
  <BrowserRouter>
    <Main>
      <Route path="/" component={BookList} />
      <Route path="/books/new" component={BookCreate} />
      <Route path="/books/:id" component={BookDetail} />
      <Route path="/books/:id/edit" component={BookEdit} />
    </Main>
  </BrowserRouter>
), document.getElementById('root'));
