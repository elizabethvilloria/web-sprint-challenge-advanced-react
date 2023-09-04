import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = { ... initialState };
  }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const { index } = this.state;
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;
    return { x, y }

  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.

    const { x, y } = this.getXY();
    return `Coordinates (${x}, ${y})`
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({ ...initialState });
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    const { index } = this.state;
    const x = index % 3;
    const y = Math.floor(index / 3);

    switch (direction) {
      case 'left':
        return x > 0 ? index - 1 : index;
      case 'up':
        return y > 0 ? index - 3 : index;
      case 'right':
        return x < 2 ? index + 1 : index;
      case 'down':
        return y < 2 ? index + 3 : index;
      default:
        return index;
    }
  }

  move = (direction) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const nextIndex = this.getNextIndex(direction);

    if (nextIndex === this.state.index) {
      this.setState({ message: `You can't go ${direction}` })
    } else {
      this.setState((prevState) => ({
        index: nextIndex,
        steps: prevState.steps + 1,
        message: '',
      }));
    }
  }

  onChange = (evt) => {;

    // You will need this to update the value of the input.
    this.setState({ email: evt.target.value })

  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.

    evt.preventDefault();
    const { email, index, steps } = this.state;

    const payload = {
      x: (index % 3) + 1,
      y: Math.floor(index / 3) + 1,
      steps,
      email,
    };

    fetch('http://localhost:9000/api/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ message: data.message, email: '' })
      })
      .catch((error) => {
        this.setState({ message: 'Error: ' + error.message });
      })
  }

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.move('left')}>LEFT</button>
          <button id="up" onClick={() => this.move('up')}>UP</button>
          <button id="right" onClick={() => this.move('right')}>RIGHT</button>
          <button id="down" onClick={() => this.move('down')}>DOWN</button>
          <button id="reset" onClick={() => this.reset()}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" value={this.state.email} onChange={this.onChange} />
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
