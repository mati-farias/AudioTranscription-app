// UiFileInputButton.tsx
'use client';
import React, {useState} from "react";

interface UiFileInputButtonProps {
  label: string;
  uploadFileName: string;
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
  getFilePathCallback: (filePath: string) => void;
}

type TFileResponse = {
  message: string;
  filepath: string;
}

export const UiFileInputButton: React.FC<UiFileInputButtonProps> = ({
  label,
  uploadFileName,
  acceptedFileTypes = '',
  allowMultipleFiles = false,
  getFilePathCallback,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState(new FormData());

  const uploadFile = async () => {
    try {
      console.log("FormData entries:", Array.from(form.entries()));
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: form,
      });

      

      if (!response.ok) {
        throw new Error('Failed to upload file.');
      }

      const data: TFileResponse = await response.json();
      const {filepath, message} = data;
      console.log('Server response:', data);
      getFilePathCallback(filepath);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();
    Array.from(event.target.files).forEach(file => {
      formData.append('theFiles', file);
    });
    setForm(formData);
  };
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    uploadFile();
  };
  return (
    <div>
      <form action={"/api"} method="post" encType="multipart/form-data" onSubmit={onSubmitHandler} >
      <button type="button" onClick={onClickHandler}>
        {label}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept={acceptedFileTypes}
        multiple={allowMultipleFiles}
        name={uploadFileName}
        onChange={onChangeHandler}
      />
      <button type="submit">
        {"Send form"}
      </button>
      </form>
    </div>
  );
};
