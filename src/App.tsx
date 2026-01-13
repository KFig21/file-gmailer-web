/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRef, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import FileDropzone from './components/FileDropzone/FileDropzone';
import DraftEmail from './components/DraftEmail/DraftEmail';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import type { FileEmailDraft } from './types';
import { createDraft } from './services/gmail';
import './index.scss';
import EmailOptions from './components/EmailOptions/EmailOptions';
import HeaderSignInButton from './components/HeaderSignInButton/HeaderSignInButton';
import DraftNavigator from './components/DraftNavigator/DraftNavigator';

function App() {
  const [drafts, setDrafts] = useState<FileEmailDraft[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const MAX_DRAFTS = 50;

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/gmail.compose',
    onSuccess: (token) => setAccessToken(token.access_token),
  });

  const addFiles = (files: File[]) => {
    setDrafts((prev) => {
      const remainingSlots = MAX_DRAFTS - prev.length;

      if (remainingSlots <= 0) {
        alert(`You can only upload up to ${MAX_DRAFTS} files.`);
        return prev;
      }

      const filesToAdd = files.slice(0, remainingSlots);

      if (filesToAdd.length < files.length) {
        alert(
          `Only ${filesToAdd.length} file(s) were added. Maximum of ${MAX_DRAFTS} drafts allowed.`,
        );
      }

      return [
        ...prev,
        ...filesToAdd.map((file) => ({
          file,
          to: '',
          cc: '',
          subject: '',
          body: '',
        })),
      ];
    });
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

  const clearAllDrafts = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete all drafts? This cannot be undone.',
    );

    if (!confirmed) return;

    setDrafts([]);
    setCurrentIndex(0);
    draftRefs.current = [];
  };

  // Sidebar scrolling functionality
  const draftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToDraft = (index: number) => {
    setCurrentIndex(index);
    draftRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const handleScroll = () => {
    const visibleIndex = draftRefs.current.findIndex((el) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.top < window.innerHeight / 2;
    });

    if (visibleIndex !== -1 && visibleIndex !== currentIndex) {
      setCurrentIndex(visibleIndex);
    }
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
      <div className="content-wrapper">
        {/* SIDEBAR NAVIGATOR */}
        {drafts.length > 0 && (
          <DraftNavigator
            drafts={drafts}
            onSelect={scrollToDraft}
            activeIndex={currentIndex}
            createAllDrafts={createAllDrafts}
            onFilesAdded={addFiles}
            loading={loading}
          />
        )}

        {/*  content */}
        <div className="content" onScroll={handleScroll}>
          {/* Email options */}
          {drafts.length > 0 && (
            <EmailOptions
              onApply={(patch) => setDrafts((prev) => prev.map((d) => ({ ...d, ...patch })))}
              onClearAll={clearAllDrafts}
            />
          )}

          {/* Draft emails */}
          {drafts.length > 0 && (
            <div className={`emails-container`}>
              {drafts.map((draft, index) => (
                <DraftEmail
                  key={`${draft.file.name}-${index}`}
                  index={index}
                  draft={draft}
                  // @ts-ignore
                  innerRef={(el) => (draftRefs.current[index] = el)}
                  onChange={(updated) => updateDraft(index, updated)}
                  onDelete={() => deleteDraft(index)}
                />
              ))}
            </div>
          )}

          {/* dropzone */}
          {drafts.length == 0 && (
            <FileDropzone onFilesAdded={addFiles} isDrafts={drafts.length > 0} />
          )}

          {/* Create drafts button */}
          {/* {drafts.length > 0 && <CreateDraftsButton onClick={createAllDrafts} loading={loading} />} */}
        </div>
      </div>
    </div>
  );
}

export default App;
