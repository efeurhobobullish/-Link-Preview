"use client";

import { useState } from "react";
import { Pattern } from "@/components/ui";
import { Loader2, LinkIcon, Globe, ImageIcon } from "lucide-react";

export default function Generate() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`/api/preview?url=${encodeURIComponent(url)}`);
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Something went wrong.");
      } else {
        setData(json);
      }
    } catch (err) {
      setError("Failed to fetch preview.");
    }

    setLoading(false);
  };

  return (
    <Pattern>
      <div className="min-h-[100dvh] layout py-20 relative z-10">

        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-main to-main/60 bg-clip-text text-transparent">
            Generate Link Preview
          </h1>
          <p className="text-muted text-sm mt-2">
            Paste any URL to extract metadata, screenshots, and social previews.
          </p>
        </div>

        {/* URL Input Box */}
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

        {/* Error Message */}
        {error && (
          <div className="text-center mb-10 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* Results */}
        {data && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT: Metadata */}
            <div className="border border-line rounded-2xl p-6 bg-secondary/40 backdrop-blur">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe size={18} className="text-main" />
                Metadata
              </h2>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted">Title</p>
                  <p className="font-medium">{data.title || "—"}</p>
                </div>

                <div>
                  <p className="text-muted">Description</p>
                  <p className="font-medium">{data.description || "—"}</p>
                </div>

                <div>
                  <p className="text-muted">Domain</p>
                  <p className="font-medium">{data.domain || "—"}</p>
                </div>

                <div>
                  <p className="text-muted">Keywords</p>
                  <p className="font-medium">
                    {data.keywords?.length ? data.keywords.join(", ") : "—"}
                  </p>
                </div>

                <div>
                  <p className="text-muted">OG Image</p>
                  {data.image ? (
                    <img
                      src={data.image}
                      alt="OG Image"
                      className="w-full rounded-lg mt-2"
                    />
                  ) : (
                    <p className="font-medium">—</p>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: Screenshot Preview */}
            <div className="border border-line rounded-2xl p-6 bg-secondary/40 backdrop-blur">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ImageIcon size={18} className="text-main" />
                Website Screenshot
              </h2>

              {data.screenshot ? (
                <img
                  src={data.screenshot}
                  alt="Website screenshot"
                  className="rounded-xl w-full border border-line"
                />
              ) : (
                <p className="text-muted text-sm">No screenshot available.</p>
              )}
            </div>
          </div>
        )}

        {/* Social preview mockups section (simple + clean) */}
        {data && (
          <div className="mt-16">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <LinkIcon size={18} className="text-main" />
              Social Previews
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* WhatsApp */}
              <PreviewCard
                title="WhatsApp Preview"
                data={data}
                platform="whatsapp"
              />

              {/* Twitter */}
              <PreviewCard
                title="Twitter / X Card"
                data={data}
                platform="twitter"
              />

              {/* Discord */}
              <PreviewCard
                title="Discord Embed"
                data={data}
                platform="discord"
              />

              {/* Facebook */}
              <PreviewCard
                title="Facebook Preview"
                data={data}
                platform="facebook"
              />

              {/* LinkedIn */}
              <PreviewCard
                title="LinkedIn Card"
                data={data}
                platform="linkedin"
              />

            </div>
          </div>
        )}
      </div>
    </Pattern>
  );
}

/* ---------------------------------------------
   Social Preview Card Component (beautiful, neat)
-----------------------------------------------*/
function PreviewCard({
  title,
  data,
  platform,
}: {
  title: string;
  data: any;
  platform: string;
}) {
  return (
    <div className="border border-line rounded-xl p-4 bg-secondary/40 backdrop-blur">
      <p className="text-sm font-medium mb-3">{title}</p>

      <div className="rounded-lg border border-line bg-secondary/60 p-3 text-left text-sm">
        <p className="font-semibold truncate">{data.title || "Untitled"}</p>
        <p className="text-muted text-xs mt-1 line-clamp-2">
          {data.description || "No description available"}
        </p>

        {data.image && (
          <img
            src={data.image}
            alt="preview"
            className="rounded-md w-full mt-3 border border-line"
          />
        )}

        <p className="text-[11px] text-muted mt-2">{data.domain}</p>
      </div>
    </div>
  );
}