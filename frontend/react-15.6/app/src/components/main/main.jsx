import React from 'react';

export default class Main extends Component {
  render() {
    return (
      <div>
        <h1>Hello, books!</h1>
        {this.props.children}
      </div>
    );
  }
}

);
