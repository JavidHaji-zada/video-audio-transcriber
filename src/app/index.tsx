/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import WithSplashScreen from './components/WithSplashScreen';
import NewUpload from './pages/NewUpload';
import PastUploads from './pages/PastUploads';
import ViewTranscription from './pages/ViewTranscription';

function App() {
  const { i18n } = useTranslation();
  return (
    <WithSplashScreen>
      <BrowserRouter>
        <Helmet
          titleTemplate="%s - React Boilerplate"
          defaultTitle="React Boilerplate"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="A React Boilerplate application" />
        </Helmet>

        <Switch>
          <Route
            exact
            path={process.env.PUBLIC_URL + '/'}
            component={HomePage}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/uploads/new'}
            component={NewUpload}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/uploads/past'}
            component={PastUploads}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/uploads/:id'}
            component={ViewTranscription}
          />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </BrowserRouter>
    </WithSplashScreen>
  );
}

export default App;
