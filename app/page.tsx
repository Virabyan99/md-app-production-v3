'use client';

import { useContext } from 'react';
import { ViewerContext } from '@/contexts/ViewerContext';
import MarkdownViewer from '@/components/MarkdownViewer';
import Onboarding from '@/components/Onboarding';

export default function Home() {
  const ctx = useContext(ViewerContext);
  if (!ctx) throw new Error('ViewerContext missing');
  const { markdown } = ctx;

  return (
    <main className=" max-w-4xl overflow-x-hidden mx-auto py-12">
      {markdown ? <MarkdownViewer source={markdown} /> : <Onboarding />}
    </main>
  );
}