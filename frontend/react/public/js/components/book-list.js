'use strict';

App.BookList = React.createClass({
  displayName: 'BookList',
  getInitialState: function getInitialState() {
    return { data: [] };
  },
  componentDidMount: function componentDidMount() {
    this.getBooks();
    setInterval(this.getBooks, App.pollInterval);
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { id: 'book-list' },
        React.createElement(
          'h1',
          null,
          'Books'
        ),
        React.createElement(
          'ul',
          null,
          this.bookListings()
        )
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          App.Link,
          { to: '/books/new' },
          'Add Book'
        )
      )
    );
  },
  bookListings: function bookListings() {
    return this.state.data.map(function (book) {
      return React.createElement(
        'li',
        { key: book.id },
        React.createElement(App.BookListing, {
          id: book.id,
          author: book.author,
          title: book.title,
          averageScore: book.averageScore,
          description: book.description
        })
      );
    });
  },
  getBooks: function getBooks() {
    $.ajax({
      url: '/api/v1/books',
      dataType: 'json',
      cache: false,

      success: function (data) {
        this.setState({ data: data });
      }.bind(this),

      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});