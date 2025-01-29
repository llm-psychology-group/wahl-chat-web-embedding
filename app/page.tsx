'use client';

import { Suspense } from 'react';
import Form from './form';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-2xl font-bold">
        Implement wahl.chat on your website
      </h1>
      <p className="text-sm text-muted-foreground mt-2">
        Checkout the{' '}
        <Link
          href="https://github.com/llm-psychology-group/wahl-chat-web-embedding"
          className="underline"
          target="_blank"
        >
          documentation
        </Link>{' '}
        for more information.
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Form />
      </Suspense>
    </div>
  );
}
