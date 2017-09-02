App.BookForm = React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    return(
      <div className='book-form'>
        <form onSubmit={ this.handleSubmit }>
          <h1>Add a Book</h1>

          <div className='form-row'>
            <label htmlFor='title'>Title</label>
            <input name='title'
              value={ this.state.title }
              onChange={ this.handleChange }
            />
          </div>

          <div className='form-row'>
            <label htmlFor='author'>Author</label>
            <input name='author'
              value={ this.state.author }
              onChange={ this.handleChange }
            />
          </div>

          <div className='form-row'>
            <label htmlFor='description'>Description</label>
            <textarea name='description'
              value={ this.state.description }
              onChange={ this.handleChange }
            />
          </div>

          <div className='form-row'>
            <button>Submit</button>
          </div>
        </form>

        <div>
          <App.Link to='/'>Back to Index</App.Link>
        </div>
      </div>
    );
  },

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  },

  handleSubmit(e) {
    e.preventDefault();
    if (this.formIsValid()) {
      this.submitBook();
    }
    return false;
  },

  formIsValid() {
    if (this.state.title && this.state.author && this.state.description) {
      return true;
    }
    else {
      return false;
    }
  },

  submitBook() {
    $.ajax({
      url: '/api/v1/books',
      method: 'POST',
      dataType: 'json',
      data: this.state,

      success: function(data) {
        App.transitionTo('/');
      }.bind(this),

      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});
