import React from 'react';

import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonCard, 
  IonCardContent, 
  IonItem, 
  IonIcon, 
  IonLabel, 
  IonButton, 
  IonList,
  IonInput,
  IonItemGroup,
  IonGrid,
  IonRow,
  IonCol,
  IonRouterLink
} from '@ionic/react';

import { 
  person,
} from 'ionicons/icons';

import {
  object,
  string
} from 'yup';

import './styles.css';

import {useApi} from '../../providers/api';
import Session from '../../providers/session';

const validation = object().shape({
  email: string().email('Invalid email').required('Email is required'),
  password: string().required('Password is required').min(8),
  name: string().required('Name is required')
});

const Component = ({history, setSession}) => {
  const api = useApi();

  const [email, setEmail] = React.useState<string>();
  const [name, setName] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await validation.validate({email, password, name});
      
      await api.account.create('unique()', email, password, name);
      const response = await api.account.createSession(email, password);
      setSession(response);


      history.push('/chat');
    } catch (err) {
      console.log('Invalid data', err);

      alert(`Invalid data: ${JSON.stringify(err.errors)}`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>TessaTalks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonItem>
            <IonIcon icon={person} slot="start" />
            <IonLabel>Register now to get started</IonLabel>
          </IonItem>

          <form onSubmit={handleSubmit}>
            <IonCardContent>
              <IonList>
                <IonItemGroup>
                  <IonItem lines='none'>
                    <IonInput 
                      className='onboarding-input'
                      type="email" 
                      placeholder="Enter your email"
                      required
                      inputMode='email'
                      clearInput
                      autofocus
                      value={email}
                      onIonChange={(e) => setEmail(e.detail.value!)}
                    />
                  </IonItem>

                  <IonItem lines='none'>
                    <IonInput 
                      className='onboarding-input'
                      type="text" 
                      placeholder="Enter your name"
                      required
                      inputMode='text'
                      clearInput
                      value={name}
                      onIonChange={(e) => setName(e.detail.value!)}
                    />
                  </IonItem>

                  <IonItem lines='none'>
                    <IonInput 
                      className='onboarding-input'
                      type="password" 
                      placeholder="Enter your password" 
                      value={password}
                      required
                      clearInput
                      onIonChange={(e) => setPassword(e.detail.value!)}
                    />
                  </IonItem>

                  <IonItem>
                    <IonGrid fixed>
                      <IonRow>
                        <IonCol className="ion-align-self-start">
                          <IonButton 
                            className='onboarding-button' 
                            size='default' 
                            color='success'
                            type='submit'
                          >
                            Submit
                          </IonButton>
                        </IonCol>

                        <IonCol push='1.4' className="ion-align-self-center">
                          <IonRouterLink color="dark" href="/onboarding/login">
                            Login into account.
                          </IonRouterLink>
                        </IonCol>

                      </IonRow>
                    </IonGrid>
                  </IonItem>
                </IonItemGroup>
              </IonList>
            </IonCardContent>
          </form>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Component;
