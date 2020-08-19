import React from 'react';
import './ValidationComponent.css';

const validationComponent = (props) => {
  let message = 'Input is valid!';

  if (props.inputLength  > 0  && props.inputLength <= 5){
    message = 'Input is too short';
  }

  if (props.inputLength >= 10) {
    message = "Input is too long!"
  }

    return(
      <div className="ValidationComponent">
      <p> {message} </p>
      </div>
    );
  };

export default validationComponent;
