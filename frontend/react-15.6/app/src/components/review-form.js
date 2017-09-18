App.ReviewForm = React.createClass({
  getInitialState() {
    return { score: 10 };
  },

  render() {
    return(
      <div className='review-form'>
        <form onSubmit={ this.handleSubmit }>
          <h2>Add Review</h2>

          <div className='form-row'>
            <label forHtml='score'>Score</label>
            <select name='score'
              value={ this.state.score }
              onChange={ this.handleChange }
            >
              { this.scoreOptions() }
            </select>
          </div>

          <div className='form-row'>
            <label forHtml='description'>Description</label>
            <textarea name='description'
              value={ this.state.description }
              onChange={ this.handleChange }
            />
          </div>

          <div className='form-row'>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  },

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  },

  handleSubmit(e) {
    e.preventDefault();
    if (this.formIsValid()) {
      this.submitReview();
    }
    return false;
  },

  scoreOptions() {
    return(
      App.range(1, 10).reverse().map(function(i) {
        return(
          <option key={i} value={i}>{i}</option>
        );
      })
    );
  },

  formIsValid() {
    if (this.state.score && this.state.description) {
      return true;
    }
    else {
      return false;
    }
  },

  submitReview() {
    $.ajax({
      url: `/api/v1/books/${ this.props.bookId }/reviews`,
      method: 'POST',
      dataType: 'json',
      data: this.state,

      success: function(data) {
        App.transitionTo('/');
        App.transitionTo(`/books/${ this.props.bookId }`);
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});
