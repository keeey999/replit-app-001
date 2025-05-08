import React, { useState, useEffect } from "react";
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
    { id: "blue", name: "ブルー", color: "bg-gradient-to-r from-blue-600 to-blue-400", hex: "#3b82f6" },
    { id: "green", name: "グリーン", color: "bg-gradient-to-r from-green-600 to-green-400", hex: "#22c55e" },
    { id: "amber", name: "アンバー", color: "bg-gradient-to-r from-amber-600 to-amber-400", hex: "#f59e0b" },
    { id: "purple", name: "パープル", color: "bg-gradient-to-r from-purple-600 to-purple-400", hex: "#9333ea" },
    { id: "pink", name: "ピンク", color: "bg-gradient-to-r from-pink-600 to-pink-400", hex: "#ec4899" },
    { id: "red", name: "レッド", color: "bg-gradient-to-r from-red-600 to-red-400", hex: "#ef4444" },
    { id: "custom", name: "カスタム", color: "", hex: "" },
  ];

  const layoutStyles = [
    { id: "standard", name: "スタンダード", icon: "A" },
    { id: "modern", name: "モダン", icon: "B" },
    { id: "compact", name: "コンパクト", icon: "C" },
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

  // カスタムカラーを保存するための状態
  const [customColor, setCustomColor] = useState<string>("#6366f1"); // デフォルトはインディゴ色
  
  // Map of style names to gradient classes
  const styleMap = {
    blue: "from-blue-600 to-blue-400",
    green: "from-green-600 to-green-400",
    amber: "from-amber-600 to-amber-400",
    purple: "from-purple-600 to-purple-400",
    pink: "from-pink-600 to-pink-400",
    red: "from-red-600 to-red-400",
    custom: `from-[${customColor}] to-[${adjustColorBrightness(customColor, 40)}]`,
  };
  
  // カスタムカラーの場合はインラインスタイルで対応
  const isCustomColor = cardStyle === 'custom' || !styleMap[cardStyle as keyof typeof styleMap];
  const gradientStyle = isCustomColor 
    ? "" // カスタムカラーの場合はここでは設定せず、inlineStyleで直接設定
    : styleMap[cardStyle as keyof typeof styleMap] || "from-blue-600 to-blue-400";
    
  // カスタムカラー用に色の明るさを調整する関数
  function adjustColorBrightness(hex: string, percent: number) {
    // #から始まる場合は取り除く
    hex = hex.replace(/^#/, '');
    
    // 16進数を10進数のRGB値に変換
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    // 明るさを調整（正の値で明るく、負の値で暗く）
    r = Math.min(255, Math.max(0, r + percent));
    g = Math.min(255, Math.max(0, g + percent));
    b = Math.min(255, Math.max(0, b + percent));
    
    // 10進数を16進数に戻す
    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');
    
    return `#${rHex}${gHex}${bHex}`;
  }
  
  // カスタムカラー用のグラデーションスタイル
  const customGradientStyle = {
    background: isCustomColor 
      ? `linear-gradient(to bottom right, ${customColor}, ${adjustColorBrightness(customColor, 40)})`
      : undefined
  };

  // レイアウトスタイルに応じたコンテンツをレンダリング
  const renderContent = () => {
    switch (layoutStyle) {
      case "modern":
        return (
          <div id="profileCard" className="border border-border rounded-xl overflow-hidden shadow-xl" style={{ minHeight: "540px" }}>
            {/* 背景の円形パターンが動くアニメーション効果 */}
            <div className={`bg-gradient-to-br ${gradientStyle} h-72 relative overflow-hidden`}>
              {/* 装飾的な円形要素 */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute top-40 -left-20 w-40 h-40 bg-white/10 rounded-full blur-lg"></div>
              <div className="absolute top-20 right-1/3 w-16 h-16 bg-white/20 rounded-full blur-sm"></div>
              
              <div className="absolute top-6 left-6 z-10">
                <h3 className="text-xl font-bold text-white tracking-wide flex items-center">
                  <span className="bg-white/20 rounded-lg p-1 mr-2">FI</span> 
                  First Impression
                </h3>
              </div>
              
              {/* センターの写真エリア - 微妙に浮かび上がるような影効果 */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pt-6">
                <div className="w-40 h-40 bg-white rounded-full p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.2)] overflow-hidden transform transition-transform duration-500 hover:scale-105">
                  <div className="w-full h-full rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden relative group">
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
                    {/* 写真上のホバー効果 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                      <span className="text-white text-xs font-medium">{name || "プロフィール"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 relative">
              <div className="text-center mb-8 relative">
                {/* 名前部分の装飾 */}
                <div className="absolute w-12 h-1 bg-gradient-to-r from-primary/80 to-transparent rounded-full left-1/2 -translate-x-1/2 -top-2"></div>
                <h3 className="text-2xl font-bold text-foreground tracking-tight">
                  {name || "お名前"}
                </h3>
                <p className="text-muted-foreground mt-1 flex items-center justify-center gap-1">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-70"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  {birthdate ? formatDate(birthdate) : "生年月日"}
                </p>
              </div>
              
              {/* カード形式のプロフィール情報 */}
              <div className="grid grid-cols-1 gap-6">
                <div className="border border-border rounded-lg p-4 shadow-sm bg-background/50 hover:bg-accent/10 transition-colors">
                  <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1.5"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    前職の紹介
                  </h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(previousJob)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-border rounded-lg p-4 shadow-sm bg-background/50 hover:bg-accent/10 transition-colors">
                    <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1.5"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <path d="M12 17h.01"></path>
                      </svg>
                      趣味
                    </h4>
                    <p className="text-foreground whitespace-pre-line text-sm">{getEmptyProfileValue(hobby)}</p>
                  </div>
                  
                  <div className="border border-border rounded-lg p-4 shadow-sm bg-background/50 hover:bg-accent/10 transition-colors">
                    <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1.5"
                      >
                        <path d="M12 2v4"></path>
                        <path d="m16 3 1 3"></path>
                        <path d="m8 3-1 3"></path>
                        <path d="m20 8-3 1"></path>
                        <path d="m4 8 3 1"></path>
                        <path d="m20 16-3-1"></path>
                        <path d="m4 16 3-1"></path>
                        <path d="m16 21-1-3"></path>
                        <path d="m8 21 1-3"></path>
                        <path d="M12 22v-4"></path>
                        <circle cx="12" cy="12" r="5"></circle>
                      </svg>
                      特技
                    </h4>
                    <p className="text-foreground whitespace-pre-line text-sm">{getEmptyProfileValue(skill)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-border rounded-lg p-4 shadow-sm bg-background/50 hover:bg-accent/10 transition-colors">
                    <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1.5"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" x2="9.01" y1="9" y2="9"></line>
                        <line x1="15" x2="15.01" y1="9" y2="9"></line>
                      </svg>
                      性格
                    </h4>
                    <p className="text-foreground whitespace-pre-line text-sm">{getEmptyProfileValue(personality)}</p>
                  </div>
                  
                  <div className="border border-border rounded-lg p-4 shadow-sm bg-background/50 hover:bg-accent/10 transition-colors">
                    <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1.5"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                      座右の銘
                    </h4>
                    <p className="text-foreground whitespace-pre-line text-sm">{getEmptyProfileValue(motto)}</p>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg p-4 shadow-sm bg-background/50 hover:bg-accent/10 transition-colors">
                  <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1.5"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    コメント
                  </h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(comment)}</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "compact":
        return (
          <div id="profileCard" className="border border-border rounded-xl overflow-hidden shadow-lg" style={{ minHeight: "540px" }}>
            {/* サイドカラム付きレイアウト */}
            <div className="grid grid-cols-12 h-full">
              {/* サイドバー部分 */}
              <div className={`col-span-4 bg-gradient-to-b ${gradientStyle} p-5 flex flex-col relative h-full`}>
                {/* 背景装飾 */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
                
                {/* ロゴエリア */}
                <div className="relative mb-6 z-10">
                  <div className="inline-flex items-center bg-black/20 backdrop-blur-md rounded px-2 py-1.5">
                    <span className="text-white text-xs font-bold tracking-wider">FIRST IMPRESSION</span>
                  </div>
                </div>
                
                {/* プロフィール写真 */}
                <div className="mx-auto w-32 h-32 mb-5 relative z-10 group">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/60 to-blue-500/60 transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                  <div className="absolute inset-0 rounded-xl bg-white"></div>
                  <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center relative bg-white p-2">
                    {photoUrl ? (
                      <img 
                        src={photoUrl} 
                        alt={name || "プロフィール写真"} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-accent/20 rounded-lg">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="40" 
                          height="40" 
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
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 名前と誕生日 */}
                <div className="text-center z-10 mt-2">
                  <h3 className="text-lg font-bold text-white drop-shadow-sm">
                    {name || "お名前"}
                  </h3>
                  <div className="inline-flex items-center mt-2 bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1.5 text-white/90"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    <span className="text-white text-xs font-medium">
                      {birthdate ? formatDate(birthdate) : "生年月日"}
                    </span>
                  </div>
                </div>
                
                {/* 区切り線 */}
                <div className="w-16 h-0.5 bg-white/30 mx-auto mt-5 mb-5 rounded-full"></div>
                
                {/* サイドバーのコンテンツ */}
                <div className="mt-auto z-10">
                  <div className="space-y-3 text-white/90">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg"
                          width="12" 
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1.5"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        座右の銘
                      </h4>
                      <p className="text-white text-xs whitespace-pre-line">{getEmptyProfileValue(motto)}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg"
                          width="12" 
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1.5"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                          <line x1="9" x2="9.01" y1="9" y2="9"></line>
                          <line x1="15" x2="15.01" y1="9" y2="9"></line>
                        </svg>
                        性格
                      </h4>
                      <p className="text-white text-xs whitespace-pre-line">{getEmptyProfileValue(personality)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* メインコンテンツエリア */}
              <div className="col-span-8 p-5 bg-white">
                {/* テーブル風レイアウト */}
                <div className="flex flex-col gap-4">
                  <div className="border-b border-border pb-4">
                    <div className="flex items-center mb-1">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-2">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg"
                          width="14" 
                          height="14"
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
                      <h4 className="text-sm font-medium">前職の紹介</h4>
                    </div>
                    <p className="text-foreground text-sm whitespace-pre-line pl-8">{getEmptyProfileValue(previousJob)}</p>
                  </div>
                  
                  <div className="border-b border-border pb-4">
                    <div className="flex items-center mb-1">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-2">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg"
                          width="14" 
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                          <path d="M12 17h.01"></path>
                        </svg>
                      </div>
                      <h4 className="text-sm font-medium">趣味</h4>
                    </div>
                    <p className="text-foreground text-sm whitespace-pre-line pl-8">{getEmptyProfileValue(hobby)}</p>
                  </div>
                  
                  <div className="border-b border-border pb-4">
                    <div className="flex items-center mb-1">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-2">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg"
                          width="14" 
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2v4"></path>
                          <path d="m16 3 1 3"></path>
                          <path d="m8 3-1 3"></path>
                          <path d="m20 8-3 1"></path>
                          <path d="m4 8 3 1"></path>
                          <path d="m20 16-3-1"></path>
                          <path d="m4 16 3-1"></path>
                          <path d="m16 21-1-3"></path>
                          <path d="m8 21 1-3"></path>
                          <path d="M12 22v-4"></path>
                          <circle cx="12" cy="12" r="5"></circle>
                        </svg>
                      </div>
                      <h4 className="text-sm font-medium">特技</h4>
                    </div>
                    <p className="text-foreground text-sm whitespace-pre-line pl-8">{getEmptyProfileValue(skill)}</p>
                  </div>
                  
                  <div className="pb-4">
                    <div className="flex items-center mb-1">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-2">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg"
                          width="14" 
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                      <h4 className="text-sm font-medium">コメント</h4>
                    </div>
                    <p className="text-foreground text-sm whitespace-pre-line pl-8">{getEmptyProfileValue(comment)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default: // standard
        return (
          <div id="profileCard" className="border border-border rounded-xl overflow-hidden shadow-lg" style={{ minHeight: "540px" }}>
            <div className={`bg-gradient-to-br ${gradientStyle} p-8 pb-32 relative`}>
              {/* 背景装飾 */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="absolute -top-20 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
              <div className="absolute bottom-5 left-5 w-20 h-20 bg-white/5 rounded-full"></div>
              <div className="relative flex justify-between items-start">
                <h3 className="text-xl font-bold text-white">First Impression</h3>
                <div className="bg-white/20 text-white px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm">
                  New
                </div>
              </div>
              
              {/* 上部波形装飾 - アクセントとして */}
              <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 320" className="absolute w-full h-full">
                  <path 
                    fill="white" 
                    fillOpacity="1" 
                    d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  ></path>
                </svg>
              </div>
            </div>
            
            <div className="px-8 pt-0 pb-8 bg-white">
              <div className="flex flex-col items-center -mt-16 mb-6">
                <div className="w-32 h-32 bg-white rounded-full p-1.5 shadow-xl overflow-hidden relative z-10">
                  <div className="w-full h-full rounded-full bg-neutral-100 overflow-hidden flex items-center justify-center group">
                    {photoUrl ? (
                      <img 
                        src={photoUrl} 
                        alt={name || "プロフィール写真"} 
                        className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-110"
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
                
                <h3 className="text-2xl font-bold mt-5 text-foreground tracking-tight">
                  {name || "お名前"}
                </h3>
                <p className="text-muted-foreground flex items-center mt-1 text-sm">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1.5"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  {birthdate ? formatDate(birthdate) : "生年月日"}
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-5 mt-6">
                <div className="border-l-4 border-primary/30 pl-4 pb-4 hover:bg-accent/5 transition-colors duration-300 rounded-r">
                  <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      width="14" 
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1.5"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    前職の紹介
                  </h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(previousJob)}</p>
                </div>
                
                <div className="border-l-4 border-primary/30 pl-4 pb-4 hover:bg-accent/5 transition-colors duration-300 rounded-r">
                  <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      width="14" 
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1.5"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <path d="M12 17h.01"></path>
                    </svg>
                    趣味
                  </h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(hobby)}</p>
                </div>
                
                <div className="border-l-4 border-primary/30 pl-4 pb-4 hover:bg-accent/5 transition-colors duration-300 rounded-r">
                  <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      width="14" 
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1.5"
                    >
                      <path d="M12 2v4"></path>
                      <path d="m16 3 1 3"></path>
                      <path d="m8 3-1 3"></path>
                      <path d="m20 8-3 1"></path>
                      <path d="m4 8 3 1"></path>
                      <path d="m20 16-3-1"></path>
                      <path d="m4 16 3-1"></path>
                      <path d="m16 21-1-3"></path>
                      <path d="m8 21 1-3"></path>
                      <path d="M12 22v-4"></path>
                      <circle cx="12" cy="12" r="5"></circle>
                    </svg>
                    特技
                  </h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(skill)}</p>
                </div>
                
                <div className="border-l-4 border-primary/30 pl-4 pb-4 hover:bg-accent/5 transition-colors duration-300 rounded-r">
                  <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      width="14" 
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1.5"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                      <line x1="9" x2="9.01" y1="9" y2="9"></line>
                      <line x1="15" x2="15.01" y1="9" y2="9"></line>
                    </svg>
                    性格
                  </h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(personality)}</p>
                </div>
                
                <div className="border-l-4 border-primary/30 pl-4 pb-4 hover:bg-accent/5 transition-colors duration-300 rounded-r">
                  <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      width="14" 
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1.5"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                    座右の銘
                  </h4>
                  <p className="text-foreground whitespace-pre-line">{getEmptyProfileValue(motto)}</p>
                </div>
                
                <div className="border-l-4 border-primary/30 pl-4 pb-4 hover:bg-accent/5 transition-colors duration-300 rounded-r">
                  <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      width="14" 
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1.5"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    コメント
                  </h4>
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
        <div className="space-y-4 sm:space-y-6 border border-border p-3 sm:p-5 rounded-lg bg-white mb-6 shadow-sm">
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
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {cardStyles.map((style) => (
                <div
                  key={style.id}
                  onClick={() => {
                    // カスタムカラー選択時は色選択UIを表示するだけでスタイル更新はしない
                    if (style.id === 'custom') {
                      // すでにカスタムカラーが選択されている場合は何もしない
                      if (cardStyle !== 'custom') {
                        handleStyleUpdate('cardStyle', 'custom');
                      }
                    } else {
                      handleStyleUpdate('cardStyle', style.id);
                    }
                  }}
                  className={`cursor-pointer border-2 ${
                    cardStyle === style.id
                      ? "border-primary"
                      : "border-transparent"
                  } hover:border-primary rounded-lg p-2 sm:p-3 shadow-sm transition-all transform hover:scale-105 active:scale-95`}
                >
                  {style.id === 'custom' ? (
                    <div className="h-12 sm:h-14 rounded-md mb-2 relative overflow-hidden" 
                      style={{ background: `linear-gradient(to right, #f44336, #e91e63, #9c27b0, #3f51b5, #2196f3, #00bcd4, #009688, #4caf50, #ffeb3b, #ff9800, #ff5722)` }}>
                      {/* カスタムカラー用の色選択UI */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2v8"></path>
                          <path d="m4.93 10.93 1.41 1.41"></path>
                          <path d="M2 18h2"></path>
                          <path d="M20 18h2"></path>
                          <path d="m19.07 10.93-1.41 1.41"></path>
                          <path d="M22 22H2"></path>
                          <path d="m16 6-4 4-4-4"></path>
                          <path d="M16 18a4 4 0 0 0-8 0"></path>
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className={`h-12 sm:h-14 ${style.color} rounded-md mb-2`}></div>
                  )}
                  <div className="text-xs sm:text-sm text-center text-muted-foreground font-medium">
                    {style.name}
                  </div>
                </div>
              ))}
            </div>
            
            {/* カスタムカラー選択時に表示されるカラーピッカー */}
            {cardStyle === 'custom' && (
              <div className="mt-4 p-3 border border-border rounded-lg bg-accent/5">
                <label className="block text-xs font-medium mb-1.5">
                  カスタムカラーを選択
                </label>
                <div className="flex gap-3 items-center">
                  <div 
                    className="w-10 h-10 rounded-md border-2 border-border" 
                    style={{ backgroundColor: customColor }}
                  ></div>
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      // 色が変わったらカードスタイルを更新
                      const updatedData = { ...data, cardStyle: 'custom' };
                      if (onStyleChange) {
                        onStyleChange(updatedData);
                      }
                    }}
                    className="h-10 cursor-pointer bg-transparent"
                  />
                </div>
              </div>
            )}
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
                  } hover:border-primary rounded-lg p-2 sm:p-3 shadow-sm transition-all transform hover:scale-105 active:scale-95`}
                >
                  <div className="h-12 sm:h-14 bg-accent rounded-md mb-2 flex items-center justify-center">
                    <div className="text-base sm:text-lg font-bold text-primary">
                      {style.icon}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-center text-muted-foreground font-medium">
                    {style.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="preview-container relative rounded-xl overflow-hidden bg-white shadow-lg mb-4">
          {/* モバイルでのスクロールヒント（スマホのみ表示） */}
          {isMobile && (
            <div className="absolute top-2 right-2 z-20 bg-white/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full shadow-sm flex items-center text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M15 15 9 9"></path>
                <path d="M9 15 15 9"></path>
              </svg>
              スクロールできます
            </div>
          )}
          <div className={isMobile ? "overflow-auto max-h-[70vh] sm:max-h-full" : ""}>
            {renderContent()}
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 text-center">
          <Button 
            onClick={onDownload}
            disabled={!name || isDownloading}
            className="w-full sm:w-auto px-6 py-3 sm:py-2.5 h-auto text-base bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
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
    </div>
  );
}