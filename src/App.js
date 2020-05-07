import React from 'react';
import './App.css';

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ['/', '*', '-', '+']
class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      lastPressed: undefined,
      calc: '0',
      operation: undefined,
      math: undefined
    }
  }

  handleChange (e) {
    const { calc, lastPressed } = this.state;
    const innerText = e.target.name

    e.preventDefault();

    switch(innerText) {
      case 'AC': {
        this.setState({
          calc: '0',
          math: undefined
      });
      break;
    } 
      case '=': {
        // eslint-disable-next-line no-eval
        const evaluated = eval(calc);
        this.setState({
          calc: evaluated,
          math: `${calc} =`,
        }); break;
      }

    case '.': {
      const splitted = calc.split(/[\+\-\*\/]/);
      const last = splitted.slice(-1)[0];
      if (!last.includes('.')) {
        this.setState({
          calc: calc+'.',
        })
      }
      break;
    }
    default: {
      let number = undefined;
      if (ops.includes(innerText)) {
        if (ops.includes(lastPressed) && innerText !== '-') {
          const lastNumberIndex = calc.split('').reverse()
          .findIndex(char => char !== ' ' && numbers.includes(+char));
          number = calc.slice(0, calc.length - lastNumberIndex) +` ${innerText} `;
        } else {
          number = `${calc} ${innerText} `;
        }
      } else {
        number = (calc ==='0') ? innerText : (calc + innerText);
      }
      
      if (calc.length >= 14) {
        this.setState({
          calc: "Max number. Press 'AC'"
        });
      }else {
        this.setState({
          calc: number,
          math: undefined,
        })
      }
    };
  }
  
this.setState({
  lastPressed: innerText,
})

  }
  
  render() {
    return (
      <div className="App">
        <div className="outerBox">
          <p id="calculation">{this.state.math}</p>
          <p id="display">{this.state.calc}</p>
          <Calculator handleChange = {this.handleChange.bind(this)}/>
        </div>
      </div>
    )
  }
}

const Calculator = ({handleChange}) => (
  <div id="calculator" >
    <button id="clear" name='AC' onClick = {handleChange}>AC</button>
    <button id="divide" name='/' className="operators" onClick = {handleChange}>/</button>
    <button id="multiply" name='*' className="operators"  onClick = {handleChange}>*</button>
    <button id="seven" name={7} className="numbers"  onClick = {handleChange}>7</button>
    <button id="eight" name={8} className="numbers"  onClick = {handleChange}>8</button>
    <button id="nine" name={9} className="numbers"  onClick = {handleChange}>9</button>
    <button id="subtract" name='-' className="operators"  onClick = {handleChange}>-</button>
    <button id="four" name={4} className="numbers"  onClick = {handleChange}>4</button>
    <button id="five" name={5} className="numbers"  onClick = {handleChange}>5</button>
    <button id="six" name={6} className="numbers"  onClick = {handleChange}>6</button>
    <button id="add" name='+' className="operators"  onClick = {handleChange}>+</button>
    <button id="one" name={1} className="numbers"  onClick = {handleChange}>1</button>
    <button id="two" name={2} className="numbers"  onClick = {handleChange}>2</button>
    <button id="three" name={3} className="numbers"  onClick = {handleChange}>3</button>
    <button id="equals" name='='  onClick = {handleChange}>=</button>
    <button id="zero" name={0}  onClick = {handleChange}>0</button>
    <button id="decimal" name='.' className="numbers"  onClick = {handleChange}>.</button>
  </div>
)
 
export default App;
