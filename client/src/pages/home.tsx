import React, { useState, useEffect } from "react";
import { EmployeeProfileForm } from "@shared/schema";
import EmployeeForm from "@/components/employee-form";
import ProfilePreview from "@/components/profile-preview";
import { downloadAsImage } from "@/lib/downloadAsImage";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const [profileData, setProfileData] = useState<EmployeeProfileForm>({
    name: "",
    birthdate: "",
    previousJob: "",
    hobby: "",
    skill: "",
    personality: "",
    motto: "",
    comment: "",
    photoUrl: "",
    cardStyle: "blue",
    layoutStyle: "standard",
  });
  
  const [isDownloading, setIsDownloading] = useState(false);
  
  // モバイル用のタブ切り替え（'form'か'preview'）
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  
  // isMobileフックを使用（レスポンシブな操作性の向上）
  const isMobile = useIsMobile();
  
  // ダウンロード成功時にプレビュータブに自動切り替え（モバイルの場合）
  useEffect(() => {
    if (isMobile && isDownloading === false) {
      setActiveTab('preview');
    }
  }, [isDownloading, isMobile]);

  const handleFormSubmit = (data: EmployeeProfileForm) => {
    setProfileData(data);
  };

  const handleFormReset = () => {
    setProfileData({
      name: "",
      birthdate: "",
      previousJob: "",
      hobby: "",
      skill: "",
      personality: "",
      motto: "",
      comment: "",
      photoUrl: "",
      cardStyle: "blue",
      layoutStyle: "standard",
    });
  };

  const handleDownload = () => {
    const fileName = profileData.name ? profileData.name.replace(/\s+/g, "_") : "employee";
    downloadAsImage("profileCard", fileName, setIsDownloading);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary">
                  First Impression
                </span>
              </h1>
              <div className="absolute -top-3 -right-5 bg-gradient-to-br from-primary to-blue-500 text-white text-xs px-2 py-1 rounded-full transform rotate-12">
                Beta
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-1">
            写真とプロフィール情報を入力して、新入社員のためのおしゃれな紹介ページを作成
          </p>
          <p className="text-sm text-muted-foreground">新入社員紹介ジェネレーター</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* モバイルで表示するタブ切り替え（デスクトップでは表示しない） */}
          <div className="lg:hidden w-full mb-6">
            <div className="flex rounded-lg overflow-hidden border border-border">
              <button
                className={`flex-1 py-3 text-center font-medium transition-colors ${
                  activeTab === 'form' 
                    ? 'bg-primary text-white' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
                onClick={() => setActiveTab('form')}
              >
                編集
              </button>
              <button
                className={`flex-1 py-3 text-center font-medium transition-colors ${
                  activeTab === 'preview' 
                    ? 'bg-primary text-white' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
                onClick={() => setActiveTab('preview')}
              >
                プレビュー
              </button>
            </div>
          </div>
          
          {/* フォーム部分 - モバイルではタブに応じて表示/非表示 */}
          <div className={`w-full lg:w-1/2 mb-6 lg:mb-0 ${activeTab === 'form' ? 'block' : 'hidden lg:block'}`}>
            <EmployeeForm 
              defaultValues={profileData} 
              onSubmit={handleFormSubmit} 
              onReset={handleFormReset}
              onSwitchToPreview={() => setActiveTab('preview')}
            />
          </div>
          
          {/* プレビュー部分 - モバイルではタブに応じて表示/非表示 */}
          <div className={`w-full lg:w-1/2 ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
            {/* モバイルでのみ表示する戻るボタン */}
            {isMobile && activeTab === 'preview' && (
              <button 
                onClick={() => setActiveTab('form')}
                className="mb-4 flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
                編集に戻る
              </button>
            )}
            
            <ProfilePreview 
              data={profileData} 
              isDownloading={isDownloading}
              onDownload={handleDownload}
            />
          </div>
        </div>

        <footer className="mt-16 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} First Impression</p>
        </footer>
      </div>
    </div>
  );
}
