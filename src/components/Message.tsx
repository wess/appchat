import './ExploreContainer.css';
import { IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import { useApi } from '../providers/api';

interface MessageProps {
  name: string;
  message: string;
}

const Message: React.FC<MessageProps> = ({ name, message }) => {
  const sdk = useApi();
  
  return (
    <IonItem>
      <IonThumbnail slot="start">
        <img alt="user-avatar" src={sdk.avatars.getInitials(name).toString()} style={{
          borderRadius: "100%"
        }} />
      </IonThumbnail>
      <IonLabel>
        <h2>{name}</h2>
        <p>{message}</p>
      </IonLabel>
    </IonItem>
  );
};

export default Message;
