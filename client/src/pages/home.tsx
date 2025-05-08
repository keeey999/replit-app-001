import React, { useState } from "react";
import { EmployeeProfileForm } from "@shared/schema";
import EmployeeForm from "@/components/employee-form";
import ProfilePreview from "@/components/profile-preview";
import { downloadAsImage } from "@/lib/downloadAsImage";

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
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <EmployeeForm 
              defaultValues={profileData} 
              onSubmit={handleFormSubmit} 
              onReset={handleFormReset} 
            />
          </div>
          
          <div className="w-full lg:w-1/2">
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
