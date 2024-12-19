import React from 'react';
import { TourCard } from '../components/tours/TourCard';
import { useCollection } from '../hooks/useFirebase';
import { Tour } from '../types';

export default function Tours() {
  const { data: tours, loading, error } = useCollection<Tour>('tours');

  if (loading) return <div className="p-8 text-center">Loading tours...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error loading tours: {error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Our Tours</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
}