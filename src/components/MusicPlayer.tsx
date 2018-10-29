import React, { Component, Fragment } from 'react';

/**
 * Interfaces
 */
import { AlbumInterface } from './../interfaces'

interface Props {
  albums?: AlbumInterface[]
}

export default class HomeContainer extends Component<Props> {

  /**
   * Render the component
   *
   * @return {jsx}
   */
  public render() {

    const { albums } = this.props

    return (
      <Fragment>
        { albums && albums.map(album => 
          <div key={`album-${album.id}`}>
            <h1>{album.title}</h1>
            <ul>
              { album.tracks && album.tracks.map(track => 
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
