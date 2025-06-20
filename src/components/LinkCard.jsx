import { Copy, Download, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const LinkCard = ({ url, fetchUrls }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://trimrr-amber.vercel.app/${url?.short_url}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // hide after 2s
  };

  const downloadImage = () =>{
    const imageUrl = url?.qr;
    const fileName = url?.title

    const anchor = document.createElement("a")
    anchor.href = imageUrl
    anchor.download = fileName

    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl);


  return (
    <div className="relative flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      {copied && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-lg text-sm transition-all duration-300">
          Copied!
        </div>
      )}
      <img
        src={url?.qr}
        className="h-32 object-contain ring ring-blue-500 self-start"
        alt="QR Code"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
          https://trimrr-amber.vercel.app/
          {url?.custom_url ? url?.custom_url : url?.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer">
          {url?.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={handleCopy}
          className=" cursor-pointer"
        >
          <Copy />
        </Button>
        <Button variant="ghost" onClick={downloadImage}>
          <Download />
        </Button>
        <Button
          variant="ghost"
          onClick={() => fnDelete(url?.id).then(() => fetchUrls())}
        >
          {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash2 />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;