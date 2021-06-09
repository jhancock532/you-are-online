import React from 'react';
import Window from './Window';
import YouTube from 'react-youtube';
import Marquee from "react-fast-marquee";
import { IoMdSkipBackward, IoMdSkipForward, IoIosMusicalNotes } from 'react-icons/io';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { RiExternalLinkLine } from 'react-icons/ri';

const VIDEO_PLAYLIST = [
  { id: "k1BneeJTDcU", name: "Welcome to the Internet", artist: "Bo Burnham"},
  { id: "hX0T9JCYJMg", name: "Working for Google", artist: "Hey Geronimo" },
  { id: "T3usOhr_gWY", name: "Content", artist: "Joywave" },
  { id: "bOjVPS7plJU", name: "Extremely Online", artist: "MC Frontalot" },
  { id: "m7QEWz-72bw", name: "Internet Sucks", artist: "MC Frontalot" },
  { id: "Irp0uwdsM3Y", name: "Not Human", artist: "Elegant Slims" },
  { id: "rZgeF5SrCAg", name: "Zen", artist: "X Ambassadors, K.Flay, grandson" },
  { id: "cclQ3tlcqps", name: "Makeshift Kingdom", artist: "Sweatshop Union" },
];

const PlaylistItem = props => (
  <div className="jukebox__playlist-item">
    { props.nowPlaying ? 
      <div className="jukebox__playlist-item--now-playing-icon"><IoIosMusicalNotes /></div>
      : <></>
    }
    <div className="jukebox__playlist-item--song-name">
      <a href={"https://www.youtube.com/watch?v="+props.id} rel="noreferrer" target="_blank">{props.name}<RiExternalLinkLine /></a>
    </div>
    <div className="jukebox__playlist-item--song-artist">{props.artist}</div>
  </div>
)

class JukeBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = { 
      playlistDisplayed: false,
      playlistIndex: 0,
      videoPlayingId: "k1BneeJTDcU"
    };

    this.togglePlaylistDisplay = this.togglePlaylistDisplay.bind(this);
    this.playNextSong = this.playNextSong.bind(this);
    this.playPreviousSong = this.playPreviousSong.bind(this);
    this.attemptToClose = this.attemptToClose.bind(this);

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
      title: `Nope.`,
      message: "I'm sorry, you can't do that.",
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

    return (
      <Window windowClass="jukebox" windowTitle="Music Player" exitButton={true} windowClose={this.attemptToClose}>
        <div className="jukebox__container">
          <YouTube videoId={this.state.videoPlayingId} opts={opts} onReady={this._onReady} />
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

        </div>
      </Window>
    );
  }
}

export default JukeBox;