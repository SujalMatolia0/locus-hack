import { COLOR } from '@/config/colors';
import { ICON_SIZE } from '@/config/size_config';
import { Button, Paper, Center, HoverCard, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

export const CommonButton = (params: {
  title: string;
  variant?: string;
  color?: string;
  href?: string;
  target?: string;
  size?: string;
  hoverText?: string;
  disabled?: boolean;
}) => {
  return (
    <>
      {params.hoverText ? (
        <HoverCard>
          <HoverCard.Target>
            <Button
              target={params.target}
              component={Link}
              href={params.href ?? ''}
              w="fit-content"
              variant={params.variant}
              h={50}
              disabled={params.disabled}
              radius="lg"
              color={params.color}
              rightSection={
                <>
                  <Paper bg={COLOR.GREEN} radius="50%" h={25} w={25}>
                    <Center h="100%">
                      <IconArrowRight
                        color={COLOR.TURQUOISE}
                        size={ICON_SIZE.SM}
                      />
                    </Center>
                  </Paper>
                </>
              }
            >
              {params.title}
            </Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text>{params.hoverText}</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      ) : (
        <>
          <Button
            target={params.target}
            component={Link}
            href={params.href ?? ''}
            w="fit-content"
            variant={params.variant}
            h={50}
            size={params.size}
            disabled={params.disabled}
            radius="lg"
            color={params.color}
            rightSection={
              <>
                <Paper bg={COLOR.GREEN} radius="50%" h={25} w={25}>
                  <Center h="100%">
                    <IconArrowRight
                      color={COLOR.TURQUOISE}
                      size={ICON_SIZE.SM}
                    />
                  </Center>
                </Paper>
              </>
            }
          >
            {params.title}
          </Button>
        </>
      )}
    </>
  );
};
