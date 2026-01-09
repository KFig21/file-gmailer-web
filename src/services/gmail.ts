function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return btoa(binary);
}

export async function createDraft(
  accessToken: string,
  draft: {
    to?: string;
    cc?: string;
    subject?: string;
    body?: string;
    file: File;
  },
) {
  const boundary = 'foo_bar_baz';
  const buffer = await draft.file.arrayBuffer();
  const encodedFile = arrayBufferToBase64(buffer);

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

  const raw = btoa(rawMessage).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

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
