import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

// ベースパスの取得 (GitHub Pages用)
const basePath = import.meta.env.VITE_BASE_PATH || "./";

// GitHub Pages用のカスタムルーター
function GitHubPagesRouter() {
  // GitHub Pagesでのパス解決のためのカスタムフック
  useEffect(() => {
    // ハッシュルーターの処理
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== '/') {
        window.history.replaceState(null, '', hash);
      }
    };

    // 初期ロード時とハッシュ変更時に実行
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // アセットパスの問題を検出して修正するための処理
  useEffect(() => {
    // アセットの404エラーをコンソールに記録
    const handleError = (event: ErrorEvent) => {
      if (event.filename && (event.filename.includes('/assets/') || event.filename.includes('assets/'))) {
        console.warn('Asset loading error:', event.filename);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <GitHubPagesRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
