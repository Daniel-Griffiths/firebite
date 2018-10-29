import TrackInterface from './TrackInterface'

export default interface AlbumInterface {
  id: number,
  title: string,
  tracks?: TrackInterface[]
}