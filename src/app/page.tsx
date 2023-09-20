'use client';

import MainApp from '@/components/main_app';
import dynamic from 'next/dynamic';

export default function Home() {

  const DynamicAppWithNoSSR = dynamic(
    () => import('@/components/main_app'),
    { ssr: false }
  )

  return (
    <DynamicAppWithNoSSR />
  );
}
