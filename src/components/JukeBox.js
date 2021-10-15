import React from 'react';
import Window from './Window';
import YouTube from 'react-youtube';
import Marquee from "react-fast-marquee";
import { IoMdSkipBackward, IoMdSkipForward, IoIosMusicalNotes } from 'react-icons/io';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { RiExternalLinkLine } from 'react-icons/ri';

const VIDEO_PLAYLIST = [
  //Introduction - deliberately cut off at start.
  { id: "k1BneeJTDcU", name: "Welcome to the Internet", artist: "Bo Burnham"},
  { id: "-lSXMvF0wsk", name: "Do It", artist: "Rootkit, Terlia, Shia LaBeouf"},
  { id: "hX0T9JCYJMg", name: "Working for Google", artist: "Hey Geronimo" },
  { id: "irfXSw55DUo", name: "Modern Gas", artist: "LOOK MUM NO COMPUTER"},
  { id: "bOjVPS7plJU", name: "Extremely Online", artist: "MC Frontalot" },
  { id: "Irp0uwdsM3Y", name: "Not Human", artist: "Elegant Slims" },
  { id: "T3usOhr_gWY", name: "Content", artist: "Joywave" },
  { id: "OVwGnJ8Jd5w", name: "Fake", artist: "That Handsome Devil" },
  { id: "IWwUfaW-bPg", name: "You Are Not Alone", artist: "Kashuks" }
];

function PlaylistItem(props) {

  let classes = "jukebox__playlist-item";

  if (props.nowPlaying) {
    classes += " jukebox__playlist-item-selected";
  }

  return (
    <div className={classes}>
      { props.nowPlaying ? 
        <div className="jukebox__playlist-item--now-playing-icon"><IoIosMusicalNotes /></div>
        : <></>
      }
      <div className="jukebox__playlist-item--song-name">
        <a href={"https://www.youtube.com/watch?v="+props.id} rel="noreferrer" target="_blank">{props.name}<RiExternalLinkLine /></a>
      </div>
      <div className="jukebox__playlist-item--song-artist">{props.artist}</div>
    </div> 
  );
}

class JukeBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      startedPlaying: false,
      playlistDisplayed: false,
      playlistIndex: 0,
      videoPlayingId: "k1BneeJTDcU"
    };

    this.togglePlaylistDisplay = this.togglePlaylistDisplay.bind(this);
    this.playNextSong = this.playNextSong.bind(this);
    this.playPreviousSong = this.playPreviousSong.bind(this);
    this.attemptToClose = this.attemptToClose.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onStartedPlaying = this.onStartedPlaying.bind(this);
  }

  onPlayerReady(event){
    // access to player in all event handlers via event.target
    event.target.playVideo();
    let welcomed = false;
    let bassDrop = false;

    setInterval(() => {

      if (welcomed === false && event.target.getCurrentTime() > 2.9 && this.state.playlistIndex === 0){
        welcomed = true;
        this.playNextSong();
      }

      if (bassDrop === false && this.state.playlistIndex === 1 && 
          event.target.getCurrentTime() > 44.5 && event.target.getCurrentTime() < 45.5) 
      {
        bassDrop = true;
        this.props.setVisualEffect("starWall", true);
        this.props.setVisualEffect("cameraPosition", 3);

        setTimeout(() => {
          this.props.setVisualEffect("cameraPosition", 0);

          setTimeout(() => {
            this.props.setVisualEffect("starWall", false);
            bassDrop = false;
          }, 22000);
          
        }, 22000);
      }

      if (bassDrop === false && this.state.playlistIndex === 1 && 
          event.target.getCurrentTime() > 132.0 && event.target.getCurrentTime() < 133) 
      {
        bassDrop = true;
        this.props.setVisualEffect("starWall", true);
        this.props.setVisualEffect("cameraPosition", 3);
        this.props.setVisualEffect("starSpeed", 1.5);

        setTimeout(() => {
          this.props.setVisualEffect("cameraPosition", 0);

          setTimeout(() => {
            this.props.setVisualEffect("starWall", false);
            bassDrop = false;
          }, 22000);

        }, 22000);
      }

      if (this.state.playlistIndex === 5 && //make walls black
        event.target.getCurrentTime() > 26.0 && event.target.getCurrentTime() < 27) {
        this.props.setVisualEffect("dehumanLevel", 1);
      }

      if (this.state.playlistIndex === 5 && //hide posters
        event.target.getCurrentTime() > 44.0 && event.target.getCurrentTime() < 45) {
        this.props.setVisualEffect("dehumanLevel", 2);
      }

      if (this.state.playlistIndex === 5 && //electric blue 
        event.target.getCurrentTime() > 62.0 && event.target.getCurrentTime() < 63) {
        this.props.setVisualEffect("dehumanLevel", 3);
      }

      
      if (this.state.playlistIndex === 5 && //hide head
        event.target.getCurrentTime() > 96.0 && event.target.getCurrentTime() < 97) {
        this.props.setVisualEffect("dehumanLevel", 4);
      }

      if (this.state.playlistIndex === 5 && //not human (chorus)
        event.target.getCurrentTime() > 107.0 && event.target.getCurrentTime() < 108) {
        this.props.setVisualEffect("dehumanLevel", 5);
      }

      if (this.state.playlistIndex === 5 && //not human (chorus)
        event.target.getCurrentTime() > 164.0 && event.target.getCurrentTime() < 165) {
        this.props.setVisualEffect("dehumanLevel", 6);
      }

      if (this.state.playlistIndex === 5 && //not human (chorus)
        event.target.getCurrentTime() > 175.5 && event.target.getCurrentTime() < 176) {
        this.props.setVisualEffect("dehumanLevel", 7);
      }

    }, 250);

  }

  componentDidUpdate(prevProps) {

    if (prevProps.level !== this.props.level) {

      if (this.props.level === 3){
        this.setState({
          playlistIndex: 5,
          videoPlayingId: VIDEO_PLAYLIST[5].id,
        });
      }

      if (this.props.level === 4){
        this.setState({
          playlistIndex: 8,
          videoPlayingId: VIDEO_PLAYLIST[8].id,
        });
      }

    }
  
  }

  onPause(event){
    //Makes the music un-pausable
    //Apologies, this is part of the artwork
    event.target.playVideo();
  }

  onStartedPlaying(){

    if (this.state.startedPlaying === false){
      this.setState({
        startedPlaying: true,
      });
    }

  }

  playNextSong(){
    this.setState( state => ({
      playlistIndex: (state.playlistIndex + 1) % VIDEO_PLAYLIST.length,
      videoPlayingId: VIDEO_PLAYLIST[(state.playlistIndex + 1) % VIDEO_PLAYLIST.length].id
    }))
  }

  playPreviousSong(){
    this.setState( state => ({
      playlistIndex: (state.playlistIndex + VIDEO_PLAYLIST.length - 1) % VIDEO_PLAYLIST.length,
      videoPlayingId: VIDEO_PLAYLIST[(state.playlistIndex + VIDEO_PLAYLIST.length - 1) % VIDEO_PLAYLIST.length].id
    }))
  }

  togglePlaylistDisplay() {

    if (this.state.playlistDisplayed) {
      this.setState({ playlistDisplayed: false });
    } else {
      this.setState({ playlistDisplayed: true });
    }

  }

  attemptToClose() {

    this.props.callAlert({
      title: `Alert!`,
      message: "Don't stop the music!",
      dismissal: "Pardon?",
    });

  }

  render(){
    let opts = {
      height: '169',
      width: '300',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        fs: 0, //disable fullscreen button from showing.
        modestbranding: 1,
        controls: 1,
        origin: window.location.origin,
      },
    };

    if (this.props.level === 4){
      opts = {
        height: '500',
        width: '800',
        playerVars: {
          autoplay: 1,
          fs: 0,
          modestbranding: 1,
          origin: window.location.origin,
        },
      };
    }

    const playlistItems = VIDEO_PLAYLIST.map((song, index) => 
      <PlaylistItem 
        key={song.id} 
        id={song.id} 
        name={song.name} 
        artist={song.artist}
        nowPlaying={ (index === this.state.playlistIndex ) ? true : false}
      />
    );

    const playlistShowMessage = this.state.playlistDisplayed 
      ? <>Hide Playlist<AiFillCaretUp className="jukebox__view-playlist-toggle-icon"/></>
      : <>View Playlist<AiFillCaretDown className="jukebox__view-playlist-toggle-icon"/></>

    let classes = "jukebox ";

    switch (this.props.level) {
      case 1:
        classes += "jukebox--light ";
        break;
      case 2:
        classes += "jukebox--dark ";
        break;
      case 3:
        classes += "jukebox--glitch ";
        break;
      case 4:
        classes += "jukebox--end ";
        break;
      default:
    }

    let windowTitle = "Music Player";
    if (this.props.level === 2) windowTitle = "Sound Machine";
    if (this.props.level === 3) windowTitle = "Noise-Box.exe";
    
    return (
      <Window level={this.props.level} windowClass={classes} windowTitle={windowTitle} notMinimisable windowClose={this.attemptToClose}>
        <div className="jukebox__container">
          { this.state.startedPlaying ? null :
            <div className="jukebox__click-prompt">
              <h3 className="jukebox__click-prompt-message">CLICK HERE!</h3>
            </div> }

          <YouTube 
            videoId={this.state.videoPlayingId} 
            opts={opts} onEnd={this.playNextSong} 
            onReady={this.onPlayerReady}
            onPlay={this.onStartedPlaying}
            onPause={this.onPause}
          />

          { this.state.startedPlaying ? <>
          <Marquee gradient={false}>
            <p className="jukebox__song-marquee">
              Now Playing: <span className="jukebox__emphasis">
                {VIDEO_PLAYLIST[this.state.playlistIndex].name}
              </span> by <span className="jukebox__emphasis">
              {VIDEO_PLAYLIST[this.state.playlistIndex].artist}
              </span>
            </p>
          </Marquee>
          
          <div className="jukebox__controls">

            { (this.state.playlistIndex !== 0 && this.state.playlistIndex !== 5) ? 
            <div className="jukebox__skip-song-button jukebox__previous-song-button"
                 onClick={this.playPreviousSong}>
              <IoMdSkipBackward />
              </div> : null}
            { (this.state.playlistIndex !== 0 && this.state.playlistIndex !== 5) ? 
            <div className="jukebox__skip-song-button jukebox__next-song-button"
                 onClick={this.playNextSong}>
              <IoMdSkipForward />
            </div> : null}

            <div className="jukebox__view-playlist-button" onClick={this.togglePlaylistDisplay}>
              {playlistShowMessage}
            </div>
          </div>
          <div className={ this.state.playlistDisplayed ? "jukebox__playlist" : "jukebox__playlist--hidden" }>
            {playlistItems}
          </div>
          </> : null }

        </div>
      </Window>
    );
  }
}

export default JukeBox;