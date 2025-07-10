// src/utils/simpleAuth.ts

/**
 * Encode a username and password into a base64 string without '=' padding.
 * Format: username:password
 */
export const simpleEncode = (username: string, password: string): string => {
    const raw = `${username}:${password}`;
    return btoa(raw).replace(/=/g, ''); // remove padding only
};
  
/**
 * Decode a base64-encoded auth token into [username, password].
 * Adds padding automatically if missing.
 */
export const simpleDecode = (token: string): [string, string] | null => {
    try {
        // Fix padding
        const padding = '='.repeat((4 - (token.length % 4)) % 4);
        const padded = token + padding;

        const decoded = atob(padded); // base64 decode
        const [username, password] = decoded.split(':');

        if (!username || !password) return null;
        return [username, password];
    } catch {
        return null;
    }
};
  