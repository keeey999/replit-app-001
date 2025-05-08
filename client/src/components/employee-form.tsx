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
}

const cardStyles = [
  { id: "blue", name: "ブルー", color: "bg-gradient-to-r from-blue-600 to-blue-400" },
  { id: "green", name: "グリーン", color: "bg-gradient-to-r from-green-600 to-green-400" },
  { id: "amber", name: "アンバー", color: "bg-gradient-to-r from-amber-600 to-amber-400" },
];

export default function EmployeeForm({ defaultValues, onSubmit, onReset }: EmployeeFormProps) {
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

  const handleSubmit = (data: EmployeeProfileForm) => {
    onSubmit(data);
  };

  const handleReset = () => {
    form.reset();
    onReset();
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-8 card-shadow">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
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
          className="mr-3 text-primary"
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
                  氏名 <span className="text-destructive">*</span>
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

          <FormField
            control={form.control}
            name="cardStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-medium">カードスタイル</FormLabel>
                <div className="grid grid-cols-3 gap-3">
                  {cardStyles.map((style) => (
                    <div
                      key={style.id}
                      onClick={() => field.onChange(style.id)}
                      className={`cursor-pointer border-2 ${
                        field.value === style.id
                          ? "border-primary"
                          : "border-transparent"
                      } hover:border-primary rounded-lg p-2 shadow-sm`}
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

          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              className="px-5 py-2"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              リセット
            </Button>
            <Button 
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90"
            >
              <EyeIcon className="mr-2 h-4 w-4" />
              プレビュー更新
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
