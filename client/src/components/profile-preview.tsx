import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { EmployeeProfileForm } from "@shared/schema";
import { formatDate, getEmptyProfileValue } from "@/lib/utils";

interface ProfilePreviewProps {
  data: EmployeeProfileForm;
  isDownloading: boolean;
  onDownload: () => void;
}

export default function ProfilePreview({ data, isDownloading, onDownload }: ProfilePreviewProps) {
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
  } = data;

  // Map of style names to Tailwind classes
  const styleMap = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    amber: "bg-amber-500",
  };

  const headerStyle = styleMap[cardStyle as keyof typeof styleMap] || "bg-blue-500";

  return (
    <div className="w-full">
      <div className="sticky top-8">
        <Card className="bg-white p-6 mb-6">
          <h2 className="text-xl font-semibold text-neutral-800 mb-6 flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 text-primary"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              <circle cx="10" cy="13" r="2"></circle>
              <path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22"></path>
            </svg>
            プレビュー
          </h2>
          
          <div className="preview-container relative rounded-xl overflow-hidden bg-white">
            <div id="profileCard" className="border border-neutral-200 rounded-xl overflow-hidden" style={{ minHeight: "540px" }}>
              <div className={`h-24 ${headerStyle}`}></div>
              <div className="px-6 pt-0 pb-6">
                <div className="flex flex-col items-center -mt-12 mb-4">
                  <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg overflow-hidden">
                    <div className="w-full h-full rounded-full bg-neutral-100 flex items-center justify-center">
                      {photoUrl ? (
                        <img 
                          src={photoUrl} 
                          alt={name || "プロフィール写真"} 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
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
                          className="text-neutral-300"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mt-4 text-neutral-800">
                    {name || "お名前"}
                  </h3>
                  <p className="text-neutral-500 text-sm">
                    {birthdate ? formatDate(birthdate) : "生年月日"}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-4 mt-6">
                  <div className="border-b border-neutral-100 pb-3">
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">前職の紹介</h4>
                    <p className="text-neutral-800">{getEmptyProfileValue(previousJob)}</p>
                  </div>
                  
                  <div className="border-b border-neutral-100 pb-3">
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">趣味</h4>
                    <p className="text-neutral-800">{getEmptyProfileValue(hobby)}</p>
                  </div>
                  
                  <div className="border-b border-neutral-100 pb-3">
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">特技</h4>
                    <p className="text-neutral-800">{getEmptyProfileValue(skill)}</p>
                  </div>
                  
                  <div className="border-b border-neutral-100 pb-3">
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">性格</h4>
                    <p className="text-neutral-800">{getEmptyProfileValue(personality)}</p>
                  </div>
                  
                  <div className="border-b border-neutral-100 pb-3">
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">座右の銘</h4>
                    <p className="text-neutral-800">{getEmptyProfileValue(motto)}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-neutral-500 mb-1">コメント</h4>
                    <p className="text-neutral-800">{getEmptyProfileValue(comment)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button 
                onClick={onDownload}
                disabled={!name || isDownloading}
                variant="secondary"
                className="px-6 py-6 h-auto text-base"
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
