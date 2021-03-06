# FireBite

An api driven music manager written in React. This was made for my code test at https://intech.ventures/ 😎

![App Image](screenshot.png)

# Usage 

Rename `.env.example` to `.env` and enter the relevant api details

Then install all the dependencies and run the app

`yarn install && yarn start`


# API

### Albums

See `models/Album` class for full documentation

```javascript

Album.index().then(albums => {
  console.log(albums)
});

Album.store({
  title: 'Hello World'
}).then(album => {
  console.log(album)
});

Album.show({
  id: 13,
}).then(album => {
  console.log(album)
});

Album.update({
  id: 13,
  title: 'Hello World Updated',
}).then(album => {
  console.log(album)
});

Album.destroy({  
  id: 13,
}).then(response => {
  console.log(response)
});
```

### Tracks

See `models/Tracks` class for full documentation

```javascript

Track.index({ 
  albumId: 7,
}).then(tracks => {
  console.log(tracks)
});

Track.store({
  albumId: 7,   
  title: 'Hello World',
  length: 42,
}).then(track => {
  console.log(track)
});

Track.show({
  albumId: 7,
  id: 39,
}).then(track => {
  console.log(track)
});

Track.update({
  id: 39,
  albumId: 7,
  length: 100,
  title: 'Hello World Updated',
}).then(track => {
  console.log(track)
});

Track.destroy({ 
  id: 39,
  albumId: 7, 
}).then(response => {
  console.log(response)
});
```
