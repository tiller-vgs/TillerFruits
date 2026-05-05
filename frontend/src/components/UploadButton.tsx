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
      <Button
        sx={{ fontSize: "1.25rem", mb: "0.5rem"}}
        variant="contained"
        onClick={() => fileInputRef.current.click()}
      >
        Upload files
      </Button>
    </>
  );
}

export default UploadButton;
