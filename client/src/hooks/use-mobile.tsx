import * as React from "react"

const MOBILE_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // サーバーサイドレンダリングの場合は早期リターン
    if (typeof window === 'undefined') {
      return;
    }
    
    // 初期状態の設定
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // リサイズイベントのリスナー設定
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // 新しいAPI (addEventListener) と古いAPI (addListener) をブラウザ対応に応じて使用
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    } else {
      // 古いブラウザ向けフォールバック (IE用)
      window.addEventListener('resize', onChange)
      return () => window.removeEventListener('resize', onChange)
    }
  }, [])

  // undefinedの場合はfalseとして扱う
  return !!isMobile
}
