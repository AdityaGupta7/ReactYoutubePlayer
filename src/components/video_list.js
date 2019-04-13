import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) => {//we write class="" in html as className="" because there will be keyword
//conflict. col-md-4, etc are loaded from bootstrap link provided in index.html of 'src' (main)
  const videoItems = props.videos.map((video) => {
    return(//etag in api response of youtube is unique for all videos
      <VideoListItem
        onVideoSelect = {props.onVideoSelect}
        key ={video.etag}
        video={video} />
    );
  })
  return(

    <ul className="col-md-4 list-group">
      {videoItems}
    </ul>
  );
}

export default VideoList;
