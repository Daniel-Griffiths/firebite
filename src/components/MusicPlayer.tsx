import React, { Component, Fragment } from 'react'

/**
 * Components
 */
import Title from './Title'
import Modal from './Modal'
import Button from './Button'
import TrackList from './TrackList'
import TrackListItem from './TrackListItem'

/**
 * Models
 */
import { Album } from './../models'

/**
 * Interfaces
 */
import { AlbumInterface } from './../interfaces'

interface Props {
  albums?: AlbumInterface[],
  setAlbumState: any
}

export default class HomeContainer extends Component<Props> {

  public state = {
    showAlbumModal: false
  }

  /**
   * Show/Hide the modal.
   * 
   * @return {void} 
   */
  public toggleAlbumModal = () => {
    this.setState({ showAlbumModal: !this.state.showAlbumModal })
  }

  /**
   * Add a new album.
   * 
   * @param  {object} e 
   * @return {void}   
   */
  public addAlbum = e => {
    e.preventDefault()

    Album.store({
      title: e.target.title.value
    }).then(album => {
      const albums = this.props.albums
      albums.push(album)
      this.props.setAlbumState(albums)
      this.toggleAlbumModal()
    })
  }

  /**
   * Add a new album.
   * 
   * @param  {number} id 
   * @return {void}   
   */
  public deleteAlbum = id => {
    Album.destroy({ id }).then(response => {
      this.props.setAlbumState(this.props.albums.filter(album => album.id !== id))
    })
  }

  /**
   * Convert the track length from seconds and
   * add a little formatting to spice things up.
   * 
   * @param  {number} seconds 
   * @return {number}        
   */
  public formatTrackLength = (seconds) => {
    return (seconds / 60).toFixed(2).replace('.',':');
  }

  /**
   * Render the component
   *
   * @return {jsx}
   */
  public render() {

    const { albums } = this.props

    return (
      <Fragment>
        <Button onClick={this.toggleAlbumModal}>Add Album</Button>
        { albums && albums.map(album => 
          <Fragment key={`album-${album.id}`}>
            <Title>{album.title}</Title>
            <Button onClick={() => this.deleteAlbum(album.id)} className="mr-2">Delete Album</Button>
            <Button onClick={() => null} className="mr-2">Edit Album</Button>
            <Button onClick={() => null}>Add Track</Button>
            <TrackList 
              tracks={album.tracks}
              render={track => (
                <TrackListItem key={`track-${track.id}`}>
                  <div className="mr-a">
                    {track.title}
                  </div>
                  <div>
                    {this.formatTrackLength(track.length)} 
                  </div>
                  <div>
                    <Button onClick={() => null} className="ml-2 mr-2">Edit Track</Button>
                    <Button onClick={() => null}>Delete Track</Button>
                  </div>
                </TrackListItem>
              )}
            />
          </Fragment>
        )}
        <Modal show={this.state.showAlbumModal}>
          <form onSubmit={this.addAlbum}>
            <input name="title" placeholder="Album Title"/>
            <button>Submit</button>
          </form>
        </Modal>
      </Fragment>
    );
  }
}
