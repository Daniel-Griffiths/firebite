import styled from 'styled-components'

export default styled.button`
	color: #fff;
	cursor: pointer;
	padding: .5em 1em;
	border-radius: ${ props  => props.rounded ? '100px' : '3px' };
	transition: 0.3s ease;
	border: 1px solid #fff;
	background: transparent;
	&:hover {
		color: var(--brand-color-primary);
		background: #fff;
	}
`