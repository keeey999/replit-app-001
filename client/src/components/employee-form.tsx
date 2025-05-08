import React from "react";
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

  // useIsMobileフックを使用
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false;
  
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
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <line x1="19" x2="19" y1="8" y2="14"></line>
          <line x1="22" x2="16" y1="11" y2="11"></line>
        </svg>
        プロフィール情報
      </h2>

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

          <div className="space-y-6 border border-border p-4 rounded-lg bg-accent/30">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
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
            
            <FormField
              control={form.control}
              name="cardStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">カラーテーマ</FormLabel>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {cardStyles.map((style) => (
                      <div
                        key={style.id}
                        onClick={() => {
                          field.onChange(style.id);
                          form.handleSubmit(onSubmit)();
                        }}
                        className={`cursor-pointer border-2 ${
                          field.value === style.id
                            ? "border-primary"
                            : "border-transparent"
                        } hover:border-primary rounded-lg p-2 shadow-sm transition-all transform hover:scale-105 active:scale-95`}
                      >
                        <div className={`h-12 ${style.color} rounded-md mb-2`}></div>
                        <div className="text-xs text-center text-muted-foreground font-medium">
                          {style.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="layoutStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">レイアウト</FormLabel>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {layoutStyles.map((style) => (
                      <div
                        key={style.id}
                        onClick={() => {
                          field.onChange(style.id);
                          form.handleSubmit(onSubmit)();
                        }}
                        className={`cursor-pointer border-2 ${
                          field.value === style.id
                            ? "border-primary"
                            : "border-transparent"
                        } hover:border-primary rounded-lg p-2 shadow-sm transition-all transform hover:scale-105 active:scale-95`}
                      >
                        <div className="h-14 bg-accent rounded-md mb-2 flex items-center justify-center">
                          <div className="text-lg font-bold text-primary">
                            {style.icon}
                          </div>
                        </div>
                        <div className="text-xs text-center text-muted-foreground font-medium">
                          {style.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="px-4 py-2 sm:px-5 w-full sm:w-auto"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              リセット
            </Button>
            
            {/* モバイルでプレビューへ切り替えるボタン */}
            {isMobile && (
              <Button
                type="button"
                className="px-4 py-2 sm:px-5 w-full sm:w-auto bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
                onClick={() => {
                  if (typeof onSwitchToPreview === 'function') {
                    onSwitchToPreview();
                  }
                }}
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
                  className="mr-2"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                プレビュー表示
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
