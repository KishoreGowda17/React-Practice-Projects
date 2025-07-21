// Notes 
// In React, derived state refers to state that is calculated from props or other state values, rather than being directly managed or stored independently.

// Why It's Called "Derived"
// It’s called derived because it doesn’t exist on its own—it’s derived (calculated) from something else that already exists in your component, typically props or other pieces of state.

import React, { useState } from "react";

const DerivedState = () => {
  const [data, setData] = useState([
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 },
  ]);

  const userCount = data.length;
  const average = data.reduce((acuum, currEle) => acuum + currEle.age, 0);

  const averageAge = average / userCount;

  return (
    <>
      <h1>Users List</h1>
      <ul>
        {data.map((currEle, index) => {
          return (
            <li key={index}>
              {currEle.name} is {currEle.age} years old
            </li>
          );
        })}
      </ul>
      <p>Total Users : {userCount} </p>
      <p>Average age : {averageAge} </p>
    </>
  );
};

export default DerivedState;
