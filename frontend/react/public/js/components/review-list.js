'use strict';

App.ReviewList = React.createClass({
  displayName: 'ReviewList',
  getInitialState: function getInitialState() {
    return {};
  },
  componentDidMount: function componentDidMount() {
    this.getReviews();
  },
  render: function render() {
    if (this.state.reviews) {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          'Reviews:'
        ),
        React.createElement(
          'ul',
          null,
          this.reviewListings()
        )
      );
    } else {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          'No Reviews Yet!'
        )
      );
    }
  },
  reviewListings: function reviewListings() {
    return this.state.reviews.map(function (review) {
      return React.createElement(
        'li',
        { key: review.id },
        React.createElement(App.ReviewListing, {
          id: review.id,
          score: review.score,
          description: review.description
        })
      );
    });
  },
  getReviews: function getReviews() {
    $.ajax({
      url: 'api/v1/books/' + this.props.bookId + '/reviews',
      dataType: 'json',
      cache: false,

      success: function (data) {
        this.setState({ reviews: data });
      }.bind(this),

      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});