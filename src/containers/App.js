import React from 'react';
import {Component} from 'react';
//import Radium, {StyleRoot} from 'radium';
//import logo from './logo.svg';
import classes from './App.module.css';
import Person from '../components/Persons/Person/Person';
import ValidationComponent from '../components/ValidationComponent/ValidationComponent';
import CharComponent from '../components/CharComponent/CharComponent';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
//import styled from 'styled-components';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/WithClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

/*
const StyledButton = styled.button`
    background-color: ${props => props.alt ? 'red' : 'green'};
    color: white;
    font: inherit;
    border: 1px solid blue;
    padding: 8px;
    cursor: pointer;

    &:hover {
      background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
      color: black;
    }
`;
*/

// Below is the older way of creating react Components where we extend from Component class.
//function App() {
class App extends Component {
  constructor(props) {
  super(props);
  console.log('[App.js] constructor');
  }

  state = {
    persons: [
      {id: 1, name: 'Max', age: 30},
      {id: 2, name: 'Manu', age: 28},
      {id: 3, name: 'MadMax', age: 26}
    ],
    somethingElse: 'Not touched in setState',
    showPersons: false,
    inputLength: 0,
    userInput: '',
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  };

  static getDerivedStateFromProps(props, state) {
      console.log('[App.js] getDerivedStateFromProps', props);
      return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  loginHandler = () => {
    this.setState({authenticated: true})
  };

  nameChangedHandler = (event, id) => {
    // get the ID of the changed person
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

  //store the person in a const. since arrays and objects are passed by ref,
  // we use spread operator
  const newPerson = {
    ...this.state.persons[personIndex]
  };

  // set the name of the person to the value from the event
  newPerson.name = event.target.value;
  // create a copy of persons
  const newPersons = [...this.state.persons];

  // change the value in the index to new person
  newPersons[personIndex] = newPerson;

  // set the state of all persons
  this.setState((prevState, props) => {
    return {persons: newPersons,
      changeCounter: prevState.changeCounter + 1};
    });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  onInputChangeHandler =(event) => {
    let inputLength = event.target.value.length;
    this.setState({
      inputLength: inputLength,
      userInput: event.target.value
    });
  }

  deleteCharHandler = (index) => {
    const text = this.state.userInput.split('');
    text.splice(index, 1);
    const updatedText = text.join('');
    this.setState({
      userInput: updatedText
    });
  }



  render() {
  console.log('[App.js] render');
    /* const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };
    */

    const charList = this.state.userInput.split('').map((i,index) => {
      return <CharComponent
      char={i}
      key={index}
      clicked={() => this.deleteCharHandler(index)} />;
    });

    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler}
        isAuthenticated={this.state.authenticated}
        /> ;
      //style.backgroundColor = 'red';
      //style[':hover'] = {
      //  backgroundColor: 'salmon',
      //  color: 'black'
      //}
    }
    // variable that holds css class names
  return (
    //<StyleRoot> # added for Radium
     <Aux>
     <button onClick={() => {this.setState({showCockpit: false})}}>Remove Cockpit</button>
     <AuthContext.Provider
       value={
         {
           authenticated: this.state.authenticated,
           login: this.loginHandler
         }
         }>
     { this.state.showCockpit ?
     <Cockpit
        title={this.props.appTitle}
        showPersons={this.state.showPersons}
        personsLength={this.state.persons.length}
        clicked={this.togglePersonsHandler}
      /> : null }
      {persons}

     <input type="text" onChange={(event) => this.onInputChangeHandler(event)} />
     <p> Input: {this.state.userInput} </p>
     <p> Length: {this.state.inputLength} </p>
     <ValidationComponent inputLength={this.state.inputLength} />
     {charList}
   </AuthContext.Provider>
   </Aux>
    //</StyleRoot> # added for Radium
  );
  //React.createElement('div', {className: 'App'}, React.createElement('h1', {className: 'App'}, 'My First React App!') ) )
}
}

//export default Radium(App);
export default withClass(App, classes.App);
