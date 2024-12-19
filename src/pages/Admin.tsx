import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/admin/LoginForm';
import { AddTourForm } from '../components/admin/AddTourForm';
import { AddBlogForm } from '../components/admin/AddBlogForm';
import { AddEventForm } from '../components/admin/AddEventForm';
import { useCollection } from '../hooks/useFirebase';
import { Tour, BlogPost, Event } from '../types';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { PlusCircle, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Admin() {
  const { user, signOut } = useAuth();
  const [activeForm, setActiveForm] = useState<'tour' | 'blog' | 'event' | null>(null);
  const { data: tours, loading: toursLoading } = useCollection<Tour>('tours');
  const { data: posts, loading: postsLoading } = useCollection<BlogPost>('blog-posts');
  const { data: events, loading: eventsLoading } = useCollection<Event>('events');

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Tours</h2>
              <button 
                onClick={() => setActiveForm('tour')}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {toursLoading ? (
              <p>Loading...</p>
            ) : (
              <p>{tours.length} tours available</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Blog Posts</h2>
              <button 
                onClick={() => setActiveForm('blog')}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {postsLoading ? (
              <p>Loading...</p>
            ) : (
              <p>{posts.length} posts published</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Events</h2>
              <button 
                onClick={() => setActiveForm('event')}
                className="text-blue-600 hover:text-blue-800"
              >
                <PlusCircle className="w-6 h-6" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {eventsLoading ? (
              <p>Loading...</p>
            ) : (
              <p>{events.length} events scheduled</p>
            )}
          </CardContent>
        </Card>
      </div>

      {activeForm && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              Add New {activeForm.charAt(0).toUpperCase() + activeForm.slice(1)}
            </h2>
            <button
              onClick={() => setActiveForm(null)}
              className="text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
          
          {activeForm === 'tour' && <AddTourForm />}
          {activeForm === 'blog' && <AddBlogForm />}
          {activeForm === 'event' && <AddEventForm />}
        </div>
      )}
    </div>
  );
}