import React, { Component } from 'react'

/**
 * Components
 */
import { MusicPlayer, Container } from './../components'

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
    this.fetchAlbums()
  }

  /**
   * Fetch the album data.
   * 
   * @return {void}
   */
  public fetchAlbums = () => {
    Album.index().then(albums => {
      this.setState({ albums: albums.reverse() })
    })
  }

  /**
   * Refetch the album data
   * 
   * @return {void}       
   */
  public reloadAlbums = () => this.fetchAlbums()

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
      <Container>
        <MusicPlayer 
          albums={this.state.albums}
          reloadAlbums={this.reloadAlbums}
          setAlbumState={this.setAlbumState}
        />
      </Container>
    );
  }
}
