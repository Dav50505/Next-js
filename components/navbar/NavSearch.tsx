'use client';
import { Input } from '../ui/input';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect } from 'react';

function NavSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get('search')?.toString() || '');
  
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if(value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    const searchUrl = `/products?${params.toString()}`;
    router.replace(searchUrl);
  }, 500);

  useEffect(() => {
    const currentSearch = searchParams.get('search');
    if(currentSearch !== search) {
      setSearch(currentSearch || '');
    }
  }, [searchParams, search]);

  return (
    <Input 
      type="search" 
      placeholder="Search for products" 
      className="max-w-xs dark:bg-[hsl(var(--muted))] dark:text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] px-4 py-2"
      value={search}
      onChange={(e) => {
        const newValue = e.target.value;
        setSearch(newValue);
        handleSearch(newValue);
      }}
    />
  );
}

export default NavSearch;
