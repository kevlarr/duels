'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

App.ReviewForm = React.createClass({
  displayName: 'ReviewForm',
  getInitialState: function getInitialState() {
    return { score: 10 };
  },
  render: function render() {
    return React.createElement(
      'div',
      { className: 'review-form' },
      React.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        React.createElement(
          'h2',
          null,
          'Add Review'
        ),
        React.createElement(
          'div',
          { className: 'form-row' },
          React.createElement(
            'label',
            { forHtml: 'score' },
            'Score'
          ),
          React.createElement(
            'select',
            { name: 'score',
              value: this.state.score,
              onChange: this.handleChange
            },
            this.scoreOptions()
          )
        ),
        React.createElement(
          'div',
          { className: 'form-row' },
          React.createElement(
            'label',
            { forHtml: 'description' },
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
      )
    );
  },
  handleChange: function handleChange(e) {
    this.setState(_defineProperty({}, e.target.name, e.target.value));
  },
  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    if (this.formIsValid()) {
      this.submitReview();
    }
    return false;
  },
  scoreOptions: function scoreOptions() {
    return App.range(1, 10).reverse().map(function (i) {
      return React.createElement(
        'option',
        { key: i, value: i },
        i
      );
    });
  },
  formIsValid: function formIsValid() {
    if (this.state.score && this.state.description) {
      return true;
    } else {
      return false;
    }
  },
  submitReview: function submitReview() {
    $.ajax({
      url: '/api/v1/books/' + this.props.bookId + '/reviews',
      method: 'POST',
      dataType: 'json',
      data: this.state,

      success: function (data) {
        App.transitionTo('/');
        App.transitionTo('/books/' + this.props.bookId);
      }.bind(this),

      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
});