import React from 'react';
import './App.css';


class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  fetch() {
    this.setState({ image: null });
    fetch('https://dalle-mini.amasad.repl.co/gen/' + this.props.text)
      .then(response => response.blob())
      .then(image => {
        this.setState({ image });
      });
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.fetch();
    }
  }

  render() {
    const { image } = this.state;
    return (
      <React.Fragment>
        {image ? <img src={URL.createObjectURL(image)} alt="random" /> : <div className="loader"></div>}
      </React.Fragment>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', text: 'robot en tant que chevalier cyberpunk scifi réaliste, portrait en gros plan par donato giancola et greg rutkowski, scifi rétro vintage, visage réaliste, art numérique, tendance sur artstation, symétrie!!! ' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ text: this.state.value });
  }

  render() {
    console.log(this.state)
    return (<main>
      <div className='search'>
        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="robot en tant que chevalier cyberpunk scifi réaliste, portrait en gros plan par donato giancola et greg rutkowski, scifi rétro vintage, visage réaliste, art numérique, tendance sur artstation, symétrie!!! " />
        <button id="gen" onClick={this.handleSubmit}>Generate</button>
      </div>
      <div className="container"><Image text={this.state.text} /></div>
    </main>)
  }
}
