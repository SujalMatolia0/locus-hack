import { AppShell, Container, type MantineSpacing } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

interface CommonLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  fixedHeader?: boolean;
  p?: MantineSpacing;
  footer?: React.ReactNode;
  fixedFooter?: boolean;
}

export const CommonLayout = (props: CommonLayoutProps) => {
  const pinned = useHeadroom({ fixedAt: 300 });

  return (
    <>
      <AppShell
        {...(props.header
          ? {
              header: {
                height: 80,
                collapsed: !props.fixedHeader && !pinned,
                offset: props.fixedHeader ?? false,
              },
            }
          : {})}
        {...(props.footer && props.fixedFooter
          ? { footer: { height: 60 } }
          : {})}
        padding={0}
      >
        <AppShell.Header withBorder={false}>{props.header}</AppShell.Header>

        <AppShell.Main>
          <Container mih="100vh" px={props.p ?? 0} py={100} size={2000}>
            {props.children}
            {props.footer && !props.fixedFooter && props.footer}
          </Container>
        </AppShell.Main>

        {props.footer && props.fixedFooter && (
          <AppShell.Footer withBorder={false}>{props.footer}</AppShell.Footer>
        )}
      </AppShell>
    </>
  );
};
