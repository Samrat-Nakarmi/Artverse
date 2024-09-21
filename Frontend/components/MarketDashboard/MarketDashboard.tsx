import { SimpleGrid } from '@mantine/core';
import Product from '../Product/Product';
import Navbar from '../Navbar/Navbar';

export default function MarketDashboard() {
  return (
    <>
      <SimpleGrid cols={4} style={{ width: '100%', margin: '0 auto' }}>
        <Product />
      </SimpleGrid>
    </>
  );
}
