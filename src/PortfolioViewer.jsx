
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PortfolioViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(800);
  const [error, setError] = useState(null);

  const pdfUrl =
    "/portfolio/Kapture-Visuals-Portfolio.pdf";

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setError(null);
  };

  const previousPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    setPageNumber((prev) =>
      Math.min(prev + 1, numPages || 1)
    );
  };

  return (
    <div className="w-full">

      {/* PDF Display */}

      <div
        className="flex min-h-[300px] items-center justify-center overflow-hidden rounded-2xl border border-black/10 bg-neutral-100"
        ref={(node) => {
          if (node) {
            const width = node.getBoundingClientRect().width;
            if (width > 0 && width !== containerWidth) {
              setContainerWidth(width);
            }
          }
        }}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(err) => setError(err.message)}
          loading={
            <p className="py-20 text-sm text-black/50">
              Loading portfolio...
            </p>
          }
          error={
            <p className="p-8 text-center text-sm text-red-600">
              Unable to load the portfolio.
              {error && ` ${error}`}
            </p>
          }
        >
          <Page
            pageNumber={pageNumber}
            width={Math.min(containerWidth - 32, 1100)}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading={
              <p className="py-20 text-sm text-black/50">
                Loading page...
              </p>
            }
          />
        </Document>
      </div>

      {/* Navigation Controls */}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">

        <button
          type="button"
          onClick={previousPage}
          disabled={pageNumber <= 1}
          className="rounded-full border border-black/15 px-5 py-3 text-sm font-semibold text-black transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Previous
        </button>

        <span className="text-sm font-medium text-black/60">
          Page {pageNumber} / {numPages || "—"}
        </span>

        <button
          type="button"
          onClick={nextPage}
          disabled={!numPages || pageNumber >= numPages}
          className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next →
        </button>

      </div>

    </div>
  );
}