import React, { Component, Fragment } from 'react';

/**
 * Components
 */
import { Logo, Nav, Container } from './../components'

/**
 * The root container wraps all other containers 
 * and can be used to have some global page structure (eg a Header/Footer).
 */
export default class RootContainer extends Component {

  /**
   * Render the component
   *
   * @return {jsx}
   */
  public render() {
    return (
      <Fragment>
        <Nav>
          <Container>
            <Logo/>
          </Container>
        </Nav>
        {this.props.children}
      </Fragment>
    );
  }
}
