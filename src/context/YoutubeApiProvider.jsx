import Youtube from '../api/youtube';
import YoutubeClient from '../api/youtubeClient';
import { YoutubeApiContext } from './YoutubeApiContext';

// 만약 테스트 코드 작성중 axios관련 에러가 발생하면 context부분과 provider부분을 분리하면 해결됨
const client = new YoutubeClient();
const youtube = new Youtube(client);

export default function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}
