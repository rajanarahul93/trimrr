import CreateLink from "@/components/CreateLink";
import ErrorMessage from "@/components/ErrorMessage";
import LinkCard from "@/components/LinkCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UrlState } from "@/context";
import { getClicksForUrls } from "@/db/apiClicks";
import { getUrls } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const DashBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();

  // Fetch URLs (no initial param)
  const {
    loading: loadingUrls,
    error: errorUrls,
    data: urls,
    fn: fetchUrls,
  } = useFetch(getUrls);

  // Fetch clicks (no initial param)
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fetchClicks,
  } = useFetch(getClicksForUrls);

  // Fetch URLs when user.id is available
  useEffect(() => {
    if (user?.id) {
      fetchUrls(user.id);
    }
  }, [user?.id]);

  // Fetch clicks when URLs have loaded
  useEffect(() => {
    if (urls?.length) {
      const urlIds = urls.map((url) => url.id);
      fetchClicks(urlIds);
    }
  }, [urls]);

  // Filter links by search query
  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {(loadingUrls || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length || 0}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink fetchUrls={fetchUrls} />
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>

      {errorUrls && <ErrorMessage message={errorUrls.message} />}
      {(filteredUrls || []).map((url, id) => {
        return <LinkCard key={id} url={url} fetchUrls={fetchUrls} />;
      })}
    </div>
  );
};

export default DashBoard;