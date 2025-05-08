import { createContext, useContext, useState, useEffect } from 'react';

interface HashRouterContextType {
  hash: string;
  setHash: (hash: string) => void;
}

const HashRouterContext = createContext<HashRouterContextType | null>(null);

export function useHashRouter() {
  const context = useContext(HashRouterContext);
  if (!context) {
    throw new Error('useHashRouter must be used within a HashRouterProvider');
  }
  return context;
}

interface HashRouterProviderProps {
  children: React.ReactNode;
}

export function HashRouterProvider({ children }: HashRouterProviderProps) {
  // ハッシュから # を取り除いた値を初期値として使用
  const [hash, setHashState] = useState<string>(
    window.location.hash ? window.location.hash.substring(1) : '/'
  );

  const setHash = (newHash: string) => {
    // プレフィックスがない場合は / を追加
    const formattedHash = newHash.startsWith('/') ? newHash : `/${newHash}`;
    window.location.hash = formattedHash;
  };

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash
        ? window.location.hash.substring(1)
        : '/';
      setHashState(newHash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <HashRouterContext.Provider value={{ hash, setHash }}>
      {children}
    </HashRouterContext.Provider>
  );
}