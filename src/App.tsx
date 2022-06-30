import React from 'react';

import {Redirect, Route} from 'react-router-dom';

import {
  IonApp,
  IonContent,
  IonHeader,
  setupIonicReact
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Onboarding from './pages/onboarding';
import Chat from './pages/chat';

import Datastore from './data';
import Provider from './providers';
import Session from './providers/session';
import {default as SessionModel} from './data/session';
import {useApi} from './providers/api';

setupIonicReact();

const Router = () => (
  <IonReactRouter>
    <Session.Consumer>
      {({session}) => {
        console.log(session)
      return (
        <>
          <Route path="/onboarding/" component={Onboarding} />
          <Route exact path="/chat" component={Chat} />
      
          <Route exact path="/">
            <Redirect to={session ? "/chat" : "/onboarding"} />
          </Route>        
        </>
      )}
      }
    </Session.Consumer>
</IonReactRouter>

);
const App: React.FC = () => {
  const api = useApi();
  const [session, _setSession] = React.useState<SessionModel|null>(null);


  React.useEffect(() => {
    const loadSession = async () => {
      await Datastore.init();
      
      const _session = await Datastore.get('session') || await api.account.get();
      setSession(_session);
    };

    loadSession();
  }, []);


  const setSession = (session:SessionModel|null) => { 
    _setSession(session);
  }

  return (
    <Provider>
      <IonApp>
        <Session.Provider value={{session, setSession}}>
          {session && <Router />}
        </Session.Provider>
      </IonApp>
    </Provider>
  );
}

export default App;
