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

  // 画像の圧縮処理を行う関数
  const compressImage = useCallback((file: File, maxSizeMB: number): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (!e.target?.result) {
          reject(new Error("画像の読み込みに失敗しました"));
          return;
        }
        
        img.src = e.target.result as string;
        img.onload = () => {
          // 元の画像サイズを取得
          let width = img.width;
          let height = img.height;
          
          // 最大幅/高さを設定（あまり小さくすると画質が落ちすぎる）
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1920;
          
          // 画像が大きすぎる場合はリサイズ
          if (width > MAX_WIDTH || height > MAX_HEIGHT) {
            if (width > height) {
              height = Math.round(height * (MAX_WIDTH / width));
              width = MAX_WIDTH;
            } else {
              width = Math.round(width * (MAX_HEIGHT / height));
              height = MAX_HEIGHT;
            }
          }
          
          // Canvasを使って画像を描画
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error("Canvas context の取得に失敗しました"));
            return;
          }
          
          // 画像を描画
          ctx.drawImage(img, 0, 0, width, height);
          
          // 画質を調整（0.7-0.9が一般的な品質と圧縮率のバランス）
          let quality = 0.9;
          
          // File APIでBlobに変換
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error("画像の変換に失敗しました"));
              return;
            }
            
            // 圧縮後のファイルを作成
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            
            resolve(compressedFile);
          }, file.type, quality);
        };
        
        img.onerror = () => {
          reject(new Error("画像の読み込みに失敗しました"));
        };
      };
      
      reader.onerror = () => {
        reject(new Error("ファイルの読み込みに失敗しました"));
      };
      
      reader.readAsDataURL(file);
    });
  }, []);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      // 複数ファイルがドロップされた場合は最初のファイルのみを使用
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
      
      // Check file size (max 10MB)
      const MAX_SIZE = 10 * 1024 * 1024; // 10MB
      if (file.size > MAX_SIZE) {
        toast({
          title: "ファイルサイズエラー",
          description: `画像サイズが10MBを超えています（${(file.size / (1024 * 1024)).toFixed(1)}MB）。より小さいファイルを選択してください。`,
          variant: "destructive",
        });
        return;
      }
      
      setIsUploading(true);
      
      try {
        // 大きいファイルは圧縮する（2MB以上の場合）
        let processedFile = file;
        if (file.size > 2 * 1024 * 1024) {
          try {
            processedFile = await compressImage(file, 2);
            const originalSize = (file.size / (1024 * 1024)).toFixed(1);
            const compressedSize = (processedFile.size / (1024 * 1024)).toFixed(1);
            console.log(`画像を圧縮しました: ${originalSize}MB → ${compressedSize}MB`);
            
            // 圧縮処理が完了したらトースト通知
            toast({
              title: "画像を最適化しました",
              description: `元のサイズ: ${originalSize}MB → 最適化後: ${compressedSize}MB`,
            });
          } catch (error) {
            console.error('画像の圧縮に失敗しました:', error);
            // 圧縮に失敗しても元のファイルを使用して続行
          }
        }
        
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
        reader.readAsDataURL(processedFile);
      } catch (error) {
        console.error('ファイル処理エラー:', error);
        toast({
          title: "エラー",
          description: "ファイルの処理中にエラーが発生しました。もう一度お試しください。",
          variant: "destructive",
        });
        setIsUploading(false);
      }
    },
    [onChange, compressImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-3">
      <Label className="font-medium">写真</Label>
      <div className="flex items-start gap-5">
        <div className="relative w-28 h-28 flex-shrink-0">
          <div className="w-28 h-28 border-2 border-border rounded-lg flex items-center justify-center overflow-hidden bg-accent shadow-sm">
            {value ? (
              <img
                src={value}
                alt="プロフィール写真"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center text-muted-foreground">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="44" 
                  height="44" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="1.5"
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
              "flex flex-col items-center justify-center w-full h-20 sm:h-16 px-4 transition bg-white border-2 border-border border-dashed rounded-lg appearance-none cursor-pointer hover:border-primary focus:outline-none",
              isDragActive && "border-primary bg-primary/5",
              isUploading && "opacity-50 cursor-not-allowed"
            )}
          >
            <input 
              {...getInputProps()} 
              disabled={isUploading} 
              multiple={false} 
              accept="image/*" 
              capture="environment" 
            />
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">
                {isUploading
                  ? "アップロード中..."
                  : isDragActive
                  ? "ドロップ"
                  : (
                    <>
                      <span className="hidden sm:inline">ドラッグ&ドロップまたはクリック</span>
                      <span className="inline sm:hidden">タップして写真を選択</span>
                    </>
                  )}
              </span>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            JPG, PNG, GIF のみ・1ファイル・最大 10MB まで
            <span className="hidden sm:inline"> • スマホの方はカメラで撮影も可能</span>
          </p>
        </div>
      </div>
    </div>
  );
}
