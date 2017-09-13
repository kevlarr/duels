'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

App.BookForm = React.createClass({
  displayName: 'BookForm',
  getInitialState: function getInitialState() {
    return {};
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'book-form' },
      React.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        React.createElement(
          'h1',
          null,
          'Add a Book'
        ),
        React.createElement(
          'div',
          { className: 'form-row' },
          React.createElement(
            'label',
            { htmlFor: 'title' },
            'Title'
          ),
          React.createElement('input', { name: 'title',
            value: this.state.title,
            onChange: this.handleChange
          })
        ),
        React.createElement(
          'div',
          { className: 'form-row' },
          React.createElement(
            'label',
            { htmlFor: 'author' },
            'Author'
          ),
          React.createElement('input', { name: 'author',
            value: this.state.author,
            onChange: this.handleChange
          })
        ),
        React.createElement(
          'div',
          { className: 'form-row' },
          React.createElement(
            'label',
            { htmlFor: 'description' },
            'Description'
          ),
          React.createElement('textarea', { name: 'description',
            value: this.state.description,
            onChange: this.handleChange
          })
        ),
        React.createElement(
          'div',
          { className: 'form-row' },
          React.createElement(
            'button',
            null,
            'Submit'
          )
        )
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
  handleChange: function handleChange(e) {
    this.setState(_defineProperty({}, e.target.name, e.target.value));
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    if (this.formIsValid()) {
      this.submitBook();
    }
    return false;
  },
  formIsValid: function formIsValid() {
    if (this.state.title && this.state.author && this.state.description) {
      return true;
    } else {
      return false;
    }
  },
  submitBook: function submitBook() {
    $.ajax({
      url: '/api/v1/books',
      method: 'POST',
      dataType: 'json',
      data: this.state,

      success: function (data) {
        App.transitionTo('/');
      }.bind(this),

      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});