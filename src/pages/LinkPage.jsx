import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, LinkIcon, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DeviceStats from "@/components/DeviceStats";
import LocationStats from "@/components/LocationStats";

const LinkPage = () => {
  const { user } = UrlState();
  const { id } = useParams();
  const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
  

  const { loading, data: url, fn, error } = useFetch(getUrl);
  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl);
  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl);

  useEffect(() => {
    fn({ id, user_id: user?.id });
    fnStats(id);
  }, [fn, fnStats, id, user?.id]);

  useEffect(() => {
    if (error) {
      navigate("/dashboard");
    }
  }, [error, navigate]);

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url;
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://trimrr-amber.vercel.app/${url?.short_url}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <>
      {copied && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-lg text-sm transition-all duration-300">
          Copied!
        </div>
      )}
      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className=" flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className=" text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            className=" text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
            href={`https://trimrr-amber.vercel.app/${link}`}
            target="_blank"
          >
            https://trimrr-amber.vercel.app/{link}
          </a>
          <a
            className=" flex gap-1 items-center hover:underline cursor-pointer"
            href={url?.original_url}
            target="_blank"
          >
            <LinkIcon className=" p-1" />
            {url?.original_url}
          </a>
          <span className=" flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={handleCopy}
              className=" cursor-pointer"
            >
              <Copy />
            </Button>
            <Button
              variant="ghost"
              className=" cursor-pointer"
              onClick={downloadImage}
            >
              <Download />
            </Button>
            <Button
              className=" cursor-pointer"
              variant="ghost"
              onClick={() => fnDelete(url?.id)}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash2 />
              )}
            </Button>
          </div>
          <img
            src={url?.qr}
            alt="qr-code"
            className=" w-full self-center sm:self-start ring ring-blue-500 object-contain"
          />
        </div>

        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className=" text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <LocationStats stats={stats} />
              <CardTitle>Device Info</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No statistics available"
                : "Loading statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default LinkPage;
