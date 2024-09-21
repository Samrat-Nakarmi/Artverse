// pages/[userId].tsx
'use client';
import axios from '@/api/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button, Flex, SimpleGrid } from '@mantine/core';
import swal from 'sweetalert';
import { useRouter } from 'next/navigation';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import GoBackButton from '@/components/GoBackButton/GoBackButton';

const UserProfile = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const [userData, setUserData] = useState({
    user: {
      username: '',
    },
    arts: [],
    products: [],
  });

  const handleArtDelete = async (id: any) => {
    const token = localStorage.getItem('私は猫が大好き');
    const config = {
      headers: { Authorization: 'Bearer ' + token },
    };
    try {
      const response = await axios.delete(`/dashboard/user/art/${id}`, config);
      console.log(response);
      swal({ icon: 'success', title: 'Successfully Deleted' });
      window.location.reload();
    } catch (error) {
      swal({ icon: 'error', title: 'Unsuccessful' });
      console.log(error);
    }
  };
  const handleProductDelete = async (id: any) => {
    const token = localStorage.getItem('私は猫が大好き');
    const config = {
      headers: { Authorization: 'Bearer ' + token },
    };
    try {
      const response = await axios.delete(`/dashboard/user/product/${id}`, config);
      console.log(response);
      swal({ icon: 'success', title: 'Successfully Deleted' });
      window.location.reload();
    } catch (error) {
      swal({ icon: 'error', title: 'Unsuccessful' });
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`/dashboard/user/${userId}`);
          console.log(response.data);
          setUserData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, [userId]);

  const { user, arts, products } = userData;

  return (
    <div
      className=""
      style={{
        width: '80%',
        margin: '0 auto',
      }}
    >
      <GoBackButton />
      <h1>User Profile</h1>
      <h2>{user.username}'s Profile</h2>
      <h3>Arts:</h3>
      <ul>
        {arts.map((art: any) => {
          const image_url = 'http://localhost:8080/public/uploads/' + art.photo;
          return (
            <SimpleGrid cols={2}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                  src={image_url}
                  style={{
                    width: '70%',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    margin: '0 auto',
                  }}
                  alt=""
                />
              </div>
              <Flex direction="column" gap={'xl'}>
                <div>
                  <strong>{art.title}</strong>
                </div>
                <div>Categories: #{art.hashtags}</div>
                <div>Uploaded at: {art.createdAt}</div>
                <div>
                  <Button color="red" radius={'md'} onClick={() => handleArtDelete(art._id)}>
                    Delete
                  </Button>
                </div>
              </Flex>
            </SimpleGrid>
          );
        })}
      </ul>
      <h3>Products:</h3>
      <ul>
        {products.map((product: any) => {
          const image_url = 'http://localhost:8080/public/uploads/' + product.photo;
          return (
            <SimpleGrid cols={2}>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                  src={image_url}
                  style={{
                    width: '70%',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    margin: '0 auto',
                  }}
                  alt=""
                />
              </div>
              <Flex direction="column" gap={'xl'}>
                <div>
                  <strong>{product.name}</strong>
                </div>
                <div>Uploaded at: {product.createdAt}</div>
                <div>
                  <Button
                    color="red"
                    radius={'md'}
                    onClick={() => handleProductDelete(product._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Flex>
            </SimpleGrid>
          );
        })}
      </ul>
    </div>
  );
};

export default UserProfile;
