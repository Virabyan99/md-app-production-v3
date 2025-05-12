'use client';

import { createContext, useState, type FC, type ReactNode } from 'react';

interface ViewerCtx {
  markdown: string | null;
  setMarkdown: (value: string | null) => void;
}

export const ViewerContext = createContext<ViewerCtx | undefined>(undefined);

export const ViewerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [markdown, setMarkdown] = useState<string | null>(null);

  return (
    <ViewerContext.Provider value={{ markdown, setMarkdown }}>
      {children}
    </ViewerContext.Provider>
  );
};