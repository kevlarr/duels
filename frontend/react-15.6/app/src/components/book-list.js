App.BookList = React.createClass({
  getInitialState() {
    return { data: [] }
  },

  componentDidMount() {
    this.getBooks();
    setInterval(this.getBooks, App.pollInterval);
  },

  render() {
    return(
      <div>
        <div id='book-list'>
          <h1>Books</h1>
          <ul>
            { this.bookListings() }
          </ul>
        </div>

        <div>
          <App.Link to='/books/new'>Add Book</App.Link>
        </div>
      </div>
    );
  },

  bookListings() {
    return(
      this.state.data.map(function(book) {
        return(
          <li key={ book.id }>
            <App.BookListing
              id={ book.id }
              author={ book.author }
              title={ book.title }
              averageScore={ book.averageScore }
              description={ book.description }
              />
          </li>
        );
      })
    );
  },

  getBooks() {
    $.ajax({
      url: '/api/v1/books',
      dataType: 'json',
      cache: false,

      success: function(data) {
        this.setState({ data: data });
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});
