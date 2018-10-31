import styled from 'styled-components'
import React, { Component } from 'react';

/**
 * Interfaces
 */
import { TrackInterface } from './../interfaces'

interface Props {
  tracks?: TrackInterface[],
  render: any
}

export default class TrackList extends Component<Props> {

  /**
   * Render the component
   *
   * @return {jsx}
   */
  public render() {

  	const { tracks } = this.props
    console.log(tracks)

  	return (
  		<StyledTrackList>
  			{tracks && tracks.length ? tracks.map(track => this.props.render(track)) : <p>Try adding some tracks!</p>}
  		</StyledTrackList>
  	)
  }
}

const StyledTrackList = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
`
