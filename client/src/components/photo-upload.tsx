import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface PhotoUploadProps {
  value: string | undefined;
  onChange: (url: string) => void;
}

export default function PhotoUpload({ value, onChange }: PhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      
      if (!file) return;
      
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        toast({
          title: "ファイルタイプエラー",
          description: "画像ファイルを選択してください。",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "ファイルサイズエラー",
          description: "画像サイズが2MBを超えています。より小さいファイルを選択してください。",
          variant: "destructive",
        });
        return;
      }
      
      setIsUploading(true);
      
      // Convert file to data URL
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onChange(reader.result);
          setIsUploading(false);
        }
      };
      reader.onerror = () => {
        toast({
          title: "読み込みエラー",
          description: "ファイルの読み込み中にエラーが発生しました。もう一度お試しください。",
          variant: "destructive",
        });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-2">
      <Label className="font-medium">写真</Label>
      <div className="flex items-start gap-4">
        <div className="relative w-24 h-24 flex-shrink-0">
          <div className="w-24 h-24 border-2 border-neutral-200 rounded-lg flex items-center justify-center overflow-hidden bg-neutral-50">
            {value ? (
              <img
                src={value}
                alt="プロフィール写真"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center text-neutral-300 text-4xl">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <div
            {...getRootProps()}
            className={cn(
              "flex flex-col items-center justify-center w-full h-12 px-4 transition bg-white border-2 border-neutral-200 border-dashed rounded-md appearance-none cursor-pointer hover:border-primary focus:outline-none",
              isDragActive && "border-primary bg-primary/5",
              isUploading && "opacity-50 cursor-not-allowed"
            )}
          >
            <input {...getInputProps()} disabled={isUploading} />
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-primary" />
              <span className="font-medium text-neutral-600">
                {isUploading
                  ? "アップロード中..."
                  : isDragActive
                  ? "ドロップしてアップロード"
                  : "写真をアップロード"}
              </span>
            </div>
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            JPG, PNG, GIF (最大 2MB)
          </p>
        </div>
      </div>
    </div>
  );
}
