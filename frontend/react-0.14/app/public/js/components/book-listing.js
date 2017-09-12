"use strict";

App.BookListing = React.createClass({
  displayName: "BookListing",
  render: function render() {
    return React.createElement(
      "div",
      { className: "book-listing" },
      React.createElement(
        App.Link,
        { to: "books/" + this.props.id },
        React.createElement(
          "h2",
          null,
          this.props.title
        )
      ),
      React.createElement(
        "h3",
        null,
        this.props.author
      ),
      React.createElement(
        "p",
        { className: "average-score" },
        this.props.averageScore
      ),
      React.createElement(
        "p",
        null,
        this.props.description.slice(0, 150),
        "..."
      )
    );
  }
});