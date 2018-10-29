import React, { Component, Fragment } from 'react';

import { Album } from './../models'
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
  public componentDidMount(){
    Album.index().then(albums => {
      this.setState({ albums })
    })
  }

  /**
   * Render the component
   *
   * @return {jsx}
   */
  public render() {

    const { albums } = this.state

    return (
      <Fragment>
        { albums.map(album => 
          <div key={`album-${album.id}`}>
            <h1>{album.title}</h1>
            <ul>
              { album.tracks.map(track => 
                <li key={`track-${track.id}`}>
                  {track.length} - {track.title}
                </li>
              )}
            </ul>
          </div>
        )}
      </Fragment>
    );
  }
}
