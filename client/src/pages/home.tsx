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
    <div className="bg-neutral-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">新入社員紹介ジェネレーター</h1>
          <p className="text-neutral-600">社員の情報を入力して、おしゃれな紹介ページを作成しましょう</p>
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

        <footer className="mt-12 text-center text-neutral-500 text-sm">
          <p>© {new Date().getFullYear()} 新入社員紹介ジェネレーター</p>
        </footer>
      </div>
    </div>
  );
}
