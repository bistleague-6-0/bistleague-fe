"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import toast from "react-hot-toast";
import { BsFileEarmarkArrowUpFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

interface DropzoneProps {
  onFileSelected: (files: File) => void;
  onFileRejected?: (fileRejections: FileRejection[]) => void;
  onFileDeleted: () => void;
  name: string;
}

const Dropzone: React.FC<DropzoneProps> = ({
  onFileSelected,
  onFileRejected,
  onFileDeleted,
  name,
}) => {
  const [file, setFile] = useState<File>();
  const handleDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const imageFiles = acceptedFiles.filter((file) =>
          file.type.startsWith("image/")
        );
        if (imageFiles.length > 0) {
          setFile(imageFiles[0]);
          onFileDeleted();
        } else {
          if (onFileRejected) {
            onFileRejected(fileRejections);
            toast.error("jangan pdf");
          }
        }
      } else if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        onFileDeleted();
      }
    },
    [onFileRejected, onFileDeleted]
  );

  useEffect(() => {
    if (file) {
      onFileSelected(file);
    }
  }, [file, onFileSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    maxFiles: 1, // Maximum number of files allowed
  });

  return (
    <div className="border-2 rounded-lg bg-white w-full lg:w-[450px]">
      <div
        {...getRootProps()}
        className={`dropzone ${
          isDragActive ? "active" : ""
        } flex justify-between items-center cursor-pointer`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-[12px] lg:text-[16px] font-normal ml-4">
            Drop the file here...
          </p>
        ) : file ? (
          <p className="text-[12px] lg:text-[16px] font-normal ml-4 text-black">
            {file.name}
          </p>
        ) : (
          <p className="text-[12px] lg:text-[16px] font-normal ml-4 text-black">
            {name == "" ? "No File Selected" : name}
          </p>
        )}
        <div className="h-full text-[12px] lg:text-[16px] bg-[#379392] text-white py-2 px-3 rounded-lg">
          Browse
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
