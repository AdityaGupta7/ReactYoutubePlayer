import _ from 'lodash'; //a library to throttle search term input
import React, { Component } from 'react';
import { youtube_api } from './keys';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'; //YTSearch is a function
const API_KEY = youtube_api;
import SearchBar from './components/search_bar';//from our current directory (src), go to components directory
//and get SearchBar from search_bar.js
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

//Writing component that creates HTML
/*const App = () => {//This is a functional component
  return(
    <div>
      <SearchBar />
    </div>
  );
}*/
class App extends Component{//Class based component
  //Again, everytime user searches some new thing, state is changing...
  constructor(props){//default video search for 'surfboards' is always called
    super(props);

    this.state= {
      videos: [],
      selectedVideo: null
     };
     this.videoSearch('surfboards');
   }
    //a function a that searches: (takes some milliseconds to search the web)
    videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {// {configuration}, function
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      })
    });
   }

  //videos is a prop that we are passing from parent to child component
  //The React quickly loads the render function even when YTSearch has not yet finished searching.. so we have to
  //do some loading in video_detail
  render(){
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)//now videoSearch function can only be called
    //once every 300ms. SearchBar can call props.onSearchTermChange any number of times without crashing,
    //but searches will only get updated once every 300ms
    return(
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoList
          onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
        <VideoDetail video={this.state.selectedVideo}/>

      </div>
    );//onVideoSelect is equal to a function that takes a video and updates the state of the selectedVideo
  }
}
//example: App is very top level (parent), SearchBar is its child
//Putting it into the DOM
ReactDOM.render(<App />, document.querySelector('.container'));
//downwards data flow. top level component should be resposible for fetching data. be it from an api or redux, etc
//search_bar, video_detail, etc are children of the App component.
