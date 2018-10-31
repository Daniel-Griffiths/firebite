import React, { Component, Fragment } from 'react';

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
        {this.props.children}
      </Fragment>
    );
  }
}
