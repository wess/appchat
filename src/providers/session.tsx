import React from 'react';

import Data from '../data';
import Session from '../data/session';

const Context = React.createContext({
  session: null,
  setSession: (session:Session | null) => {},
});


export default Context;