import React from 'react';

import { AuthProvider } from './auth';

const ContextProviders: React.FC = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default ContextProviders;
