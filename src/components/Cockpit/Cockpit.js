import React, {useEffect, useRef, useContext} from 'react';
import classes from './Cockpit.module.css';
import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {

  const toggleButtonRef = useRef(null);

  const authContext = useContext(AuthContext);

  console.log(authContext.authenticated);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');

    //const timer = setTimeout(() => {
    //  alert('saving data to cloud');
    //}, 1000);
    toggleButtonRef.current.click();
    return () => {
      //clearTimeout(timer);
      console.log('[Cockpit.js] clean up work');
    }
  }, []);

  useEffect(() => {
    console.log('[Cockpit.js] second useEffect');
    return () => {
      console.log('[Cocopit.js] clean up work in second useEffect');
    };
  });

  let assignedClasses = [];

  let btnClass='';

  if (props.showPersons) {
    btnClass = classes.Red;
  }
  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red); //classes =['red']
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold); //classes =['red','bold']
  }

  return(
    <div className={classes.Cockpit}>
      <h1> {props.title} React App </h1>
      <p className={assignedClasses.join(' ')}> This is working! </p>
      <button ref={toggleButtonRef} className={btnClass}
      onClick={props.clicked} > show persons </button>
    <button onClick={authContext.login}> Log In </button>
    </div>
  );
};

// React will memorize and will re-render only if input changes.
export default React.memo(Cockpit);
