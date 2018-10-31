import posed from 'react-pose'
import styled from 'styled-components'
import React, { Component } from 'react';

const AnimatedAlbumList = posed.div({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
});

export default class AlbumList extends Component {

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
  	return (
  		<StyledTrackListItem pose={this.state.pose}>
  			{ this.props.children }
  		</StyledTrackListItem>
  	)
  }
}

const StyledTrackListItem = styled(AnimatedAlbumList)`
	margin-bottom: 3rem;
`
