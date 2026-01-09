import type { FileEmailDraft } from '../../types';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import './styles.scss';
import { useState } from 'react';
import {
  CloseIcon,
  ExitFullScreenIcon,
  FullScreenIcon,
  MinusIcon,
  PlusIcon,
} from '../../elements/WindowOptionIcons/Icons';

type Props = {
  draft: FileEmailDraft;
  onChange: (draft: FileEmailDraft) => void;
  onDelete: () => void;
};

export default function DraftEmail({ draft, onChange, onDelete }: Props) {
  const [collapse, setCollapse] = useState(false);
  const [full, setFull] = useState(false);

  const onClickFullScreen = () => {
    setFull(!full);
    setCollapse(false);
  };

  const onClickCollapse = () => {
    setFull(false);
    setCollapse(!collapse);
  };

  return (
    <div className={`email-container ${full && 'full'}`}>
      <div className="email-container-options">
        <div className="email-option-button expand-email" onClick={() => onClickFullScreen()}>
          <div className="email-option-icon">
            {full ? <ExitFullScreenIcon /> : <FullScreenIcon />}
          </div>
        </div>
        <div className="email-option-button collapse-email" onClick={() => onClickCollapse()}>
          <div className="email-option-icon">{collapse ? <PlusIcon /> : <MinusIcon />}</div>
        </div>
        <div className="email-option-button delete-email" onClick={onDelete}>
          <div className="email-option-icon">
            <CloseIcon />
          </div>
        </div>
      </div>

      {/* attachment name */}
      <div className="email-container-attachment">
        <AttachFileIcon className="attachment-icon" />
        <div className="email-container-attachmen-name">{draft.file.name}</div>
      </div>
      <div className={`draft-content ${collapse && 'collapse'}`}>
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
    </div>
  );
}
