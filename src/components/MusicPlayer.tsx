import swal from 'sweetalert'
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
import AlbumList from './AlbumList'
import TrackList from './TrackList'
import ButtonGroup from './ButtonGroup'
import Placeholder from './Placeholder'
import TrackListItem from './TrackListItem'
import TrackListTitle from './TrackListTitle'

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
    selectedTrackId: 0,
    selectedAlbumId: 0,
    showAddAlbumModal: false,
    showAddTrackModal: false,
    showEditAlbumModal: false,
    showEditTrackModal: false,
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
   * Scroll to the bottom of the page.
   * 
   * @return {void} 
   */
  public scrollToBottom = () => window.scroll({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' })

  /**
   * Close all modals when pressing the esc key
   * 
   * @param  {object} e 
   * @return {void}   
   */
  public closeModalKeypress(e) {
    if (e.keyCode === 27) {
      this.closeAllModals()
    }
  }  

  /**
   * Close all the modals.
   * 
   * @return {void} 
   */
  public closeAllModals = () => {
      this.setState({
        showAddAlbumModal: false,
        showAddTrackModal: false,
        showEditAlbumModal: false,
        showEditTrackModal: false,
      })
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
   * @param  {number} id
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
   * @param  {number} id
   * @return {void} 
   */
  public toggleAddTrackModal = (id) => {
    this.setState({ 
      selectedAlbumId: id,
      showAddTrackModal: !this.state.showAddTrackModal, 
    })
  }

  /**
   * Show/Hide the modal.
   *
   * @param  {number} id
   * @param  {number} albumId  
   * @return {void} 
   */
  public toggleEditTrackModal = (id, albumId) => {
    this.setState({ 
      selectedTrackId: id,
      selectedAlbumId: albumId,
      showEditTrackModal: !this.state.showEditTrackModal 
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

    const form = e.target

    Album.store({
      title: form.title.value
    }).then(album => {
      form.reset()
      this.props.reloadAlbums()
      this.toggleAddAlbumModal()
      this.scrollToBottom()
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
    
    const form = e.target

    Album.update({
      id: this.state.selectedAlbumId,
      title: form.title.value
    }).then(album => {
      form.reset()
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
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this album?',
      icon: 'warning',
      buttons: [true, true],
    })
    .then(confirm => {
      if (confirm) {
        Album.destroy({ id }).then(response => {
          this.props.setAlbumState(this.props.albums.filter(album => album.id !== id))
        })
      }
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

    const form = e.target

    Track.store({
      albumId: this.state.selectedAlbumId,  
      title: form.title.value,
      length: form.length.value,
    }).then(track => {
      form.reset()
      this.props.reloadAlbums()
      this.toggleAddTrackModal(0)
    })
  }

  /**
   * Edit an existing track.
   * 
   * @param  {object} e 
   * @return {void}   
   */
  public editTrack = e => {
    e.preventDefault()

    const form = e.target

    Track.update({
      id: this.state.selectedTrackId,
      albumId: this.state.selectedAlbumId,  
      title: form.title.value,
      length: form.length.value,
    }).then(track => {
      form.reset()
      this.props.reloadAlbums()
      this.toggleEditTrackModal(0,0)
    })
  }  

  /**
   * Delete a track.
   *
   * @param  {object} albumId, id
   * @return {void}   
   */
  public deleteTrack = ({ albumId, id }) => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to delete this track?',
      icon: 'warning',
      buttons: [true, true],
    })
    .then(confirm => {
      if (confirm) {
        Track.destroy({ albumId, id }).then(response => {
          this.props.reloadAlbums()
        })
      }
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
          <AlbumList key={`album-${album.id}`}>
            <Title>{album.title}</Title>
            <ButtonGroup>
              <Button rounded={true} onClick={() => this.deleteAlbum(album.id)} className="mr-2">Delete Album</Button>
              <Button rounded={true} onClick={() => this.toggleEditAlbumModal(album.id)} className="mr-2">Edit Album</Button>
              <Button rounded={true} onClick={() => this.toggleAddTrackModal(album.id)}>Add Track</Button>
            </ButtonGroup>
            <TrackList 
              className="mb-4"
              tracks={album.tracks}
              render={track => (
                <TrackListItem key={`track-${track.id}`}>
                  <TrackListTitle className="mr-a">
                    {track.title}
                  </TrackListTitle>
                  <div className="mr-4">
                    {this.formatTrackLength(track.length)} 
                  </div>
                  <div>
                    <Button onClick={() => this.toggleEditTrackModal(track.id, album.id)} className="mr-2">
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button onClick={() => this.deleteTrack({ albumId: album.id, id: track.id })}>
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </div>
                </TrackListItem>
              )}
            />
          </AlbumList>
        ) : <Placeholder/>}

        <Modal show={this.state.showAddAlbumModal}>
          <form onSubmit={this.addAlbum}>
            <label htmlFor="add-album-title">Album Title</label>
            <input name="title" id="album-title" className="mb-4" required={true}/>
            <button type="button" className="mr-4" onClick={this.closeAllModals}>Cancel</button>
            <button>Submit</button>
          </form>
        </Modal>

        <Modal show={this.state.showEditAlbumModal}>
          <form onSubmit={this.editAlbum}>
            <label htmlFor="edit-album-title">Album Title</label>
            <input name="title" id="edit-album-title" className="mb-4" required={true}/>
            <button type="button" className="mr-4" onClick={this.closeAllModals}>Cancel</button>
            <button>Submit</button>
          </form>
        </Modal>

        <Modal show={this.state.showAddTrackModal}>
          <form onSubmit={this.addTrack}>
            <label htmlFor="add-track-title">Track Title</label>
            <input name="title" id="add-track-title" className="mb-4" required={true}/>
            <label htmlFor="add-track-length">Track Length (in seconds)</label>
            <input name="length" id="add-track-length" className="mb-4" type="number" required={true}/>
            <button type="button" className="mr-4" onClick={this.closeAllModals}>Cancel</button>
            <button>Submit</button>
          </form>
        </Modal>

        <Modal show={this.state.showEditTrackModal}>
          <form onSubmit={this.editTrack}>
            <label htmlFor="edit-track-title">Track Title</label>
            <input name="title" id="edit-track-title" className="mb-4" required={true}/>
            <label htmlFor="edit-track-length">Track Length (in seconds)</label>
            <input name="length" id="edit-track-length" className="mb-4" type="number" required={true}/>
            <button type="button" className="mr-4" onClick={this.closeAllModals}>Cancel</button>
            <button>Submit</button>
          </form>
        </Modal>        

      </Fragment>
    );
  }
}
