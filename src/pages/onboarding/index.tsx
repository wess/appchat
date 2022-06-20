import React from 'react';

import { Redirect, Route, RouteComponentProps } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { IonPage, IonRouterOutlet } from '@ionic/react';

import Session from '../../providers/session';

import Login from './login';
import Register from './register';

const Component:React.FC<RouteComponentProps> = ({match}) => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Session.Consumer>
          {({session, setSession}) => (
            <IonReactRouter>
              <Route exact path={`/onboarding/login`} render={(props) => (
                <Login setSession={setSession} {...props}/>
              )} />

              <Route exact path={`/onboarding/register`} render={(props) => (
                <Register setSession={setSession} {...props}/>
              )} />

              <Route exact path="/onboarding" render={() => <Redirect to="/onboarding/login" />} />
            </IonReactRouter>
          )}
        </Session.Consumer>
      </IonRouterOutlet>
    </IonPage>
  );
};

export default Component;
