"use client";
import { Document } from "@prisma/client";
import { ExternalLink, FileText, Loader2 } from "lucide-react";
import Link from "next/link";
import { FC, useState, useEffect } from "react";

interface DocumentsListProps {
  id: string;
}

const DocumentsList: FC<DocumentsListProps> = ({ id }) => {
  const [documents, setDocuments] = useState<Document[]>();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "/api/documents?" + new URLSearchParams({ namespace: id }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log(data);

      setDocuments(data);
    })();
  }, [id]);

  return (
    <div className='mr-auto ml-12 max-w-[15rem] w-full'>
      <h2 className='text-sm uppercase font-bold text-gray-300 tracking-tight'>
        Loaded Documents
      </h2>
      <div className='mt-2'>
        <div className='flex flex-col gap-2'>
          {documents ? (
            documents.map((document) => (
              <div
                key={document.id}
                className='w-full px-3 py-2.5 rounded-md bg-gray-900/50 border border-gray-100'>
                <div className='flex flex-row items-center justify-between'>
                  <div className='flex flex-row items-center'>
                    <FileText className='w-4 h-4 text-gray-300' />
                    <span className='ml-2 text-sm font-normal'>
                      {document.name}
                    </span>
                  </div>
                  <Link target='_blank' href={document.url}>
                    <ExternalLink className='w-4 h-4 text-primary' />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div>
              <Loader2 className='text-center h-4 w-4 animate-spin text-primary' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentsList;
