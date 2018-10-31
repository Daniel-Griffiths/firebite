import styled from 'styled-components'
import React, { Component } from 'react'

import Container from './Container'

export default class Nav extends Component {

  /**
   * Render the component
   *
   * @return {jsx}
   */
  public render() {
  	return (
  		<StyledNav>
  			<StyledContainer>
  				{ this.props.children }
  			</StyledContainer>
  		</StyledNav>
  	)
  }
}

const StyledNav = styled.nav`
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    position: fixed;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    box-shadow: 0 0 10px 0px rgba(0,0,0,0.1);
    background: linear-gradient(135deg, #9554c9 0%, #7d48c2 100%);
`

const StyledContainer = styled(Container)`
	display: flex;
`