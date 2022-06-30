import React from 'react';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonButton, IonItem, IonInput, IonGrid, IonRow, IonCol, IonButtons } from '@ionic/react';
import Message from '../../components/Message';
import './styles.css';

import {useApi} from '../../providers/api';


const MSG_ID = '629a1c77e7581b2f7087';

const _Buffer = ({messages, lastRef}) => (
    <IonList>
    {messages.length > 0 && messages.map((m, i) => (
      <Message key={`msg_${i}`} name={m.name} message={m.message} />
    ))}
    <IonItem ref={lastRef}> </IonItem>
  </IonList>
);

const Buffer = React.memo(_Buffer);

const Component = ({session, setSession}) => {
  let [user, setUser] = React.useState<string>(null);
  let [messages, setMessages] = React.useState([]);
  let api = useApi();

  const getUser = async () => {
    try {
      let user = await api.account.get();
  
      setUser(user.name);
    } catch (_) {
      setSession(null);
    }
  }

  const logout = async () => {
    try {
      await api.account.deleteSession(session);
      setUser(null);
      setSession(null);
    } catch (_) {
      setUser(null);
      setSession(null);
    }
  }

  const sendMessage = async (msg) => {
    if(msg.length === 0 || msg === '') return;

    try {
      const pending = {
        user,
        message: msg,
        created: new Date().toISOString(),
      };

      await api.database.createDocument(MSG_ID, 'unique()', pending);
    } catch (err) {
      console.log(err);
    }
  }
  
  api.client.subscribe(`databases.default.collections.${MSG_ID}.documents`, res => {
    const {name, message} = (res.payload as {name: string, message: string});
    console.log(res)
    setMessages([
      ...messages,
      {
        name,
        message,
      }
    ]);
  }); // messages

  
  const getMessages = async () => {
    const list = await api.database.listDocuments(MSG_ID, [], 100, 0, undefined, undefined, [], ['ASC']);
    

    setMessages(
      list.documents
      .map(doc => {
        return {name: doc['user'], message: doc['message']}
      })
    );
  }

  const lastRef = React.useRef(null);
  const msgRef = React.useRef(null);

  React.useEffect(() => {
    (async (getUser, messages, getMessages, lastRef) => {
      await getUser();  

      if(messages.length === 0) {
        await getMessages();  

      }
      
      if(lastRef) 
        lastRef.current.scrollIntoView({behavior: 'smooth'});

    })(getUser, messages, getMessages, lastRef);
  });


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>TessaTalk</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logout}>Log Out</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Appchat</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Buffer messages={messages} lastRef={lastRef} />
      </IonContent>
      <IonToolbar>
        <form onSubmit={(e) => {
          e.preventDefault();

          if(msgRef === null) { 
            console.log('msgRef is null');

            return; 
          }

          const field = msgRef.current;
          const value = field.value;

          sendMessage(value);          

          field.value = '';
        }}>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonInput 
                  ref={msgRef}
                  id="message"
                  className='onboarding-input'
                  type="text" 
                />
              </IonCol>

              <IonCol size="2">
                <IonButton type="submit">Send</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>  
        </form>
      </IonToolbar>
    </IonPage>
  );
};

export default Component;
