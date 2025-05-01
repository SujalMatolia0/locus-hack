import { COLOR } from '@/config/colors';
import { useMediaQuerys } from '@/lib/hooks/use-media-querys';
import { Avatar, Button, Divider, Group, Menu, Title } from '@mantine/core';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Children } from 'react';

const navButtons = [
  { label: 'Rules & FAQs', link: '/rules-faq' },
  // { label: 'Prizes', link: '/prizes' },
  // { label: 'Sponsors', link: '/sponsors' },
  { label: 'Gallery', link: '/gallery' },
  // { label: '3D Globe', link: '/3d-globe' },
];

export const CommonHeader = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { MD } = useMediaQuerys();
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <>
      {MD ? (
        <>
          <Group
            style={{
              background: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black background
              backdropFilter: 'blur(10px)', // Apply the blur effect
              WebkitBackdropFilter: 'blur(10px)', // For Safari support
            }}
            bg="transparent"
            justify="space-between"
            px="md"
            py="sm"
          >
            <Link
              href="/"
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Title c={COLOR.GREEN}>Locus</Title>
            </Link>
            <Group>
              {Children.toArray(
                navButtons.map((item) => (
                  <Link key={item.label} href={item.link} passHref>
                    <Button
                      size="lg"
                      fw={350}
                      variant="transparent"
                      c={COLOR.GREEN}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))
              )}
            </Group>

            {session?.user ? (
              <Menu shadow="md" width={200} withArrow>
                <Menu.Target>
                  <Avatar
                    src={session.user.image}
                    radius="xl"
                    size="md"
                    style={{ cursor: 'pointer' }}
                  />
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Signed in as {session.user.name}</Menu.Label>
                  <Menu.Item>{session.user.email}</Menu.Item>

                  {isAdmin && (
                    <>
                      <Menu.Divider />
                      <Menu.Item
                        onClick={() => router.push('/admin/hackathon/create')}
                      >
                        Create Hackathon
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => router.push('/admin/hackathon/manage')}
                      >
                        Manage Hackathon
                      </Menu.Item>
                      <Menu.Item
                        onClick={() =>
                          router.push('/admin/certificates/upload')
                        }
                      >
                        Upload Certificates
                      </Menu.Item>
                    </>
                  )}

                  <Menu.Divider />
                  <Menu.Item color="red" onClick={() => signOut()}>
                    Sign Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button onClick={() => signIn('github')}>Sign In</Button>
            )}
          </Group>
          <Divider color={COLOR.TURQUOISE} />
        </>
      ) : null}
    </>
  );
};
