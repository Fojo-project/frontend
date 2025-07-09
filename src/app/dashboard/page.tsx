'use client';

import { DownloadIcon } from '@/assets/icons';
import Button from '@/components/ui/button/Button';
import CardSkeleton from '@/components/ui/skeleton/CardSkeleton';
import React, { useEffect, useState } from 'react';

export default function Ecommerce() {
  const [loading, setLoading] = useState<'initial' | 'button' | 'none'>(
    'initial'
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading('none');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = async () => {
    setLoading('button');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading('none');
    alert('Action completed!');
  };

  const isInitialLoading = loading === 'initial';
  const isButtonLoading = loading === 'button';

  return (
    <div className="space-y-6">
      {isInitialLoading ? (
        <>
          <CardSkeleton />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <Button>Hello</Button>

          <Button className="px-10 py-4 text-xs" variant="primary">
            Submit
          </Button>

          <Button disabled>Disable</Button>

          <Button
            variant="outline"
            rightIcon={<DownloadIcon width={14} height={14} />}
          >
            Download Note
          </Button>

          <Button
            onClick={handleClick}
            isLoading={isButtonLoading}
            fullWidth
            variant="primary"
            disabled={isButtonLoading}
          >
            Click Me
          </Button>
        </div>
      )}
    </div>
  );
}
