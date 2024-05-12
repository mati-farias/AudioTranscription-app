// UploadActions.tsx
import { UiFileInputButton } from "../app/components/UiFileInputButton";

export default function UploadActions() {
  const handleFilesSelected = async (files: FileList) => {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('theFiles', file);
    });

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file.');
      }

      const data = await response.json();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <UiFileInputButton
      label="Upload File"
      uploadFileName="theFiles"
      onFilesSelected={handleFilesSelected}
    />
  );
}
