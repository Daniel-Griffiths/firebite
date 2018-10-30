import styled from 'styled-components'
import React, { Component } from 'react';

export default class TrackListItem extends Component {

  /**
   * Render the component
   *
   * @return {jsx}
   */
  public render() {
  	return (
  		<StyledTrackListItem>
  			{ this.props.children }
  		</StyledTrackListItem>
  	)
  }
}

const StyledTrackListItem = styled.li`

`
