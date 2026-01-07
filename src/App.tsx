import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import FileDropzone from './components/FileDropzone';
import FileEmailRow from './components/FileEmailRow';
import type { FileEmailDraft } from './types';
import { createDraft } from './services/gmail';

function App() {
  const [drafts, setDrafts] = useState<FileEmailDraft[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/gmail.compose',
    onSuccess: (token) => setAccessToken(token.access_token)
  });

  const addFiles = (files: File[]) => {
    setDrafts((prev) => [
      ...prev,
      ...files.map((file) => ({
        file,
        to: '',
        cc: '',
        subject: '',
        body: ''
      }))
    ]);
  };

  const updateDraft = (index: number, updated: FileEmailDraft) => {
    setDrafts((prev) =>
      prev.map((d, i) => (i === index ? updated : d))
    );
  };

  const createAllDrafts = async () => {
    if (!accessToken) {
      alert('Please sign in with Google first');
      return;
    }

    setLoading(true);

    try {
      for (const draft of drafts) {
        await createDraft(accessToken, draft);
        await new Promise((r) => setTimeout(r, 300));
      }

      alert('Gmail drafts created 🎉');
    } catch (err) {
      alert(`Error: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <h1>📎 File → Gmail Drafts</h1>

      {!accessToken && (
        <button onClick={() => login()}>
          Sign in with Google
        </button>
      )}

      <FileDropzone onFilesAdded={addFiles} />

      {drafts.map((draft, index) => (
        <FileEmailRow
          key={`${draft.file.name}-${index}`}
          draft={draft}
          onChange={(updated) => updateDraft(index, updated)}
        />
      ))}

      {drafts.length > 0 && (
        <button
          onClick={createAllDrafts}
          disabled={loading}
          style={{ marginTop: 20 }}
        >
          {loading ? 'Creating drafts…' : 'Create Gmail Drafts'}
        </button>
      )}
    </div>
  );
}

export default App;
