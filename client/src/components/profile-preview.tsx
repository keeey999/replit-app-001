import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { EmployeeProfileForm } from "@shared/schema";
import { formatDate, getEmptyProfileValue } from "@/lib/utils";

interface ProfilePreviewProps {
  data: EmployeeProfileForm;
  isDownloading: boolean;
  onDownload: () => void;
  onStyleChange?: (updatedData: EmployeeProfileForm) => void;
}

export default function ProfilePreview({ data, isDownloading, onDownload, onStyleChange }: ProfilePreviewProps) {
  // モバイル判定
  const [isMobile, setIsMobile] = useState(false);
  
  // 画面サイズの変更を検知
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // 初期チェック
    checkMobile();
    
    // リサイズイベントの監視
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // デザイン設定用の定数
  const cardStyles = [
    { id: "blue", name: "ブルー", color: "bg-gradient-to-r from-blue-600 to-blue-400" },
    { id: "green", name: "グリーン", color: "bg-gradient-to-r from-green-600 to-green-400" },
    { id: "amber", name: "アンバー", color: "bg-gradient-to-r from-amber-600 to-amber-400" },
  ];

  const layoutStyles = [
    { id: "standard", name: "スタンダード", icon: "Aa" },
    { id: "modern", name: "モダン", icon: "Aa" },
    { id: "compact", name: "コンパクト", icon: "Aa" },
  ];

  const {
    name,
    birthdate,
    previousJob,
    hobby,
    skill,
    personality,
    motto,
    comment,
    photoUrl,
    cardStyle,
    layoutStyle,
  } = data;

  // Map of style names to gradient classes
  const styleMap = {
    blue: "from-blue-600 to-blue-400",
    green: "from-green-600 to-green-400",
    amber: "from-amber-600 to-amber-400",
  };

  const gradientStyle = styleMap[cardStyle as keyof typeof styleMap] || "from-blue-600 to-blue-400";

  // レイアウトスタイルに応じたコンテンツをレンダリング
  const renderContent = () => {
    switch (layoutStyle) {
      case "modern":
        return (
          <div id="profileCard" className="border border-border rounded-xl overflow-hidden shadow-lg" style={{ minHeight: "540px" }}>
            <div className={`bg-gradient-to-br ${gradientStyle} h-60 relative`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="absolute top-6 left-6">
                <h3 className="text-xl font-bold text-white">First Impression</h3>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-36 bg-white rounded-full p-1 shadow-xl overflow-hidden">
                  <div className="w-full h-full rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                    {photoUrl ? (
                      <img 
                        src={photoUrl} 
                        alt={name || "プロフィール写真"} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="60" 
                        height="60" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-neutral-300"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground">
                  {name || "お名前"}
                </h3>
                <p className="text-muted-foreground mt-1">
                  {birthdate ? formatDate(birthdate) : "生年月日"}
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-5">
                <div className="border-b border-border pb-4">
                  <h4 className="text-sm font-medium text-primary mb-2">前職の紹介</h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(previousJob)}</p>
                </div>
                
                <div className="border-b border-border pb-4">
                  <h4 className="text-sm font-medium text-primary mb-2">趣味</h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(hobby)}</p>
                </div>
                
                <div className="border-b border-border pb-4">
                  <h4 className="text-sm font-medium text-primary mb-2">特技</h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(skill)}</p>
                </div>
                
                <div className="border-b border-border pb-4">
                  <h4 className="text-sm font-medium text-primary mb-2">性格</h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(personality)}</p>
                </div>
                
                <div className="border-b border-border pb-4">
                  <h4 className="text-sm font-medium text-primary mb-2">座右の銘</h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(motto)}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-primary mb-2">コメント</h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(comment)}</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "compact":
        return (
          <div id="profileCard" className="border border-border rounded-xl overflow-hidden shadow-lg" style={{ minHeight: "540px" }}>
            <div className={`bg-gradient-to-r ${gradientStyle} p-6 flex items-center gap-6`}>
              <div className="w-20 h-20 bg-white rounded-full p-1 shadow-lg overflow-hidden flex-shrink-0">
                <div className="w-full h-full rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
                  {photoUrl ? (
                    <img 
                      src={photoUrl} 
                      alt={name || "プロフィール写真"} 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="30" 
                      height="30" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-neutral-300"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <div className="mb-1">
                  <div className="text-sm text-white opacity-80">First Impression</div>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {name || "お名前"}
                </h3>
                <p className="text-white text-sm opacity-90 mt-1">
                  {birthdate ? formatDate(birthdate) : "生年月日"}
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                <div className="border-b border-border pb-3">
                  <h4 className="text-sm font-medium text-primary mb-1">前職の紹介</h4>
                  <p className="text-foreground text-sm whitespace-pre-line">{getEmptyProfileValue(previousJob)}</p>
                </div>
                
                <div className="border-b border-border pb-3">
                  <h4 className="text-sm font-medium text-primary mb-1">趣味</h4>
                  <p className="text-foreground text-sm whitespace-pre-line">{getEmptyProfileValue(hobby)}</p>
                </div>
                
                <div className="border-b border-border pb-3">
                  <h4 className="text-sm font-medium text-primary mb-1">特技</h4>
                  <p className="text-foreground text-sm whitespace-pre-line">{getEmptyProfileValue(skill)}</p>
                </div>
                
                <div className="border-b border-border pb-3">
                  <h4 className="text-sm font-medium text-primary mb-1">性格</h4>
                  <p className="text-foreground text-sm whitespace-pre-line">{getEmptyProfileValue(personality)}</p>
                </div>
                
                <div className="border-b border-border pb-3">
                  <h4 className="text-sm font-medium text-primary mb-1">座右の銘</h4>
                  <p className="text-foreground text-sm whitespace-pre-line">{getEmptyProfileValue(motto)}</p>
                </div>
                
                <div className="border-b border-border pb-3">
                  <h4 className="text-sm font-medium text-primary mb-1">コメント</h4>
                  <p className="text-foreground text-sm whitespace-pre-line">{getEmptyProfileValue(comment)}</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      default: // standard
        return (
          <div id="profileCard" className="border border-border rounded-xl overflow-hidden shadow-lg" style={{ minHeight: "540px" }}>
            <div className={`bg-gradient-to-br ${gradientStyle} p-8 pb-20 relative`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative">
                <h3 className="text-xl font-bold text-white">First Impression</h3>
              </div>
            </div>
            <div className="px-8 pt-0 pb-8">
              <div className="flex flex-col items-center -mt-20 mb-6">
                <div className="w-28 h-28 relative bg-white rounded-full p-1 shadow-xl overflow-hidden">
                  <div className="w-full h-full rounded-full bg-neutral-100 overflow-hidden flex items-center justify-center">
                    {photoUrl ? (
                      <img 
                        src={photoUrl} 
                        alt={name || "プロフィール写真"} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="48" 
                        height="48" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-neutral-300"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mt-4 text-foreground">
                  {name || "お名前"}
                </h3>
                <p className="text-muted-foreground">
                  {birthdate ? formatDate(birthdate) : "生年月日"}
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-5 mt-6">
                <div className="border-b border-border pb-4">
                  <h4 className="text-sm font-medium text-primary mb-2">前職の紹介</h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(previousJob)}</p>
                </div>
                
                <div className="border-b border-border pb-4">
                  <h4 className="text-sm font-medium text-primary mb-2">趣味</h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(hobby)}</p>
                </div>
                
                <div className="border-b border-border pb-4">
                  <h4 className="text-sm font-medium text-primary mb-2">特技</h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(skill)}</p>
                </div>
                
                <div className="border-b border-border pb-4">
                  <h4 className="text-sm font-medium text-primary mb-2">性格</h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(personality)}</p>
                </div>
                
                <div className="border-b border-border pb-4">
                  <h4 className="text-sm font-medium text-primary mb-2">座右の銘</h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(motto)}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-primary mb-2">コメント</h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(comment)}</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  // レイアウトとテーマの更新関数
  const handleStyleUpdate = (styleType: 'cardStyle' | 'layoutStyle', value: string) => {
    // クローンしたデータオブジェクトを作成して更新
    const updatedData = { ...data, [styleType]: value };
    // 親コンポーネントに変更を通知
    if (onStyleChange) {
      onStyleChange(updatedData);
    } else {
      // 互換性のため、onStyleChangeが未定義の場合はonDownloadを使用
      onDownload();
    }
  };

  return (
    <div className="w-full">
      <div className="sticky top-8">
        <Card className="bg-white p-4 sm:p-6 md:p-8 mb-6 card-shadow rounded-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="22" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 sm:mr-3 text-primary"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              <circle cx="10" cy="13" r="2"></circle>
              <path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22"></path>
            </svg>
            プレビュー
          </h2>
          
          {/* デザイン設定部分 */}
          <div className="space-y-4 sm:space-y-6 border border-border p-3 sm:p-4 rounded-lg bg-accent/30 mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 text-primary"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                <path d="M3 9h18"></path>
                <path d="M9 21V9"></path>
              </svg>
              デザイン設定
            </h3>
            
            <div>
              <h4 className="font-medium mb-2 text-sm sm:text-base">カラーテーマ</h4>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {cardStyles.map((style) => (
                  <div
                    key={style.id}
                    onClick={() => handleStyleUpdate('cardStyle', style.id)}
                    className={`cursor-pointer border-2 ${
                      cardStyle === style.id
                        ? "border-primary"
                        : "border-transparent"
                    } hover:border-primary rounded-lg p-2 shadow-sm transition-all transform hover:scale-105 active:scale-95`}
                  >
                    <div className={`h-10 sm:h-12 ${style.color} rounded-md mb-2`}></div>
                    <div className="text-xs text-center text-muted-foreground font-medium">
                      {style.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-sm sm:text-base">レイアウト</h4>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {layoutStyles.map((style) => (
                  <div
                    key={style.id}
                    onClick={() => handleStyleUpdate('layoutStyle', style.id)}
                    className={`cursor-pointer border-2 ${
                      layoutStyle === style.id
                        ? "border-primary"
                        : "border-transparent"
                    } hover:border-primary rounded-lg p-2 shadow-sm transition-all transform hover:scale-105 active:scale-95`}
                  >
                    <div className="h-10 sm:h-14 bg-accent rounded-md mb-2 flex items-center justify-center">
                      <div className="text-base sm:text-lg font-bold text-primary">
                        {style.icon}
                      </div>
                    </div>
                    <div className="text-xs text-center text-muted-foreground font-medium">
                      {style.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="preview-container relative rounded-xl overflow-hidden bg-white max-w-full">
            {renderContent()}

            <div className="mt-8 text-center">
              <Button 
                onClick={onDownload}
                disabled={!name || isDownloading}
                className="px-6 py-2.5 h-auto text-base bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
              >
                {isDownloading ? (
                  <>
                    <svg 
                      className="animate-spin -ml-1 mr-3 h-5 w-5" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    生成中...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    画像としてダウンロード
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
