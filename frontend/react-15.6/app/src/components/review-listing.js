App.ReviewListing = React.createClass({
  render() {
    return(
      <div className='review-listing'>
        <p>
          <span className='score'>[{ this.props.score }]</span>
          <span className='description'> { this.props.description }</span>
        </p>
      </div>
    );
  }
});
