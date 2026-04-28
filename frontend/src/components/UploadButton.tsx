import Button from "@mui/material/Button";

function UploadButton({ fileInputRef, handleFileInput }) {
  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInput}
        multiple
      />
      <Button variant="contained" onClick={() => fileInputRef.current.click()}>
        Upload files
      </Button>
    </>
  );
}

export default UploadButton;
