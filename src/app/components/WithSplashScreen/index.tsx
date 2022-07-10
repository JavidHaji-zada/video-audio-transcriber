import React from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';

const Greeting = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-left: 10vw;
  padding-right: 10vh;
`;

const GreetingText = styled.text`
  font-size: 50px;
  color: #3c3c3c;
  font-weight: bold;
  text-align: center;
`;

const WithSplashScreen = (props: {
  children: React.ReactChild;
}): JSX.Element => {
  const { children } = props;
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 5000);
  }, []);

  const skip = () => {
    setIsReady(true);
  };

  return isReady ? (
    <>{children}</>
  ) : (
    <Greeting>
      <GreetingText>
        Hello Inji, I have been carefully developed by Javid (your much beloved
        boyfriend) to transcribe your interviews
      </GreetingText>
      <Button color="primary" onClick={skip}>
        Don't Skip
      </Button>
    </Greeting>
  );
};

export default WithSplashScreen;
