const React = require('react');
const Renderer = require('./renderer');

class RootQuery extends React.Component {
  render() {
    return [<GraphQLID key={1} />, <GraphQLString key={2} />];
  }
}

class GraphQLID extends React.Component {
  constructor(props) {
    super(props);
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }

  render() {
    console.error('Called RENDER in GraphQLID!');
    return 'Rendering GraphQLID!'; // FIXME: cannot return OBJECT (?)
  }
}

class GraphQLString extends React.Component {
  constructor(props) {
    super(props);
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }

  render() {
    console.error('Called RENDER in GraphQLString!');
    return 'Rendering GraphQLString!'; // FIXME: cannot return OBJECT (?)
  }
}

Renderer.render(<RootQuery />);
