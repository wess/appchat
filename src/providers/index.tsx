import React from 'react';

import ApiProvider from './api';

const Component = ({children}) => (
  <ApiProvider>
    {children}
  </ApiProvider>
);



export default Component;