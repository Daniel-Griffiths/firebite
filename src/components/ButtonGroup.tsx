import styled from 'styled-components'

export default styled.div`

	@media(max-width: ${props => props.maxBreakpoint}px){
		display: grid;
		grid-template-columns: repeat(${props => props.children.length}, 1fr);

		> button{
			margin: 0;
			border-radius: 0;
		}

		> button:first-child{
			border-top-left-radius: 100px;
			border-bottom-left-radius: 100px;
		}

		> button:last-child{
			border-top-right-radius: 100px;
			border-bottom-right-radius: 100px;
		}
	}
`