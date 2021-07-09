import React from 'react';
import Window from './Window';
import YouTube from 'react-youtube';
import Marquee from "react-fast-marquee";
import { IoMdSkipBackward, IoMdSkipForward, IoIosMusicalNotes } from 'react-icons/io';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { RiExternalLinkLine } from 'react-icons/ri';

//Without compassion, suffering can be intolerable.
//With acceptance, the world becomes electric;
//This direct experience of feeling -
//it is something you live for yourself.

const VIDEO_PLAYLIST = [
  //Introduction - deliberately cut off at start.
  { id: "k1BneeJTDcU", name: "Welcome to the Internet", artist: "Bo Burnham"},
  //Bass drop - the joy of getting lost in the flow of pixels.
  { id: "-lSXMvF0wsk", name: "Do It", artist: "Rootkit, Terlia, Shia LaBeouf"},
  //An awesome music video, vibes well
  { id: "hX0T9JCYJMg", name: "Working for Google", artist: "Hey Geronimo" },
  //Introducing internet addiction
  { id: "bOjVPS7plJU", name: "Extremely Online", artist: "MC Frontalot" },

  // Dreaming for societies ideals, pithy. Sadly a bit too subtle / sarcastic?
  //{ id: "8j0SwWiLUGo", name: "Disconnected", artist: "Aceyalone" },

  // A nice early stab at societies expectations.
  { id: "irfXSw55DUo", name: "Modern Gas", artist: "LOOK MUM NO COMPUTER"},
  // Disillusionment with acceptance, as the drug is worthwhile.
  { id: "kUDDuTTeK0Q", name: "Back and Forth", artist: "CRX" },
  // Total societial disillusionment & meta disillusionment.
  { id: "OVwGnJ8Jd5w", name: "Fake", artist: "That Handsome Devil" },
  

  //Being overwhelmed by content 
  { id: "U8W3Qx7ilyg", name: "DDoS", artist: "MC Frontalot, Quelle Chris"},
  //Entering the numb space, "trying to find the difference"
  { id: "T3usOhr_gWY", name: "Content", artist: "Joywave" },
  //And ultimately becoming a part of the electric
  { id: "Irp0uwdsM3Y", name: "Not Human", artist: "Elegant Slims" },

  //Nothing Worth Loving Isn't Askew - Lemon Demon
  //https://www.youtube.com/watch?v=FEfJiD0uEdQ

  //Internet addiction anonymous discourse - a bit too heavy handed.
  //{ id: "MYFzc8sMKSk", name: "SCREENS", artist: "Super Smack, Schaffer the Darklord, LEX The Lexicon Artist, Kadesh Flow"},

  //Choosing to be overwhelmed and wanting the opposite.
  //{ id: "rZgeF5SrCAg", name: "Zen", artist: "X Ambassadors, K.Flay, grandson" },
  
  //Good music video, but more about internet hate and anger than I'm interested.
  //{ id: "m7QEWz-72bw", name: "Internet Sucks", artist: "MC Frontalot" },
  
  
  
];

//boIGbJHf1O8 - Katamari on the Rocks by Dj Jo, GameChops

//If you're thinking more Zen, consider the following...
//{ id: "cclQ3tlcqps", name: "Makeshift Kingdom", artist: "Sweatshop Union" },
//Sir Kn8 - Word - https://www.youtube.com/watch?v=mGyDFNqq90Y - I got the 2nd ever YouTube view on this

//AiSK5Lg-ijg - Adam Tell - Foreground
//aqkvWE42KMY - Lemon Demon - This Hyper World
//{ id: "wBzqOa9y02I", name: "The World Is Saved", artist: "Danny Wiessner" },
// IfKsvWJQb4U
//Credits
// Thank you
//{ id: "4EFVuYbx3y0", name: "Comix Zone (Turn The Page)", artist: "Creative Mind Frame, K-Murdock, Soultron"}

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
          event.target.getCurrentTime() > 44.0 && event.target.getCurrentTime() < 45) 
      {
        bassDrop = true;
        this.props.setVisualEffect("starWall", true);
        this.props.setVisualEffect("cameraPosition", 1);

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
        this.props.setVisualEffect("cameraPosition", 1);
        this.props.setVisualEffect("starSpeed", 1.5);

        setTimeout(() => {
          this.props.setVisualEffect("cameraPosition", 0);

          setTimeout(() => {
            this.props.setVisualEffect("starWall", false);
            bassDrop = false;
          }, 22000);

        }, 22000);
      }

    }, 250);

  }

  onPause(event){
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
      dismissal: "OK then...",
    });

  }

  render(){
    const opts = {
      height: '169',
      width: '300',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        fs: 0, //disable fullscreen button from showing.
        modestbranding: 1,
        origin: window.location.origin,
      },
    };

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
      default:
    }
    
    return (
      <Window level={this.props.level} windowClass={classes} windowTitle="Music Player" notMinimisable windowClose={this.attemptToClose}>
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

            <div className="jukebox__skip-song-button jukebox__previous-song-button"
                 onClick={this.playPreviousSong}>
              <IoMdSkipBackward />
              </div>
            <div className="jukebox__skip-song-button jukebox__next-song-button"
                 onClick={this.playNextSong}>
              <IoMdSkipForward />
            </div>

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