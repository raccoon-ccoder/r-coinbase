import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${props => props.theme.bgColor};
  width: 100px;
  height: 100px;
`;

function App1() {
  const [value, setValue] = useState("");
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: {value},
    } = e;
    setValue(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("hello ", value );
  };

  return (
   <div>
     <form onSubmit={onSubmit}>
        <input 
          value={value}
          onChange={onChange} 
          type="text" 
          placeholder="username" 
        />
        <button>Log in</button>
     </form>
     <Container />
   </div>
  );
}

export default App1;
