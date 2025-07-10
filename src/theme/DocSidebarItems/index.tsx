import React from 'react';
import { useRole } from '@site/src/context/RoleContext';
import OriginalDocSidebarItems from '@theme-original/DocSidebarItems';
import config from "@site/src/config.json"

// Define allowed directories for each role
const allowedDirsByRole = config.allowedDirsByRole;

// Extract the top-level directory (e.g., "client" from "client/guide")
function getItemDir(item) {
  if (item.type === 'link' && item.docId) {
    const parts = item.docId.split('/');
    return parts.length > 1 ? parts[0] : 'public';
  }

  return null;
}


// Recursively filter sidebar items based on allowed dirs
function filterItems(items, allowedDirs) {
  return items
    .map((item) => {
      if (item.type === 'category') {
        const filteredChildren = filterItems(item.items || [], allowedDirs);

        // Only keep category if it has allowed children
        if (filteredChildren.length > 0) {
          return { ...item, items: filteredChildren };
        }

        return null;
      }

      // For links, check docId-based folder
      const dir = getItemDir(item);
      return allowedDirs.includes(dir) ? item : null;
    })
    .filter(Boolean);
}


export default function DocSidebarItems({ items, ...props }) {
  const { role } = useRole();

  if (!role || !Array.isArray(items)) return null;

  const allowedDirs = allowedDirsByRole[role] || [];

  const filteredItems = filterItems(items, allowedDirs);

  return <OriginalDocSidebarItems items={filteredItems} {...props} />;
}
