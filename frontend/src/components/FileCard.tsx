interface FileItem {
  id: string;
  extension: string;
  originalName: string;
  displayName: string;
}

function FileCard({ file }: { file: FileItem }) {
  const ext = file.extension.replace(".", "").toUpperCase();

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow w-80">
      <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-sm font-bold mb-4">
        {ext}
      </div>
      <p className="text-sm font-semibold text-gray-900 truncate mb-1">{file.originalName}</p>
      <p className="text-xs text-gray-400">sendt av {file.displayName}</p>
    </div>
  );
}

export default FileCard;
