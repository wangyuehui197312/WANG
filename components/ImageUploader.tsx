"use client";

import { useRef } from "react";

type Props = {
  previewUrl: string | null;
  onFileChange: (file: File | null) => void;
};

export default function ImageUploader({ previewUrl, onFileChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-xl border border-clay/25 bg-white p-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full rounded-lg bg-pine px-4 py-3 text-white hover:opacity-90"
      >
        选择图片（JPG / PNG / WEBP）
      </button>
      {previewUrl && (
        <img src={previewUrl} alt="预览图" className="mt-4 max-h-80 w-full rounded-lg object-contain" />
      )}
    </div>
  );
}
