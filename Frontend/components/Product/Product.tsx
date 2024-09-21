'use client';
import { Avatar, Button, Flex, SimpleGrid, Text } from '@mantine/core';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';
import swal from 'sweetalert';

type Product = {
  _id: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  user: {
    username: string;
  };
};

export default function Product({ ...props }: any) {
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response: any = await axios.get('/market/');
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {}
    };
    fetchPosts();
  }, []);

  const sendOrder = async (product_id: string) => {
    const token = localStorage.getItem('私は猫が大好き');
    const options = {
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    };

    const orderData = {
      product: product_id,
      status: 'Pending',
    };

    try {
      const response = await axios.post('/market', orderData, options);
      if (response.data.url) {
        window.location = response.data.url;
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(product);
  return (
    <>
      {product.map((el) => {
        const image_url = 'http://localhost:8080/public/uploads/' + el.photo;
        return (
          <div>
            <img
              src={image_url}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '12px',
              }}
              alt=""
            />
            <div style={{ width: '80%', margin: 'auto' }}>
              <SimpleGrid cols={2}>
                <div>
                  <Text>{el.name}</Text>
                  <Text>
                    <strong>Price: </strong>
                    {el.price}
                  </Text>
                </div>
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <Button onClick={() => sendOrder(el._id)}>Buy</Button>
                </div>
              </SimpleGrid>
            </div>
          </div>
        );
      })}
    </>
  );
}
