import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import RequireAuth from '../../components/RequireAuth'; // your redirect logic
import { RoleProvider } from '../../context/RoleContext'; // your context

export default function Layout(props) {
  return (
    <RoleProvider>
      <RequireAuth>
        <OriginalLayout {...props} />
      </RequireAuth>
    </RoleProvider>
  );
}
