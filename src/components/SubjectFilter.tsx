'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { subjects } from '@/constants';

const SubjectFilter = () => {
  const [subject, setSubject] = useState('all');
  const [debouncedSubject, setDebouncedSubject] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();

  // Initialize from URL on first load
  useEffect(() => {
    const initial = searchParams.get('subject') || 'all';
    setSubject(initial);
    setDebouncedSubject(initial);
  }, []);

  // Debounce user selection
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSubject(subject);

      const params = new URLSearchParams(searchParams.toString());
      if (subject === 'all') {
        params.delete('subject');
      } else {
        params.set('subject', subject);
      }

      router.push(`${pathname}?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [subject]);

  // Fetch from Supabase when debouncedSubject changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      let query = supabase.from('companions').select('*');

      if (debouncedSubject !== 'all') {
        query = query.ilike('subject', `%${debouncedSubject}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Supabase error:', error.message);
        setResults([]);
      } else {
        setResults(data || []);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [debouncedSubject]);

  return (
    <div className="w-full space-y-2">
      <Select onValueChange={setSubject} value={subject}>
        <SelectTrigger className="input capitalize">
          <SelectValue placeholder="Select subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Subjects</SelectItem>
          {subjects.map((subj) => (
            <SelectItem key={subj} value={subj} className="capitalize">
              {subj}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {isLoading && (
        <p className="text-sm text-gray-500 italic">Loading companions...</p>
      )}

      {!isLoading && results.length === 0 && (
        <p className="text-sm text-gray-400 italic">No companions found.</p>
      )}

      
      
    </div>
  );
};

export default SubjectFilter;
