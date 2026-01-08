import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import FileDropzone from './components/FileDropzone';
import FileEmailRow from './components/FileEmailRow';
import ThemeSwitcher from './components/ThemeSwitcher';
import type { FileEmailDraft } from './types';
import { createDraft } from './services/gmail';
import './styles.scss';
import EmailOptions from './components/EmailOptions/EmailOptions';

function App() {
  const [drafts, setDrafts] = useState<FileEmailDraft[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/gmail.compose',
    onSuccess: (token) => setAccessToken(token.access_token),
  });

  const addFiles = (files: File[]) => {
    setDrafts((prev) => [
      ...prev,
      ...files.map((file) => ({
        file,
        to: '',
        cc: '',
        subject: '',
        body: '',
      })),
    ]);
  };

  const updateDraft = (index: number, updated: FileEmailDraft) => {
    setDrafts((prev) => prev.map((d, i) => (i === index ? updated : d)));
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
    <div className="main">
      {/* Header */}
      <div className="header">
        {/* left */}
        <div className="header-left"></div>

        {/* center */}
        <div className="title-container">
          <div className="title">File-Gmailer</div>
        </div>

        {/* right */}
        <div className="header-right">
          <div className="theme-switcher-container">
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/*  content */}
      <div className="content">
        {!accessToken && (
          <div className="sign-in-button-container">
            <button className="sign-in-button" onClick={() => login()}>
              Sign in with Google
            </button>
          </div>
        )}

        {/* dropzone */}
        {accessToken && <FileDropzone onFilesAdded={addFiles} />}

        {/* email options */}
        {drafts.length > 0 && (
          <EmailOptions
            onApply={(patch) => setDrafts((prev) => prev.map((d) => ({ ...d, ...patch })))}
          />
        )}

        {/* email */}
        <div className="emails-container">
          {drafts.map((draft, index) => (
            <FileEmailRow
              key={`${draft.file.name}-${index}`}
              draft={draft}
              onChange={(updated) => updateDraft(index, updated)}
            />
          ))}
        </div>

        {drafts.length > 0 && (
          <button className="create-drafts-button" onClick={createAllDrafts} disabled={loading}>
            {loading ? 'Creating drafts…' : 'Create Gmail Drafts'}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
