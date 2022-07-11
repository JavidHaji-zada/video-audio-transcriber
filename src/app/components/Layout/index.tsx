import React from 'react';
import styled from 'styled-components';
import { NavBar } from '../NavBar';
import { PageWrapper } from '../PageWrapper';
import Sidebar from '../Sidebar';

const AppContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const InnerContainer = styled.div`
  flex: 1;
  display: flex;
`;

function AppLayout(props: {
  children: React.ReactChild | React.ReactChild[];
}): JSX.Element {
  return (
    <AppContainer>
      <NavBar />
      <InnerContainer>
        <Sidebar />
        <PageWrapper>{props.children}</PageWrapper>
      </InnerContainer>
    </AppContainer>
  );
}

export default AppLayout;
