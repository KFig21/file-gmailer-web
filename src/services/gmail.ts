// src/services/gmail.ts
import type { FileEmailDraft } from '../types';

/**
 * Encodes an ArrayBuffer or a standard UTF-16 string into Base64URL format.
 * This handles Unicode characters (emojis, etc.) correctly.
 */
function base64UrlEncode(data: ArrayBuffer | string): string {
  let binary = '';
  let bytes: Uint8Array;

  if (typeof data === 'string') {
    // Convert the string into UTF-8 bytes first
    bytes = new TextEncoder().encode(data);
  } else {
    bytes = new Uint8Array(data);
  }

  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  // btoa works now because 'binary' only contains characters in the 0-255 range
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export async function createDraft(accessToken: string, draft: FileEmailDraft) {
  const boundary = 'foo_bar_baz';
  const buffer = await draft.file.arrayBuffer();

  // 1. Use the new safe encoder for the file
  const encodedFile = base64UrlEncode(buffer);

  // 2. Build the raw message string
  const rawMessage =
    `To: ${draft.to}\r\n` +
    `Cc: ${draft.cc ?? ''}\r\n` +
    `Subject: ${draft.subject ?? ''}\r\n` +
    `MIME-Version: 1.0\r\n` +
    `Content-Type: multipart/mixed; boundary="${boundary}"\r\n\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: text/html; charset="UTF-8"\r\n\r\n` +
    `${draft.body ?? ''}\r\n\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: ${draft.file.type || 'application/octet-stream'}\r\n` +
    `Content-Disposition: attachment; filename="${draft.file.name}"\r\n` +
    `Content-Transfer-Encoding: base64\r\n\r\n` +
    `${encodedFile}\r\n` +
    `--${boundary}--`;

  // 3. Use the safe encoder for the entire message string
  const raw = base64UrlEncode(rawMessage);

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/drafts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: { raw },
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
}
