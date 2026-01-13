// src/components/DraftNavigator/DraftNavigator.tsx
import GitHubIcon from '@mui/icons-material/GitHub';
import './styles.scss';

type Props = {
  drafts: { file: File }[];
  activeIndex: number;
  onSelect: (index: number) => void;
  createAllDrafts: () => void;
  onFilesAdded: (files: File[]) => void;
  loading: boolean;
};

export default function DraftNavigator({
  drafts,
  activeIndex,
  onSelect,
  createAllDrafts,
  onFilesAdded,
  loading,
}: Props) {
  return (
    <div className="sidebar-wrapper">
      {/* TOP BUTTON */}
      <div className="sidebar-top">
        <label className={`sidebar-dropzone-button ${drafts.length >= 50 ? 'disabled' : ''}`}>
          {drafts.length >= 50 ? 'Max files reached' : 'Choose files'}
          <input
            type="file"
            multiple
            disabled={drafts.length >= 50}
            onChange={(e) => e.target.files && onFilesAdded(Array.from(e.target.files))}
            hidden
          />
        </label>
      </div>

      {/* SCROLLABLE LIST */}
      <aside className="drafts-sidebar">
        {drafts.map((draft, index) => (
          <div
            key={index}
            onClick={() => onSelect(index)}
            className={`sidebar-item ${activeIndex === index ? 'active' : ''}`}
          >
            <span>{draft.file.name}</span>
          </div>
        ))}
      </aside>

      {/* BOTTOM STICKY BUTTON */}
      <div className="sidebar-bottom">
        <div className="sidebar-create-drafts-button" onClick={createAllDrafts}>
          {loading ? <span className="spinner" /> : 'Create drafts'}
        </div>
      </div>
      <div className="sidebar-bottom">
        <a
          href="https://github.com/KFig21/file-gmailer-web/tree/main"
          target="_blank"
          rel="noopener noreferrer"
          className="signature-container"
        >
          <div className="signature-text">Made by KFig21</div>
          <GitHubIcon className="github-icon" />
        </a>
      </div>
    </div>
  );
}
