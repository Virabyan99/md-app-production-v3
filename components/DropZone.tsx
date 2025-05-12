'use client';

import { FC, useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { ViewerContext } from '@/contexts/ViewerContext';
import toast from 'react-hot-toast';

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

const DropZone: FC = () => {
  const ctx = useContext(ViewerContext);
  if (!ctx) throw new Error('ViewerContext missing');
  const { setMarkdown } = ctx;

  const onDropAccepted = useCallback((files: File[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onerror = () => toast.error('Failed to read file');
    reader.onload = () => {
      setMarkdown(reader.result as string);
    };
    reader.readAsText(file);
  }, [setMarkdown]);

  const onDropRejected = useCallback((rejections) => {
    const { errors } = rejections[0];
    errors.forEach((e) => {
      const msg =
        e.code === 'file-too-large'
          ? 'File exceeds 2 MB'
          : e.code === 'file-invalid-type'
          ? 'Unsupported file type'
          : 'Upload error';
      toast.error(msg);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'text/markdown': ['.md'] },
    multiple: false,
    maxSize: MAX_SIZE,
    onDropAccepted,
    onDropRejected,
  });

  return (
    <div
      {...getRootProps()}
      role="button"
      aria-label="Upload Markdown file"
      className={`
        flex flex-col items-center justify-center border-2 border-dashed rounded-2xl
        p-10 transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-400'}
        focus:outline-none focus-visible:ring focus-visible:ring-blue-500
        cursor-pointer select-none
      `}
    >
      <input {...getInputProps()} id="file" />
      <p className="text-center">
        {isDragActive ? 'Drop to upload' : 'Drag & drop a .md file or click to browse'}
      </p>
    </div>
  );
};

export default DropZone;