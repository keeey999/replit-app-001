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
          <h1 className="gradient-heading mb-4">新入社員紹介ジェネレーター</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            写真とプロフィール情報を入力して、新入社員のためのおしゃれな紹介ページを作成しましょう
          </p>
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
          <p>© {new Date().getFullYear()} 新入社員紹介ジェネレーター</p>
        </footer>
      </div>
    </div>
  );
}
