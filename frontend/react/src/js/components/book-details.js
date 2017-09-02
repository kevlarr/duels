App.BookDetails = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
    this.getBook();
  },

  render() {
    return(
      <div>
        <div className='book-details'>
          <h1>{ this.state.title }</h1>
          <h2>by { this.state.author }</h2>
          <p>{ this.state.description }</p>
          <p id='average-score'>{ this.state.averageScore }</p>
        </div>

        <div>
          <App.ReviewList bookId={ this.props.params.bookId } />
          <App.ReviewForm bookId={ this.props.params.bookId } />
        </div>

        <div>
          <App.Link to='/'>Back to Index</App.Link>
        </div>
      </div>
    );
  },

  getBook() {
    $.ajax({
      url: `api/v1/books/${this.props.params.bookId}`,
      dataType: 'json',
      cache: false,

      success: function(data) {
        this.setState({
          title: data.title,
          author: data.author,
          description: data.description,
          averageScore: data.averageScore
        });
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});
