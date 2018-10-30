import styled from 'styled-components'
import React, { Component } from 'react'

/**
 * Assets
 */
import logo from './../assets/images/logo.svg'

export default class Logo extends Component {

  /**
   * Render the component
   *
   * @return {jsx}
   */
  public render() {
  	return (
  		<StyledLogo>
  			<img src={logo}/>
         	<StyledLogoText>FireBite</StyledLogoText>
  		</StyledLogo>
  	)
  }
}

const StyledLogo = styled.div`
    top: 1rem;
    left: 1rem;
    opacity: .5;
    display: flex;
    position: fixed;
    align-items: center;
    letter-spacing: 4px;
    text-transform: uppercase;
`

const StyledLogoText = styled.div`
	margin-left: .5rem
`