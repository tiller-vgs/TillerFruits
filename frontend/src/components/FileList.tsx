import { useEffect, useState } from "react";
import FileCard from "./FileCard";

interface FileItem {
  id: string;
  extension: string;
  originalName: string;
  displayName: string;
}

function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  async function fetchFiles() {
    try {
      const response = await fetch("http://localhost:5000/api/v1/files");
      const data = await response.json();
      setFiles(data.data);
      setLoading(false);
    } catch (error) {
      setError("Noe gikk galt, prøv igjen senere");
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Laster...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Du har {files.length} filer å sende videre:</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <FileCard file={file} />
          </li>
        ))}
      </ul>

      <hr />

      <h2>Oppgavehistorikk:</h2>
    </div>
  );
}

export default FileList;
