import axios from 'axios';

export default class FakeYoutubeClient {
  search({ params }) {
    if (params.relatedToVideoId) return axios.get('/data/related.json');

    return axios.get('/data/search.json');
  }

  videos() {
    return axios.get('/data/hotTrend.json');
  }

  channels() {
    return axios.get('/data/channel.json');
  }
}
