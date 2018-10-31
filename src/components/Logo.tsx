import styled from 'styled-components'
import React, { Component } from 'react'

/**
 * Assets
 */
import logo from './../assets/images/logo.svg'

interface Props {
  className: string
}

export default class Logo extends Component<Props> {

  /**
   * Render the component
   *
   * @return {jsx}
   */
  public render() {
  	return (
  		<StyledLogo {...this.props}>
  			<img src={logo}/>
         	<StyledLogoText>FireBite</StyledLogoText>
  		</StyledLogo>
  	)
  }
}

const StyledLogo = styled.div`
    display: flex;
    cursor: default;
    align-items: center;
    letter-spacing: 4px;
    transition: .3s ease;
    text-transform: uppercase;
`

const StyledLogoText = styled.div`
	margin-left: .5rem
`