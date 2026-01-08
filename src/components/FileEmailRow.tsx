import type { FileEmailDraft } from '../types';
import './../styles.scss';

type Props = {
  draft: FileEmailDraft;
  onChange: (draft: FileEmailDraft) => void;
};

export default function FileEmailRow({ draft, onChange }: Props) {
  return (
    <div className="email-container">
      <strong>{draft.file.name}</strong>

      <input
        placeholder="To"
        value={draft.to ?? ''}
        onChange={(e) => onChange({ ...draft, to: e.target.value })}
      />

      <input
        placeholder="CC"
        value={draft.cc ?? ''}
        onChange={(e) => onChange({ ...draft, cc: e.target.value })}
      />

      <input
        placeholder="Subject"
        value={draft.subject ?? ''}
        onChange={(e) => onChange({ ...draft, subject: e.target.value })}
      />

      <textarea
        placeholder="Body"
        value={draft.body ?? ''}
        onChange={(e) => onChange({ ...draft, body: e.target.value })}
      />
    </div>
  );
}
