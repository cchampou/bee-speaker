import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import styled from '@emotion/styled';

console.log('Application started');

const RootWrapper = styled('div')`
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  display: flex;
  align-items: flex-end;
`;

const Wrapper = styled('div')`
  display: inline-flex;
  flex-direction: column;
  margin: 20px;
  min-width: 120px;
  width: 150px;
`;

const Brood = styled('div')`
  border: solid 4px #331a00;
  display: inline-flex;
`;

const Super = styled('div')`
  height: 40px;
  background-color: #994f00;
  margin: 2px;
`;

const Roof = styled('div')`
  height: 40px;
  margin: 2px;
  clip-path: polygon(50% 0, 100% 75%, 100% 100%, 0 100%, 0 75%);
  background: radial-gradient(circle at center, transparent 10%, #331a00 10.5%);
`;

const Support = styled('div')`
  height: 40px;
  background-color: #331a00;
  margin: 2px;
  clip-path: polygon(10% 0, 90% 0, 100% 100%, 90% 100%, 80% 20%, 20% 20%, 10% 100%, 0 100%);
`;

const Frame = styled('div')`
  width: 8px;
  height: 96px;
  background-color: #994f00;
  margin: 2px;
`;

const Label = styled('p')`
  font-family: sans-serif;
  font-weight: 900;
  text-align: center;
`;

const Ruche = ({
  name,
  frames,
  supers,
  text,
  weight,
  brood,
               }) => {

  return <Wrapper>
    <Roof />
    {Array(supers).fill('').map(e => <Super />)}
    <Brood>
      {Array(frames).fill('').map(e => <Frame />)}
    </Brood>
    <Support />
    <Label>{`Ruche ${name}`}</Label>

    <p>{brood && `Quantité de couvain : ${brood}`}</p>
    <p>{weight && `${weight} kg. `}{text}</p>
  </Wrapper>;
};

const Home = () => {
  const [state, setState] = useState({});

  useEffect(() => {
    const socket = io();
    socket.on('new state', function(state) {
      setState(state);
    });
  }, []);

  return <RootWrapper>{Object.keys(state).map(key => <Ruche name={key} {...state[key]} />)}</RootWrapper>;
};

render(<Home />, document.getElementById('root'));
