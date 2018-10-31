import React, { Component, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'

/**
 * Components
 */
import Nav from './Nav'
import Logo from './Logo'
import Modal from './Modal'
import Title from './Title'
import Button from './Button'
import TrackList from './TrackList'
import Placeholder from './Placeholder'
import TrackListItem from './TrackListItem'

/**
 * Models
 */
import { Album, Track } from './../models'

/**
 * Interfaces
 */
import { AlbumInterface } from './../interfaces'

interface Props {
  albums?: AlbumInterface[],
  setAlbumState: any,
  reloadAlbums: any
}

export default class HomeContainer extends Component<Props> {

  public state = {
    selectedAlbumId: 0,
    showAddAlbumModal: false,
    showAddTrackModal: false,
    showEditAlbumModal: false,
  }

  constructor(props) {
    super(props)
    this.closeModalKeypress = this.closeModalKeypress.bind(this)
  }  

  /**
   * Mount the component.
   * 
   * @return {void} 
   */
  public componentDidMount() {
    document.addEventListener('keydown', this.closeModalKeypress, false)
  }

  /**
   * Unmount the component.
   * 
   * @return {void} 
   */
  public componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModalKeypress, false)
  }  

  /**
   * Close all modals when pressing the esc key
   * 
   * @param  {object} e 
   * @return {void}   
   */
  public closeModalKeypress(e) {
    if (e.keyCode === 27) {
      this.setState({
        showAddAlbumModal: false,
        showAddTrackModal: false,
        showEditAlbumModal: false,
      })
    }
  }  

  /**
   * Show/Hide the modal.
   * 
   * @return {void} 
   */
  public toggleAddAlbumModal = () => this.setState({ showAddAlbumModal: !this.state.showAddAlbumModal })

  /**
   * Show/Hide the modal.
   * 
   * @return {void} 
   */
  public toggleEditAlbumModal = (id) => {
    this.setState({ 
      selectedAlbumId: id,
      showEditAlbumModal: !this.state.showEditAlbumModal 
    })
  }

  /**
   * Show/Hide the modal.
   * 
   * @return {void} 
   */
  public toggleAddTrackModal = (id) => {
    this.setState({ 
      selectedAlbumId: id,
      showAddTrackModal: !this.state.showAddTrackModal, 
    })
  }

  /**
   * Add a new album.
   * 
   * @param  {object} e 
   * @return {void}   
   */
  public addAlbum = (e) => {
    e.preventDefault()

    Album.store({
      title: e.target.title.value
    }).then(album => {
      this.props.reloadAlbums()
      this.toggleAddAlbumModal()
    })
  }

  /**
   * Edit an existing album.
   *
   * @param  {object} e 
   * @return {void}   
   */
  public editAlbum = (e) => {
    e.preventDefault()

    Album.update({
      id: this.state.selectedAlbumId,
      title: e.target.title.value
    }).then(album => {
      this.props.reloadAlbums()
      this.toggleEditAlbumModal(0)
    })
  }

  /**
   * Delete a album.
   * 
   * @param  {number} id 
   * @return {void}   
   */
  public deleteAlbum = (id) => {
    Album.destroy({ id }).then(response => {
      this.props.setAlbumState(this.props.albums.filter(album => album.id !== id))
    })
  }

  /**
   * Add a new track.
   * 
   * @param  {object} e 
   * @return {void}   
   */
  public addTrack = e => {
    e.preventDefault()

    Track.store({
      albumId: this.state.selectedAlbumId,  
      title: e.target.title.value,
      length: e.target.length.value,
    }).then(track => {
      this.props.reloadAlbums()
      this.toggleAddTrackModal(0)
    })
  }

  /**
   * Delete a track.
   *
   * @param  {number} albumId 
   * @param  {number} id 
   * @return {void}   
   */
  public deleteTrack = ({ albumId, id }) => {
    Track.destroy({ albumId, id }).then(response => {
      this.props.reloadAlbums()
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
        <Nav>
          <Logo className="mr-a"/>
          <Button rounded={true} onClick={this.toggleAddAlbumModal}>Add Album</Button>
        </Nav>
        { albums && albums.length ? albums.map(album => 
          <Fragment key={`album-${album.id}`}>
            <Title>{album.title}</Title>
            <Button rounded={true} onClick={() => this.deleteAlbum(album.id)} className="mr-2">Delete Album</Button>
            <Button rounded={true} onClick={() => this.toggleEditAlbumModal(album.id)} className="mr-2">Edit Album</Button>
            <Button rounded={true} onClick={() => this.toggleAddTrackModal(album.id)}>Add Track</Button>
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
                    <Button onClick={() => null} className="ml-2 mr-2">
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button onClick={() => this.deleteTrack({ albumId: album.id, id: track.id })}>
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </div>
                </TrackListItem>
              )}
            />
          </Fragment>
        ) :<Placeholder/>}

        <Modal show={this.state.showAddAlbumModal}>
          <form onSubmit={this.addAlbum}>
            <label htmlFor="album-title">Album Title</label>
            <input name="title" id="album-title" className="mb-4" required={true}/>
            <button type="button" className="mr-4" onClick={this.toggleAddAlbumModal}>Cancel</button>
            <button>Submit</button>
          </form>
        </Modal>

        <Modal show={this.state.showEditAlbumModal}>
          <form onSubmit={this.editAlbum}>
            <label htmlFor="album-title">Album Title</label>
            <input name="title" id="album-title" className="mb-4" required={true}/>
            <button type="button" className="mr-4" onClick={this.toggleEditAlbumModal}>Cancel</button>
            <button>Submit</button>
          </form>
        </Modal>

        <Modal show={this.state.showAddTrackModal}>
          <form onSubmit={this.addTrack}>
            <label htmlFor="track-title">Track Title</label>
            <input name="title" id="track-title" className="mb-4" required={true}/>
            <label htmlFor="track-length">Track Length (in seconds)</label>
            <input name="length" id="track-length" className="mb-4" type="number" required={true}/>
            <button type="button" className="mr-4" onClick={this.toggleAddTrackModal}>Cancel</button>
            <button>Submit</button>
          </form>
        </Modal>

      </Fragment>
    );
  }
}
