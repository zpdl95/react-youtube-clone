import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Root, Videos, Watch, NotFound } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} errorElement={<NotFound />}>
      <Route index element={<Videos />} />
      <Route path='videos' element={<Videos />} />
      <Route path='videos/:query' element={<Videos />} />
      <Route path='videos/watch/:videoId' element={<Watch />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
