App.BookListing = React.createClass({
  render() {
    return(
      <div className='book-listing'>

        <App.Link to={ `books/${ this.props.id }`  } >
          <h2>{ this.props.title }</h2>
        </App.Link>

        <h3>{ this.props.author }</h3>
        <p className="average-score">{ this.props.averageScore }</p>
        <p>{ this.props.description.slice(0, 150) }...</p>
      </div>
    );
  }
});
