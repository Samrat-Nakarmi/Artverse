'use client';
import cx from 'clsx';
import { useEffect, useState } from 'react';
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
  IconMoon,
} from '@tabler/icons-react';
// import { MantineLogo } from '@mantine/ds';
import classes from './Navbar.module.css';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import axios from '@/api/axios';
import Link from 'next/link';

const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
  image:
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
};

export default function Navbar() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const token = localStorage.getItem('私は猫が大好き');
  // useEffect(() => {

  //   const fetchUser = async() => {
  //     const response = await axios.get("/dashboard/me", )
  //   }

  // }, [])

  const userId = localStorage.getItem('user');

  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
    window.location.reload();
  };

  const { setColorScheme } = useMantineColorScheme();

  return (
    <div className={classes.header}>
      {/* <Container className={classes.mainSection} size="md"> */}

      <Group justify="space-between" style={{ width: '90%' }} m={'auto'}>
        {/* <MantineLogo size={28} /> */}
        <Link href={'/dashboard'}>
          <img src="/Logo.svg" alt="" style={{ width: '30px' }} />
        </Link>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

        <Menu
          width={260}
          position="bottom-end"
          transitionProps={{ transition: 'pop-top-right' }}
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          withinPortal
        >
          <Menu.Target>
            <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
              <Group gap={7}>
                <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                <Text fw={500} size="sm" lh={1} mr={3}>
                  {user.name}
                </Text>
                <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Link href={`/dashboard/liked-arts`} style={{ textDecoration: 'none' }}>
              <Menu.Item
                leftSection={
                  <IconHeart
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                Your liked arts
              </Menu.Item>
            </Link>
            <Link href={'/market'} style={{ textDecoration: 'none' }}>
              <Menu.Item
                leftSection={
                  <IconStar
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
              >
                View Products
              </Menu.Item>
            </Link>
            <Link href={'/dashboard'} style={{ textDecoration: 'none' }}>
              <Menu.Item
                leftSection={
                  <IconMessage
                    style={{ width: rem(16), height: rem(16) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Your art
              </Menu.Item>
            </Link>

            <Menu.Label>Settings</Menu.Label>
            <Link href={`/dashboard/user/${userId}`}>
              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                Account settings
              </Menu.Item>
            </Link>

            <Menu.Item
              leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
              onClick={handleLogout}
            >
              Logout
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item
              leftSection={<IconMoon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
              onClick={() => setColorScheme('dark')}
            >
              Dark Mode
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      {/* </Container> */}
      <Container size="md"></Container>
    </div>
  );
}
