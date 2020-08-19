import React, {Component} from 'react';
import  classes from './Person.module.css';
import PropTypes from 'prop-types';
//import Radium from 'radium';
//import styled from 'styled-components';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/WithClass';
import AuthContext from '../../../context/auth-context';

/*
const StyledDiv = styled.div`
  width: 60%;
  margin: 16px auto;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 16px;
  text-align: center;

  @media (min-width: 500px): {
    width: 450px;
  }
`;
const person = (props) => {
  const style = {
    '@media (min-width: 500px)': {
      width: '450px'
    }
  };
  */
  class Person extends Component {
  //const person = (props) => {
    /*
    const rnd = Math.random();

    if (rnd < 0.7) {
    throw new Error('Somethong went wrong');
    }
    */
    constructor(props){
      super(props)
        this.inputElementRef = React.createRef();
    }

    // This makes the "this.context" available to the class
    static contextType = AuthContext;

    componentDidMount(){
        //this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render() {
      console.log('[Person.js] rendering..');
      return (
        <Aux>

            {this.context.authenticated ? <p> Authenticated! </p> : <p> please login </p> }
        <p key="i1" onClick={this.props.click} >
          I am a {this.props.name} and I am {this.props.age}  years old! </p>
        <p key="i2"> {this.props.children} </p>

        <input key="i3"
          // ref={(inputEl) => {this.inputElement = inputEl}}
          ref = {this.inputElementRef}
          type="text" onChange={this.props.changed} value={this.props.name} />
      </Aux>
      );
    }

}

//special property you add to JS component object where you pass data types
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};
//export default Radium(person);
export default withClass(Person, classes.Person);
