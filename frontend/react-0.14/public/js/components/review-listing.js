'use strict';

App.ReviewListing = React.createClass({
  displayName: 'ReviewListing',
  render: function render() {
    return React.createElement(
      'div',
      { className: 'review-listing' },
      React.createElement(
        'p',
        null,
        React.createElement(
          'span',
          { className: 'score' },
          '[',
          this.props.score,
          ']'
        ),
        React.createElement(
          'span',
          { className: 'description' },
          ' ',
          this.props.description
        )
      )
    );
  }
});