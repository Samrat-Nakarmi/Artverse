// LikedPostsPage.js
'use client';
import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';

function LikedPostsPage() {
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      const token = localStorage.getItem('私は猫が大好き');
      try {
        const response = await axios.get('/dashboard/liked-arts', {
          headers: { Authorization: 'Bearer ' + token },
        });
        setLikedPosts(response.data);
      } catch (error) {
        console.error('Error fetching liked posts:', error);
      }
    };

    fetchLikedPosts();
  }, []);

  return (
    <div>
      <h1>Liked Posts</h1>
      <ul>
        {likedPosts.map((post: any) => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default LikedPostsPage;
