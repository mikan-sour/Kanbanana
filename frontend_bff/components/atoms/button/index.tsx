import React from 'react'
import styled from 'styled-components';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button:React.FC<IButton> = ({children,...props}) => {
  return (
    <StyledButton {...props}>
        {children}
    </StyledButton>
  )
}

export default Button;

const StyledButton = styled.button`
    
/* CSS */
  margin:.25rem;
  appearance: none;
  background-color: rgba(254,235,45,.7);
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #222;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;


:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

:hover {
    background-color: rgba(254,235,45,1);   
}

:focus {
  box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
  outline: none;
}

:disabled {
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}

:active {
  background-color: (254,235,45,.2);
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}
`

