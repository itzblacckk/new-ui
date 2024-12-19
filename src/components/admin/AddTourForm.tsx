import React, { useState } from 'react';
import { useCollection } from '../../hooks/useFirebase';
import { uploadImage } from '../../lib/storage';
import { Tour } from '../../types';
import { toast } from 'react-hot-toast';

export function AddTourForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
    difficulty: 'Moderate',
    imageUrl: '',
    location: '',
    maxGroupSize: '',
    included: [''],
    notIncluded: ['']
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { addItem } = useCollection<Tour>('tours');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'tour-images');
      }

      await addItem({
        ...formData,
        imageUrl,
        price: Number(formData.price),
        maxGroupSize: Number(formData.maxGroupSize),
        included: formData.included.filter(item => item.trim() !== ''),
        notIncluded: formData.notIncluded.filter(item => item.trim() !== ''),
        startDates: []
      });

      toast.success('Tour added successfully');
      setFormData({
        title: '',
        description: '',
        duration: '',
        price: '',
        difficulty: 'Moderate',
        imageUrl: '',
        location: '',
        maxGroupSize: '',
        included: [''],
        notIncluded: ['']
      });
      setImageFile(null);
    } catch (error) {
      toast.error('Failed to add tour');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Duration</label>
        <input
          type="text"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
          placeholder="e.g., 5 days"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price per Person</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Difficulty</label>
        <select
          value={formData.difficulty}
          onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        >
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Difficult">Difficult</option>
          <option value="Expert">Expert</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Max Group Size</label>
        <input
          type="number"
          value={formData.maxGroupSize}
          onChange={(e) => setFormData({ ...formData, maxGroupSize: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
          min="1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Included Items</label>
        {formData.included.map((item, index) => (
          <div key={index} className="flex gap-2 mt-1">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newIncluded = [...formData.included];
                newIncluded[index] = e.target.value;
                setFormData({ ...formData, included: newIncluded });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm"
            />
            <button
              type="button"
              onClick={() => {
                const newIncluded = formData.included.filter((_, i) => i !== index);
                setFormData({ ...formData, included: newIncluded });
              }}
              className="px-2 py-1 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFormData({ ...formData, included: [...formData.included, ''] })}
          className="mt-2 text-blue-600 hover:text-blue-800"
        >
          Add Item
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Not Included Items</label>
        {formData.notIncluded.map((item, index) => (
          <div key={index} className="flex gap-2 mt-1">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newNotIncluded = [...formData.notIncluded];
                newNotIncluded[index] = e.target.value;
                setFormData({ ...formData, notIncluded: newNotIncluded });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm"
            />
            <button
              type="button"
              onClick={() => {
                const newNotIncluded = formData.notIncluded.filter((_, i) => i !== index);
                setFormData({ ...formData, notIncluded: newNotIncluded });
              }}
              className="px-2 py-1 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFormData({ ...formData, notIncluded: [...formData.notIncluded, ''] })}
          className="mt-2 text-blue-600 hover:text-blue-800"
        >
          Add Item
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Adding...' : 'Add Tour'}
      </button>
    </form>
  );
}