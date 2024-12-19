import React, { useState } from 'react';
import { useCollection } from '../../hooks/useFirebase';
import { uploadImage } from '../../lib/storage';
import { BlogPost } from '../../types';
import { toast } from 'react-hot-toast';

export function AddBlogForm() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    imageUrl: '',
    tags: ['']
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { addItem } = useCollection<BlogPost>('blog-posts');

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
        imageUrl = await uploadImage(imageFile, 'blog-images');
      }

      await addItem({
        ...formData,
        imageUrl,
        createdAt: new Date().toISOString(),
        tags: formData.tags.filter(tag => tag.trim() !== '')
      });

      toast.success('Blog post added successfully');
      setFormData({
        title: '',
        content: '',
        author: '',
        imageUrl: '',
        tags: ['']
      });
      setImageFile(null);
    } catch (error) {
      toast.error('Failed to add blog post');
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
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
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
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        {formData.tags.map((tag, index) => (
          <div key={index} className="flex gap-2 mt-1">
            <input
              type="text"
              value={tag}
              onChange={(e) => {
                const newTags = [...formData.tags];
                newTags[index] = e.target.value;
                setFormData({ ...formData, tags: newTags });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm"
            />
            <button
              type="button"
              onClick={() => {
                const newTags = formData.tags.filter((_, i) => i !== index);
                setFormData({ ...formData, tags: newTags });
              }}
              className="px-2 py-1 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFormData({ ...formData, tags: [...formData.tags, ''] })}
          className="mt-2 text-blue-600 hover:text-blue-800"
        >
          Add Tag
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Adding...' : 'Add Blog Post'}
      </button>
    </form>
  );
}