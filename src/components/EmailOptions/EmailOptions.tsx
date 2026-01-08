// src/components/EmailOptions/EmailOptions.tsx

import { useState } from 'react';
import './styles.scss';
import CollapseToggle from '../../elements/collapseToggle/CollapseToggle';

type BulkPatch = {
  to?: string;
  cc?: string;
  subject?: string;
  body?: string;
};

type Props = {
  onApply: (patch: BulkPatch) => void;
};

export default function EmailOptions({ onApply }: Props) {
  const [useSingleTo, setUseSingleTo] = useState(false);
  const [useSingleCc, setUseSingleCc] = useState(false);
  const [useSingleSubject, setUseSingleSubject] = useState(false);
  const [useSingleBody, setUseSingleBody] = useState(false);

  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const [open, setOpen] = useState(false);

  const apply = () => {
    onApply({
      ...(useSingleTo && { to }),
      ...(useSingleCc && { cc }),
      ...(useSingleSubject && { subject }),
      ...(useSingleBody && { body }),
    });
  };

  return (
    <div className="email-options-wrapper">
      <div className="email-options-container">
        <div className="email-options-header">
          <CollapseToggle isOpen={open} onClick={() => setOpen(!open)} />
          <div className="email-options-title">Bulk Options</div>
        </div>
        {/* form */}
        <div className={`email-options-form ${!open && 'closed'}`}>
          {/* TO */}
          <label className="option-row">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={useSingleTo}
                onChange={(e) => setUseSingleTo(e.target.checked)}
              />
              <span className="checkbox" />
            </label>
            <span className="checkbox-label">Single recipient</span>
            <input
              type="email"
              placeholder="to@example.com"
              disabled={!useSingleTo}
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </label>

          {/* CC */}
          <label className="option-row">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={useSingleCc}
                onChange={(e) => setUseSingleCc(e.target.checked)}
              />
              <span className="checkbox" />
            </label>

            <span className="checkbox-label">Single CC</span>

            <input
              type="email"
              placeholder="cc@example.com"
              disabled={!useSingleCc}
              value={cc}
              onChange={(e) => setCc(e.target.value)}
            />
          </label>

          {/* SUBJECT */}
          <label className="option-row">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={useSingleSubject}
                onChange={(e) => setUseSingleSubject(e.target.checked)}
              />
              <span className="checkbox" />
            </label>
            <span className="checkbox-label">Single Subject</span>
            <input
              type="text"
              placeholder="Subject line"
              disabled={!useSingleSubject}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </label>

          {/* BODY */}
          <label className="option-row">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={useSingleBody}
                onChange={(e) => setUseSingleBody(e.target.checked)}
              />
              <span className="checkbox" />
            </label>
            <span className="checkbox-label">Single body</span>
            <textarea
              placeholder="Email body"
              disabled={!useSingleBody}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>

          {/* apply button */}
          <button className="apply-button" onClick={apply}>
            Apply to all emails
          </button>
        </div>
      </div>
    </div>
  );
}
