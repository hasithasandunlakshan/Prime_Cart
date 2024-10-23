// app/search/page.tsx
"use client";
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query'); // Get the 'query' param from the URL
  

  return (
    <div>
      <h1>Search Results for: {query ? query : 'No query provided'}</h1>
      {/* Display the search results here based on the query */}
    </div>
  );
}
