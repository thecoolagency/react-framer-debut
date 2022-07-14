import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';

export const magic = new Magic("pk_live_172168EE20739749", {
  extensions: [new OAuthExtension()],
});
