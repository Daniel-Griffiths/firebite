import posed from 'react-pose'
import styled from 'styled-components'
import React, { Component } from 'react'

const AnimatedTrackList = posed.ul({
  open: {
    delayChildren: 200,
    staggerChildren: 50
  },
  closed: { delay: 300 }
});

/**
 * Interfaces
 */
import { TrackInterface } from './../interfaces'

interface Props {
  tracks?: TrackInterface[],
  render: any
}

export default class TrackList extends Component<Props> {

  public state = {
    pose: 'closed'
  }

  /**
   * Mount the component.
   * 
   * @return {void} 
   */
  public componentDidMount(){
    // This 1ms delay is required for pose to animation on mount
    setTimeout(() => this.setState({ pose: 'open' }), 1)
  }

  /**
   * Render the component
   *
   * @return {jsx}
   */
  public render() {

  	const { tracks } = this.props
    console.log(tracks)

  	return (
  		<StyledTrackList pose={this.state.pose}>
  			{tracks && tracks.map(track => this.props.render(track))}
  		</StyledTrackList>
  	)
  }
}

const StyledTrackList = styled(AnimatedTrackList)`
	margin: 0;
	padding: 0;
	list-style: none;
`
