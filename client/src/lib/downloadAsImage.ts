import html2canvas from "html2canvas";
import { toast } from "@/hooks/use-toast";

export const downloadAsImage = async (
  elementId: string,
  fileName: string,
  setIsDownloading: (value: boolean) => void
): Promise<void> => {
  try {
    setIsDownloading(true);
    
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Element not found");
    }

    // Create canvas from the element
    const canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true,
      scale: window.innerWidth < 768 ? 1.5 : 2, // モバイルではスケールを調整
      backgroundColor: "white", // 背景を白に設定
      logging: false,
      width: window.innerWidth < 768 ? Math.min(element.offsetWidth, 400) : element.offsetWidth, // モバイルでは幅を制限
    });

    // Convert canvas to data URL
    const imageUrl = canvas.toDataURL("image/png");

    // Create download link
    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = imageUrl;
    link.click();

    toast({
      title: "画像をダウンロードしました",
      description: "プロフィール画像が正常に保存されました。",
    });
  } catch (error) {
    console.error("Error downloading image:", error);
    toast({
      title: "ダウンロードに失敗しました",
      description: "もう一度お試しください。",
      variant: "destructive",
    });
  } finally {
    setIsDownloading(false);
  }
};
