'use client';
import { Input } from '../ui/input';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect } from 'react';

function NavSearch() {
  const searchParams = useSearchParams();
  const {replace} = useRouter();
  const [search, setSearch] = useState(searchParams.get('search')?.toString() || '');
  
  const handleSearch = useDebouncedCallback((value: string) => {
    console.log('Search value:', value);
    const params = new URLSearchParams(searchParams);
    if(value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    const searchUrl = `/products?${params.toString()}`;
    console.log('Navigating to:', searchUrl);
    replace(searchUrl);
  }, 500);

  useEffect(() => {
    const currentSearch = searchParams.get('search');
    console.log('Search param changed:', currentSearch);
    if(!currentSearch) {
      setSearch('');
    }
  }, [searchParams]);

  return (
    <Input 
      type="search" 
      placeholder="Search for products" 
      className="max-w-xs dark:bg-[hsl(var(--muted))] dark:text-[hsl(var(--muted-foreground))] border border-[hsl(var(--border))] px-4 py-2"
      value={search}
      onChange={(e) => {
        const newValue = e.target.value;
        console.log('Input changed:', newValue);
        setSearch(newValue);
        handleSearch(newValue);
      }}
    />
  );
}

export default NavSearch;
