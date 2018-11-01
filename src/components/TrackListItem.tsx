import posed from 'react-pose'
import styled from 'styled-components'
import React, { Component } from 'react';

const AnimatedTrackListItem = posed.li({
  open: { y: 0, opacity: 1 },
  closed: { y: 20, opacity: 0 }
});

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

const StyledTrackListItem = styled(AnimatedTrackListItem)`
  display: flex;
  padding: .5rem 0;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,.2);

  @media(max-width: 600px){
    align-items: start;
    flex-direction: column;

    > div:first-child{
      margin-bottom: .5rem;
    }

    > div:last-child{
      margin-top: .5rem;
    }
  }
`
