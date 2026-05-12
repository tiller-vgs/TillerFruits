
interface FileItem {
  id: string;
  extension: string;
  originalName: string;
  displayName: string;
}

function FileCard({ file }: { file: FileItem }) {
  return (
    <div className="">
      [{file.extension.replace('.', '').toUpperCase()}] {file.originalName} sendt av: {file.displayName}
    </div>
  );
}

export default FileCard