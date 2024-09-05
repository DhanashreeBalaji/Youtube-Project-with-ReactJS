import './App.css';
import Head from './components/Head';
import Body from './components/Body';
import appStore from './utils/appStore';
import { Provider } from 'react-redux';
import MainContainer from "./components/MainContainer"
import WatchPage from './components/WatchPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body/>,
    children: [
      {
        path: "/",
        element: <MainContainer/>,
      },
      {
        path: "watch",
        element: <WatchPage/>,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store= {appStore}>
    <div>
    <Head/>

    {/* Head is default to be displayed but Body has two options with one part of body  as default
          <Body/> 
   Dont write <Body/> directly*/}

     <RouterProvider router={appRouter}/>

    </div>
    </Provider>

  );
}

export default App;

