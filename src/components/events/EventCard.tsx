import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../../types';
import { Card, CardContent, CardFooter } from '../ui/Card';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const spotsLeft = event.capacity - event.registeredCount;

  return (
    <Card>
      <img 
        src={event.imageUrl} 
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <CardContent>
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            {spotsLeft} spots left
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div>
          <span className="text-lg font-bold text-blue-600">${event.price}</span>
          <span className="text-gray-500"> / person</span>
        </div>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          disabled={spotsLeft === 0}
        >
          {spotsLeft === 0 ? 'Sold Out' : 'Register Now'}
        </button>
      </CardFooter>
    </Card>
  );
}