import styled from 'styled-components'

const PlusLogo = styled.span`
	height: 30px;
	width: 30px;
	display: inline-block;
	background-color: #FFF;
	color: lightgray;
	font-size: 24px;
	line-height: 30px;
	text-align: center;
	border: solid lightgray .5px;
	border-radius: 50%;
	font-weight: 700;
	margin-left: 18px;
	transition: background-color 0.3s ease-out; 

	&:hover {
		background-color: #d7ffd7;
	}


	&::before {
  		content: "+";
	}

`

export default PlusLogo;


