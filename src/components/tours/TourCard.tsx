import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Tour } from '../../types';
import { Card, CardContent, CardFooter } from '../ui/Card';

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  return (
    <Card>
      <img 
        src={tour.imageUrl} 
        alt={tour.title}
        className="w-full h-48 object-cover"
      />
      <CardContent>
        <h3 className="text-xl font-bold mb-2">{tour.title}</h3>
        <p className="text-gray-600 mb-4">{tour.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            {tour.location}
          </div>
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {tour.duration}
          </div>
          <div className="flex items-center text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            Max {tour.maxGroupSize} people
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div>
          <span className="text-lg font-bold text-blue-600">${tour.price}</span>
          <span className="text-gray-500"> / person</span>
        </div>
        <Link 
          to={`/tours/${tour.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}