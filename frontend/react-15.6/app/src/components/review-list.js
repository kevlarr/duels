App.ReviewList = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
    this.getReviews();
  },

  render() {
    if (this.state.reviews) {
      return(
        <div>
          <h2>Reviews:</h2>
          <ul>
            { this.reviewListings() }
          </ul>
        </div>
      );
    }
    else {
      return(
        <div>
          <h2>No Reviews Yet!</h2>
        </div>
      );
    }
  },

  reviewListings() {
    return(
      this.state.reviews.map(function(review) {
        return(
          <li key={ review.id }>
            <App.ReviewListing
              id={ review.id }
              score={ review.score }
              description={ review.description }
              />
          </li>
        );
      })
    );
  },

  getReviews() {
    $.ajax({
      url: `api/v1/books/${this.props.bookId}/reviews`,
      dataType: 'json',
      cache: false,

      success: function(data) {
        this.setState({ reviews: data });
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});
