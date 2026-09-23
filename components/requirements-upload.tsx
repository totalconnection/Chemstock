'use client';
import { Upload, X, FileText } from 'lucide-react';
import { useState } from 'react';
const allowed = /\.(pdf|xlsx|csv|docx|txt)$/i;
export default function RequirementsUpload({
  files,
  onChange,
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const [error, setError] = useState('');
  return (
    <div className="requirements-upload">
      <label className="upload-target">
        <Upload size={24} />
        <strong>Add a purchasing list or specification</strong>
        <span>
          PDF, Excel, CSV, Word, or text · up to 5 files, 10 MB each, 20 MB
          total
        </span>
        <input
          type="file"
          multiple
          accept=".pdf,.xlsx,.csv,.docx,.txt"
          onChange={(e) => {
            const selected = [...files, ...Array.from(e.target.files || [])];
            e.target.value = '';
            if (
              selected.length > 5 ||
              selected.some(
                (f) =>
                  !allowed.test(f.name) || f.size > 10 * 1024 * 1024 || !f.size,
              ) ||
              selected.reduce((n, f) => n + f.size, 0) > 20 * 1024 * 1024
            ) {
              setError(
                'Choose up to 5 supported files within the size limits. Empty files cannot be added.',
              );
              return;
            }
            setError('');
            onChange(selected);
          }}
        />
      </label>
      {files.map((f, i) => (
        <div className="selected-file" key={i}>
          <FileText size={16} />
          <span>
            {f.name} <small>{(f.size / 1024).toFixed(0)} KB</small>
          </span>
          <button
            type="button"
            aria-label={'Remove ' + f.name}
            onClick={() => onChange(files.filter((_, n) => n !== i))}
          >
            <X size={16} />
          </button>
        </div>
      ))}
      {error && <p role="alert">{error}</p>}
      <p className="small-copy">
        Files stay in this tab until you submit. If sending by email, attach
        these files in your email app.
      </p>
    </div>
  );
}
