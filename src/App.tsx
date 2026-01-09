import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import FileDropzone from './components/FileDropzone/FileDropzone';
import DraftEmail from './components/DraftEmail/DraftEmail';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import type { FileEmailDraft } from './types';
import { createDraft } from './services/gmail';
import './index.scss';
import EmailOptions from './components/EmailOptions/EmailOptions';
import CreateDraftsButton from './components/CreateDraftsButton/CreateDraftsButton';
import HeaderSignInButton from './components/HeaderSignInButton/HeaderSignInButton';

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

  const deleteDraft = (index: number) => {
    setDrafts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="main">
      {/* Header */}
      <div className="header">
        {/* left */}
        <div className="header-left">
          {/* Google sign-in button */}
          <HeaderSignInButton login={login} accessToken={accessToken} />
        </div>

        {/* center */}
        <div className="title-container">
          <div className="title">File-Gmailer</div>
        </div>

        {/* right */}
        <div className="header-right">
          <ThemeSwitcher />
        </div>
      </div>

      {/*  content */}
      <div className="content">
        {/* Email options */}
        {drafts.length > 0 && (
          <EmailOptions
            onApply={(patch) => setDrafts((prev) => prev.map((d) => ({ ...d, ...patch })))}
          />
        )}

        {/* Draft emails */}
        {drafts.length > 0 && (
          <div className={`emails-container`}>
            {drafts.map((draft, index) => (
              <DraftEmail
                key={`${draft.file.name}-${index}`}
                draft={draft}
                onChange={(updated) => updateDraft(index, updated)}
                onDelete={() => deleteDraft(index)}
              />
            ))}
          </div>
        )}

        {/* dropzone */}
        <FileDropzone onFilesAdded={addFiles} isDrafts={drafts.length > 0} />

        {/* Create drafts button */}
        {drafts.length > 0 && <CreateDraftsButton onClick={createAllDrafts} loading={loading} />}
      </div>
    </div>
  );
}

export default App;
