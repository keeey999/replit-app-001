import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeProfileFormSchema, type EmployeeProfileForm } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RotateCcw, EyeIcon } from "lucide-react";
import PhotoUpload from "@/components/photo-upload";

interface EmployeeFormProps {
  defaultValues?: Partial<EmployeeProfileForm>;
  onSubmit: (data: EmployeeProfileForm) => void;
  onReset: () => void;
  onSwitchToPreview?: () => void; // モバイルでプレビュータブに切り替える関数
}

const cardStyles = [
  { id: "blue", name: "ブルー", color: "bg-gradient-to-r from-blue-600 to-blue-400" },
  { id: "green", name: "グリーン", color: "bg-gradient-to-r from-green-600 to-green-400" },
  { id: "amber", name: "アンバー", color: "bg-gradient-to-r from-amber-600 to-amber-400" },
];

const layoutStyles = [
  { 
    id: "standard", 
    name: "スタンダード", 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="2"/>
        <line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  { 
    id: "modern", 
    name: "モダン", 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 21C6 16.5817 8.68629 14 12 14C15.3137 14 18 16.5817 18 21" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  { 
    id: "compact", 
    name: "コンパクト", 
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
];

export default function EmployeeForm({ defaultValues, onSubmit, onReset, onSwitchToPreview }: EmployeeFormProps) {
  const form = useForm<EmployeeProfileForm>({
    resolver: zodResolver(employeeProfileFormSchema),
    defaultValues: defaultValues || {
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
    },
  });

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
  
  // フォームの変更をリアルタイムでプレビューに反映
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      onSubmit(value as EmployeeProfileForm);
    });
    return () => subscription.unsubscribe();
  }, [form, onSubmit]);

  const handleSubmit = (data: EmployeeProfileForm) => {
    onSubmit(data);
  };

  const handleReset = () => {
    form.reset();
    onReset();
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 card-shadow">
      {/* プロフィール情報の見出しは不要なので削除 */}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="photoUrl"
            render={({ field }) => (
              <FormItem>
                <PhotoUpload 
                  value={field.value} 
                  onChange={field.onChange} 
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">
                  氏名
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="山田 太郎" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">生年月日</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="previousJob"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">前職の紹介</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="前職での経験や役割について"
                    rows={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hobby"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">趣味</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="読書、旅行、料理など"
                    rows={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skill"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">特技</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="語学、プログラミングなど"
                    rows={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="personality"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">性格</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="明るい、冷静、几帳面など"
                    rows={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="motto"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">座右の銘</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="人生の指針となる言葉"
                    rows={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">コメント</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="自己紹介や意気込みなど"
                    rows={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6">
            {/* モバイルでプレビューに切り替えるボタン（デスクトップでは非表示） */}
            {onSwitchToPreview && (
              <Button
                type="button"
                onClick={onSwitchToPreview}
                variant="default"
                className="block sm:hidden w-full h-12 py-0 flex items-center justify-center"
              >
                <div className="flex items-center justify-center">
                  <EyeIcon className="mr-2 h-4 w-4" />
                  <span>プレビューを確認</span>
                </div>
              </Button>
            )}
            
            {/* リセットボタン */}
            <Button
              type="button"
              variant="destructive"
              onClick={handleReset}
              className="w-full h-12 py-0 flex items-center justify-center hover:bg-destructive/90 active:bg-destructive/80 transition-colors"
            >
              <div className="flex items-center justify-center">
                <RotateCcw className="mr-2 h-4 w-4" />
                <span>すべてリセット</span>
              </div>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
