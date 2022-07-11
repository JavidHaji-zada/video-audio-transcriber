import React from 'react';
import { NavLink } from 'reactstrap';
import styled from 'styled-components';
import colors from 'utils/colors';

const SidebarContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 2%;
  padding-right: 2%;
`;

const Logo = styled.img`
  height: 48px;
  width: 48px;
`;

const Row = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
`;

const Text = styled.text`
  color: ${p => p.theme.text};
`;

function Sidebar(): JSX.Element {
  const rows = [
    {
      text: 'Home',
      route: '/',
    },
    {
      text: 'Upload New',
      route: '/uploads/new',
    },
    {
      text: 'See Previous Uploads',
      route: '/uploads/past',
    },
  ];

  const renderRow = row => {
    return (
      <NavLink href={row.route} key={row.text}>
        <Row>
          <Text>{row.text}</Text>
        </Row>
      </NavLink>
    );
  };

  return (
    <SidebarContainer>
      <Logo src="data:image/png;base64,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" />
      {rows.map(renderRow)}
    </SidebarContainer>
  );
}

export default Sidebar;
