"use client";

import { useEffect, useState } from "react";
import { Pattern } from "@/components/ui";
import { Loader2, Globe, ImageIcon } from "lucide-react";

interface LinkPreview {
  url: string;
  domain: string;
  screenshot: string;
}

export default function Generate() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LinkPreview | null>(null);
  const [error, setError] = useState("");

  // Cleanup screenshot object URL
  useEffect(() => {
    return () => {
      if (data?.screenshot) {
        URL.revokeObjectURL(data.screenshot);
      }
    };
  }, [data?.screenshot]);

  const handleGenerate = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError("");

    if (data?.screenshot) {
      URL.revokeObjectURL(data.screenshot);
    }
    setData(null);

    try {
      const res = await fetch(
        `https://api.empiretech.net.ng/api/search/ssweb?url=${encodeURIComponent(
          url
        )}`
      );

      if (!res.ok) {
        setError("Failed to generate preview.");
        return;
      }

      const contentType = res.headers.get("content-type") || "";
      if (!contentType.startsWith("image/")) {
        setError("Invalid response from API.");
        return;
      }

      const blob = await res.blob();
      const screenshotUrl = URL.createObjectURL(blob);

      // Extract domain from URL
      let domain = "";
      try {
        const normalized = url.startsWith("http")
          ? url
          : `https://${url}`;
        domain = new URL(normalized).hostname.replace(/^www\./, "");
      } catch {
        domain = "";
      }

      setData({
        url,
        domain,
        screenshot: screenshotUrl,
      });
    } catch (err) {
      console.error(err);
      setError("Unable to fetch screenshot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pattern>
      <div className="min-h-[100dvh] layout py-20 relative z-10">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-main to-main/60 bg-clip-text text-transparent">
            Generate Link Screenshot
          </h1>
          <p className="text-muted text-sm mt-2">
            Paste any URL to generate a live website screenshot.
          </p>
        </div>

        {/* Input */}
        <div className="max-w-xl mx-auto mb-12 flex gap-2">
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-line bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-main/40 text-sm"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-main text-white text-sm font-medium flex items-center gap-2 hover:bg-main/90 transition disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Generate"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="text-center mb-10 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Result */}
        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Link Info */}
            <div className="border border-line rounded-2xl p-6 bg-secondary/40 backdrop-blur">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe size={18} className="text-main" />
                Link Information
              </h2>

              <div className="space-y-3 text-sm">
                <Detail label="URL" value={data.url} />
                <Detail label="Domain" value={data.domain || "Unknown"} />
              </div>
            </div>

            {/* Screenshot */}
            <div className="border border-line rounded-2xl p-6 bg-secondary/40 backdrop-blur">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ImageIcon size={18} className="text-main" />
                Website Screenshot
              </h2>

              <img
                src={data.screenshot}
                alt="Website screenshot"
                className="rounded-xl w-full border border-line"
              />
            </div>
          </div>
        )}
      </div>
    </Pattern>
  );
}

/* ---------------------------------------------
   Detail Component
----------------------------------------------*/
function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-muted">{label}</p>
      <p className="font-medium break-words">{value || "—"}</p>
    </div>
  );
}