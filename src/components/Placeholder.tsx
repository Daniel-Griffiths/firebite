import styled from 'styled-components'
import React, { Component } from 'react'

/**
 * components
 */
import Title from './Title'

/**
 * Assets
 */
import vinyl from './../assets/images/vinyl.svg'


export default class Placeholder extends Component {

  /**
   * Render the component
   *
   * @return {jsx}
   */
  public render() {
  	return (
  		<StyledPlaceholder>
  			<Title>Welcome to FireBite <br/>Add a new album to get started!</Title>
  			<StyledPlaceholderImage src={vinyl}/>
  		</StyledPlaceholder>
  	)
  }
}

const StyledPlaceholder = styled.div`
	display: flex;
	text-align: center;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	height: calc(80vh - var(--body-offset))
`

const StyledPlaceholderImage = styled.img`
	animation: spin 4s infinite linear;
	transition: .3s ease;

	&:hover{
		filter: drop-shadow(0 0 10px rgba(0,0,0,0.5));
	}
`
