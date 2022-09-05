import React from 'react';

function ReactComponentNonBooleanValues(props) {
    return <div>
      <h1>{ props.username }</h1>
      { props.orders && <Orders /> } { /* Noncompliant, 0 will be rendered if no orders available */ }
    </div>
}

export default ReactComponentNonBooleanValues;