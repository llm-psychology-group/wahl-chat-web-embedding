'use client';

import { Suspense } from 'react';
import Form from './form';

export default function Home() {
  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-2xl font-bold">
        Implement wahl.chat on your website
      </h1>

      <Suspense fallback={<div>Loading...</div>}>
        <Form />
      </Suspense>
    </div>
  );
}
