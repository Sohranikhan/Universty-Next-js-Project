"use client";
import "react-quill/dist/quill.snow.css";
import dynamic from 'next/dynamic';
import Loader from "../Loader/Loader";
import { useEffect, useState,  } from "react";
import { ImagePlus } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { FaFilePdf } from "react-icons/fa";
import { Button } from "../ui/button";

// Dynamic import of ReactQuill with SSR disabled
const ReactQuillSSR = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="py-3"><Loader /></div>
});

// Configuration for the ReactQuill toolbar
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }, {
      color: [
        "hsl(25 100% 45%)", "hsl(156 33% 47%)", "hsl(154 88% 25%)",
        "hsl(0 84.2% 60.2%)", "hsl(180 67% 99%)", "hsl(180 64% 2%)",
        "hsl(0, 0%, 24%)", "hsl(25 100% 45%)",
      ]
    }, {
      background: [
        "hsl(25 100% 45%)", "hsl(156 33% 47%)", "hsl(154 88% 25%)",
        "hsl(0 84.2% 60.2%)", "hsl(180 67% 99%)", "hsl(180 64% 2%)",
        "hsl(0, 0%, 24%)", "hsl(25 100% 45%)",
      ]
    }, { size: [] }],
    [
      "header", "font", "size", "bold", "italic", "strike", "blockquote",
      "list", "indent", "link",
    ],
    [{ align: ['', 'center', 'right', 'justify'] }],
    [
      { list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' },
    ],
    ['clean'],
  ],
  clipboard: {
    matchVisual: true,
  },
};

const ReactQuill = ({econtent, setContent})=> {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  
 const setPdfUlr = (result) => {
  setContent(
    (prev) =>
    `${prev} <br /> \n
    <a href="${result?.info?.secure_url}" download="MCUT_File" target="_blank">Download File</a>
    `
  );
};

 const onSuccess = (result) => {
          setContent(
            (prev) =>
            `${prev} <br /> \n
            <div style="width: 300px; max-width: 100%; height: auto;">
            <Image src="${result?.info?.secure_url}" width="300" height="250" alt="${result?.info?.name}" className="w-[100%] max-w-[300px] h-auto object-cover" />
            </div>`
          );
  };

if (!mounted) {
  return <Loader />
}
    return (
      <div className="w-full h-full flex flex-col gap-y-2 py-3 whitespace-pre-wrap ql-snow">
        <div className="flex items-center gap-x-3 my-2">
        <CldUploadWidget
          onSuccess={onSuccess}
          uploadPreset='staff-uploads'
          width="500" // Transform the image: auto-crop to square aspect_ratio
          height="500"
          crop={{
            type: 'auto',
            source: true
          }}
        >
          {({ open }) => (
            <Button type="button" className="flex gap-2 items-center bg-accent" onClick={open}>
              <ImagePlus /> Upload Image
            </Button>
          )}
        </CldUploadWidget>

        <CldUploadWidget
        uploadPreset='staff-uploads'
        resourceType='raw' // 'raw' to handle non-media files like PDFs
        clientAllowedFormats={['pdf']} // Allow only PDF uploads
        maxFileSize={10000000} // Set max file size to 10MB if needed
        onSuccess={setPdfUlr}
      >
        {({ open }) => (
          <Button type="button" className="flex gap-2 items-center bg-red-700 text-background" onClick={open}>
            <FaFilePdf /> Upload PDF
          </Button>
        )}
      </CldUploadWidget>
        </div>

        <ReactQuillSSR
          modules={modules}
          value={econtent}
          onChange={setContent}
          theme="snow"
          placeholder="Write Description Here"
        />
      </div>
    );
}

export default ReactQuill;