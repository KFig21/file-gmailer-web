type Props = {
  onFilesAdded: (files: File[]) => void;
};

export default function FileDropzone({ onFilesAdded }: Props) {
  return (
    <div
      onDrop={(e) => {
        e.preventDefault();
        onFilesAdded(Array.from(e.dataTransfer.files));
      }}
      onDragOver={(e) => e.preventDefault()}
      style={{
        border: '2px dashed #aaa',
        padding: 30,
        marginBottom: 20,
        textAlign: 'center'
      }}
    >
      Drag & drop files here
      <br />
      <input
        type="file"
        multiple
        onChange={(e) =>
          e.target.files && onFilesAdded(Array.from(e.target.files))
        }
      />
    </div>
  );
}
