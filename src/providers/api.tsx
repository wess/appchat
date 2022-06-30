import React from 'react';
import { Account, Avatars, Client, Databases } from 'appwrite';

const PROJECT_ID = '629a0fbe3bd88e6547a9';
const ENDPOINT = 'https://demo.appwrite.io/v1';
const APP_DATABASE_ID = "default";


const client = new Client();
client.setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);

const database = new Databases(client, APP_DATABASE_ID);
const account = new Account(client);
const avatars = new Avatars(client);

const Context = React.createContext({client, database, account,avatars});

const Component = ({ children }) => (
  <Context.Provider value={{client, database, account,avatars}}>{children}</Context.Provider>
);

export const useApi = () => React.useContext(Context);

export default Component;