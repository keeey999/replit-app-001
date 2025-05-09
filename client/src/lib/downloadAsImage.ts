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

    // 画像の読み込みを待つ
    const imageElements = element.querySelectorAll('img');
    if (imageElements.length > 0) {
      // すべての画像が完全に読み込まれるのを少し待つ
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    // モバイルでのレンダリング用に元の要素のスタイルを保存
    const originalStyles = {
      width: element.style.width,
      maxWidth: element.style.maxWidth,
      margin: element.style.margin
    };

    // モバイルの場合、ダウンロード用に一時的に要素のスタイルを変更
    if (window.innerWidth < 768) {
      // クリッピングされないように一時的に幅を固定
      element.style.width = '100%';
      element.style.maxWidth = '500px'; // 十分な幅を確保
      element.style.margin = '0 auto';
    }

    // Create canvas from the element
    const canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true,
      scale: window.innerWidth < 768 ? 1.2 : 2, // モバイルではスケールを調整（小さめに）
      backgroundColor: "white", // 背景を白に設定
      logging: false,
      // 幅の制限を外し、要素全体をキャプチャ
      width: element.offsetWidth,
      imageTimeout: 0, // 画像のタイムアウトを無効にする
      onclone: (clonedDoc) => {
        // クローンされたドキュメント内の画像に特別なスタイルを適用
        const clonedImages = clonedDoc.querySelectorAll('img');
        clonedImages.forEach(img => {
          // 画像の縦横比を保持するよう明示的に設定
          img.style.objectFit = 'cover';
          img.style.width = '100%';
          img.style.height = '100%';
        });

        // クローンされた要素のスタイルも調整
        const profileCard = clonedDoc.getElementById('profileCard');
        if (profileCard && window.innerWidth < 768) {
          profileCard.style.width = '100%';
          profileCard.style.maxWidth = '500px';
          profileCard.style.margin = '0 auto';
        }
      }
    });
    
    // 元のスタイルを復元
    if (window.innerWidth < 768) {
      element.style.width = originalStyles.width;
      element.style.maxWidth = originalStyles.maxWidth;
      element.style.margin = originalStyles.margin;
    }

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
