import axios from 'axios';

export default class YoutubeClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3',
      params: { key: import.meta.env.VITE_YOUTUBE_API_KEY },
    });
  }

  search(params) {
    return this.httpClient.get('search', params);
  }

  videos(params) {
    return this.httpClient.get('videos', params);
  }

  channels(params) {
    return this.httpClient.get('channels', params);
  }
}
