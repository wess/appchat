import React from 'react';
import {Appwrite} from 'appwrite';

const PROJECT_ID = '629a0fbe3bd88e6547a9';
const ENDPOINT = 'https://demo.appwrite.io/v1';

const client = new Appwrite();
client.setEndpoint(ENDPOINT)
      .setProject(PROJECT_ID);

const Context = React.createContext(client);

const Component = ({children}) => (
  <Context.Provider value={client}>{children}</Context.Provider>
);

export const useApi = () => React.useContext(Context);

export default Component;