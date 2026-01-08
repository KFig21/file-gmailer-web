import type { FileEmailDraft } from '../../types';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles.scss';

type Props = {
  draft: FileEmailDraft;
  onChange: (draft: FileEmailDraft) => void;
  onDelete: () => void;
};

export default function DraftEmail({ draft, onChange, onDelete }: Props) {
  return (
    <div className="email-container">
      {/* delete draft */}
      <div
        className="delete-draft-container"
        onClick={onDelete}
        role="button"
        aria-label="Delete draft"
      >
        <DeleteIcon className="trash-icon" />
      </div>

      {/* attachment name */}
      <div className="email-container-attachment">
        <AttachFileIcon className="attachment-icon" />
        <div className="email-container-attachmen-name">{draft.file.name}</div>
      </div>

      {/* TO input */}
      <input
        placeholder="To"
        value={draft.to ?? ''}
        onChange={(e) => onChange({ ...draft, to: e.target.value })}
      />

      {/* CC input */}
      <input
        placeholder="CC"
        value={draft.cc ?? ''}
        onChange={(e) => onChange({ ...draft, cc: e.target.value })}
      />

      {/* SUBJECT input */}
      <input
        placeholder="Subject"
        value={draft.subject ?? ''}
        onChange={(e) => onChange({ ...draft, subject: e.target.value })}
      />

      {/* BODY input */}
      <textarea
        placeholder="Body"
        value={draft.body ?? ''}
        onChange={(e) => onChange({ ...draft, body: e.target.value })}
      />
    </div>
  );
}
