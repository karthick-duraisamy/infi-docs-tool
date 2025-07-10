import React, { useEffect, useState } from 'react';
import { Redirect } from '@docusaurus/router';
import config from '@site/src/config.json';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState('');
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isAuthed = localStorage.getItem('auth') === 'true';
    const userRole = localStorage.getItem('role') || '';
    const path = window.location.pathname;

    const allowedDocsByRole: Record<string, string[]> = config.allowedDocsByRole;
    const allowedDirsByRole: Record<string, string[]> = config.allowedDirsByRole;

    const isLoginPage = path.startsWith('/login');
    const isDocs = path.startsWith('/docs/');

    if (!isAuthed) return setRedirectPath("/login");
    if (!isAuthed && !isLoginPage) {
      const from = encodeURIComponent(path + window.location.search);
      setRedirectPath(`/login?from=${from}`);
      return;
    }

    if (isDocs) {
      const parts = path.split('/');
      let section = '';
      let docId = '';

      if (parts[2] === 'category' && parts.length >= 4) {
        section = parts[3];
      } else if (parts.length === 3) {
        docId = parts[2];
      } else if (parts.length >= 4) {
        section = parts[2];
      }

      const allowedDirs = allowedDirsByRole[userRole] || [];
      const allowedDocs = allowedDocsByRole[userRole] || [];

      const isSectionAllowed = section && allowedDirs.includes(section);
      const isDocAllowed = docId && allowedDocs.includes(docId);

      if (!isSectionAllowed && !isDocAllowed) {
        setAccessDenied(true);
        return;
      }
    }

    setAuth(isAuthed);
    setRole(userRole);
    setReady(true);
  }, []);

  // Loading guard to prevent flash
  if (!ready && !redirectPath && !accessDenied) {
    return null; // Or <div>Loading...</div>
  }

  if (redirectPath) {
    return <Redirect to={redirectPath} />;
  }

  if (accessDenied) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h1>🚫 Access Denied</h1>
        <p>You do not have permission to view this documentation.</p>
      </div>
    );
  }

  return <>{children}</>;
}
