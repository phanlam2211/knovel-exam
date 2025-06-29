import { type PropsWithChildren, useEffect } from 'react';
import styled from 'styled-components';
import { Header } from './components/header';
import { LeftMenu } from './components/left-menu';
import { useInfoCurrentUserStore } from '../../global-store/user-store';

export type LayoutProps = {
  showMenu?: boolean;
  showHeader?: boolean;
  title?: string;
};

export function AppLayout({ showMenu = true, showHeader = true, children }: PropsWithChildren<LayoutProps>) {
  const asycnFetchCurrentUser = useInfoCurrentUserStore((state) => state.asycnFetchCurrentUser);
  useEffect(() => {
    asycnFetchCurrentUser.execute();
  }, []);

  return (
    <PageContainer>
      {showHeader && <Header />}
      <LayoutWrapper>
        {showMenu && <LeftMenu />}
        <PageContent>{children}</PageContent>
      </LayoutWrapper>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  overflow-y: unset;
  height: 100vh;
`;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  height: calc(100vh - 50px);
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  padding: 16px;
  background-color: white;
`;
