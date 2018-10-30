import React, { Component, Fragment } from 'react';

/**
 * Components
 */
import { MusicPlayer } from './../components'

/**
 * Models
 */
import { Album } from './../models'

/**
 * Interfaces
 */
import { AlbumInterface } from './../interfaces'

interface State {
  albums?: AlbumInterface[]
}

export default class HomeContainer extends Component<{}, State> {

  /**
   * The initial component state.
   * 
   * @type {Object}
   */
  public state = {
    albums: [
      {
        id: 0,
        title: '',
        tracks: [
          {
            id: 0,
            title: '',
            length: 0,
          }
        ]
      }
    ]
  }

  /**
   * Mount the component.
   * 
   * @return {void} 
   */
  public componentDidMount() {
    Album.index().then(albums => {
      this.setState({ albums })
    })
  }

  /**
   * Allow child components to update the album state
   * 
   * @param  {object} albums 
   * @return {void}       
   */
  public setAlbumState = (albums) => this.setState({ albums })

  /**
   * Render the component
   *
   * @return {jsx}
   */
  public render() {
    return (
      <Fragment>
        <MusicPlayer 
          albums={this.state.albums}
          setAlbumState={this.setAlbumState}
        />
      </Fragment>
    );
  }
}
