"use client";

import { useRouter } from "next/navigation";
import { FileIcon, Loader2, X } from "lucide-react";
import { FC, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { SupabaseUploadResponse, uploadToSubabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Document } from "@prisma/client";
import { nanoid } from "@/lib/utils";

interface DocumentDropzoneProps {}

const baseStyle = {
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#eb7100",
};

const acceptStyle = {
  borderColor: "#eb7100",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const DocumentDropzone: FC<DocumentDropzoneProps> = ({}) => {
  const router = useRouter();

  const [document, setDocument] = useState<Document | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [chatId, setChatId] = useState<string>(nanoid());

  const onDrop = async (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setFiles([...files, ...acceptedFiles]);
  };

  const processDocuments = async () => {
    if (!files) {
      toast.error("No files to upload");
    }
    setLoading(true);
    const file = files?.[0];

    // TODO: Handle multiple files
    const { path, publicUrl: url } = (await uploadToSubabase(
      file
    )) as SupabaseUploadResponse;

    const response = await fetch("/api/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        path,
        name: file.name,
        namespace: chatId,
      }),
    });

    const document = (await response.json()) as Document;

    if (response.ok) {
      toast.success("Files uploaded successfully");
    } else {
      toast.error("Something went wrong");
      setLoading(false);
    }

    setDocument(document);
    router.push(`/chat/${chatId}`);
  };

  const deleteFile = (file: File) => {
    setFiles(files.filter((f) => f !== file));
  };

  // useEffect(() => {
  //   if (chatId && document && shouldRedirect) {
  //     router.push(`/chat/${chatId}`);
  //     setLoading(false);
  //   }
  // }, [router, chatId, document, shouldRedirect]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className='mx-auto py-12'>
      <div className='mt-2 '>
        <div
          {...getRootProps({ style })}
          className='rounded-full mt-6 sm:col-span-2 '>
          <div className='flex flex-col items-center m justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md h-[300px]'>
            <div className='space-y-1 text-center'>
              <FileIcon className='mx-auto h-12 w-12 text-gray mb-4' />
              <>
                <div className='flex text-sm items-center text-gray-600'>
                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer text-amber-500 rounded-md font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'>
                    <p className='text-bold underline'>Upload a file</p>
                    <input
                      {...getInputProps()}
                      id='file-upload'
                      name='file-upload'
                      type='file'
                      className='sr-only'
                    />
                  </label>
                  <p className='pl-1'>or drag and drop</p>
                </div>
                <p className='text-xs text-gray-500'>PDF 10MB</p>
              </>
            </div>
          </div>
        </div>
      </div>
      {/* File Preview */}
      {files && (
        <div className='grid grid-cols-2 gap-12 justify-between mt-12'>
          {files.map((file, idx) => {
            return (
              <div
                key={idx}
                className='cursor-pointer group relative w-full flex flex-col rounded-md border border-gray-300 border-dashed'>
                <div
                  onClick={() => deleteFile(file)}
                  className='hidden group-hover:block transition transition-all duration-150 ease-in-out group-hover:absolute top-4 right-4'>
                  <X className='text-white h-6 w-6 font-bold' />
                </div>
                <div className='bg-gradient-to-r bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 rounded-tr-md rounded-tl-md border-b border-gray-300 py-12'>
                  <FileIcon className='mx-auto h-12 w-12 text-white' />
                </div>
                <div className='flex-1 flex flex-col px-4 py-4 justify-between bg-gray-950 rounded-br-md rounded-bl-md'>
                  <div className='flex-row flex justify-between'>
                    <p className='text-sm uppercase font-semibold tracking-side'>
                      {file.name}
                    </p>
                    <p className='text-sm font-medium'>{file.size / 1000} kB</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {files && files.length > 0 && (
        <div className='my-16 flex justify-center'>
          <Button
            onClick={processDocuments}
            disabled={loading}
            className='mx-auto text-center'>
            {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Upload documents
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentDropzone;
