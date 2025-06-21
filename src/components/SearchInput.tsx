// "use client"
// import Image from 'next/image';
// import { usePathname, useSearchParams, useRouter} from 'next/navigation'
// import { useState } from 'react';

// const SearchInput = () => {
//     const pathname = usePathname();
//     const router = useRouter();
//     const searchParams = useSearchParams()
//     const query = searchParams.get('topic') || '';
//      const [searchQuery, setSearchQuery] = useState(initialState: '')
//   return (
//     <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'>
//         <Image 
//         src='/icons/search.svg'
//         alt='search'
//         width={15}
//         height={15}
//         />
//         <input  placeholder='Search companions...'
//         className='outline-none'
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         />
//     </div>
//   )
// }

// export default SearchInput
"use client";
import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || ''; // Get initial query from URL
    const [searchQuery, setSearchQuery] = useState(query); // Initialize with query from URL
    const [debouncedQuery, setDebouncedQuery] = useState(query); // State for debounced query
    const [isLoading, setIsLoading] = useState(false); // Optional: To show loading state

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
            setIsLoading(true); // Start loading indicator
        }, 500); // 500ms delay for debouncing

        return () => clearTimeout(timer); // Cleanup previous timeout on change
    }, [searchQuery]);

    useEffect(() => {
        if (debouncedQuery) {
            router.push(`${pathname}?topic=${debouncedQuery}`);
        } else {
            router.push(pathname);
        }

        setIsLoading(false); // Stop loading after URL update
    }, [debouncedQuery, pathname, router]);

    return (
        <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'>
            <Image
                src='/icons/search.svg'
                alt='search'
                width={15}
                height={15}
            />
            <input
                placeholder='Search companions...'
                className='outline-none'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
           
        </div>
    );
}

export default SearchInput;

