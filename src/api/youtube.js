export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  search(query) {
    return query ? this.#searchByQuery(query) : this.#hotTrend();
  }

  async channelImgURL(id) {
    const response = await this.apiClient.channels({
      params: {
        part: 'snippet',
        id,
      },
    });

    return response.data.items[0].snippet.thumbnails.default.url;
  }

  async relatedVideos(id) {
    const response = await this.apiClient.search({
      params: {
        part: 'snippet',
        maxResults: 25,
        type: 'video',
        relatedToVideoId: id,
      },
    });

    return response.data.items.map((item) => ({
      ...item,
      id: item.id.videoId,
    }));
  }

  async #searchByQuery(query) {
    const response = await this.apiClient.search({
      params: {
        part: 'snippet',
        maxResults: 25,
        q: query,
      },
    });

    return response.data.items.map((item) => ({
      ...item,
      id: item.id.videoId,
    }));
  }

  async #hotTrend() {
    const response = await this.apiClient.videos({
      params: {
        part: 'snippet',
        maxResults: 25,
        chart: 'mostPopular',
      },
    });

    return response.data.items;
  }
}
