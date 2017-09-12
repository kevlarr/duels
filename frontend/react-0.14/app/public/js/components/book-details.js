'use strict';

App.BookDetails = React.createClass({
  displayName: 'BookDetails',
  getInitialState: function getInitialState() {
    return {};
  },
  componentDidMount: function componentDidMount() {
    this.getBook();
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'book-details' },
        React.createElement(
          'h1',
          null,
          this.state.title
        ),
        React.createElement(
          'h2',
          null,
          'by ',
          this.state.author
        ),
        React.createElement(
          'p',
          null,
          this.state.description
        ),
        React.createElement(
          'p',
          { id: 'average-score' },
          this.state.averageScore
        )
      ),
      React.createElement(
        'div',
        null,
        React.createElement(App.ReviewList, { bookId: this.props.params.bookId }),
        React.createElement(App.ReviewForm, { bookId: this.props.params.bookId })
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          App.Link,
          { to: '/' },
          'Back to Index'
        )
      )
    );
  },
  getBook: function getBook() {
    $.ajax({
      url: 'api/v1/books/' + this.props.params.bookId,
      dataType: 'json',
      cache: false,

      success: function (data) {
        this.setState({
          title: data.title,
          author: data.author,
          description: data.description,
          averageScore: data.averageScore
        });
      }.bind(this),

      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});