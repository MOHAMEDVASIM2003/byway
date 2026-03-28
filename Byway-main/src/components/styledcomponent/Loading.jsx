import * as React from 'react';
import { styled } from '@mui/material/styles';

// Define the Loading component
const LoadingContainer = styled('div')({
  boxShadow: '2em 0 2em rgba(0, 0, 0, 0.2) inset, -2em 0 2em rgba(255, 255, 255, 0.1) inset',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  transform: 'rotateX(30deg) rotateZ(45deg)',
  width: '14em',
  height: '14em',
  color: 'white',
  borderRadius: '50%',
  '--bg': '#2e3138',
  '--primary1': '#6b7280',
  '--primary2': '#9ca3af',
  '--fg-t': 'rgba(255, 255, 255, 0.8)',
});

const Dot = styled('div')({
  animationName: 'shadow724',
  boxShadow: '0.1em 0.1em 0 0.1em black, 0.3em 0 0.3em rgba(0, 0, 0, 0.5)',
  top: 'calc(50% - 0.75em)',
  left: 'calc(50% - 0.75em)',
  width: '1.5em',
  height: '1.5em',
  borderRadius: '50%',
  position: 'absolute',
  '&:before, &:after': {
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    position: 'absolute',
    content: '""',
    display: 'block',
    left: 0,
    width: 'inherit',
    transition: 'background-color 0.3s',
  },
  '&:before': {
    animationName: 'pushInOut1724',
    backgroundColor: 'var(--bg)',
    borderRadius: 'inherit',
    boxShadow: '0.05em 0 0.1em rgba(255, 255, 255, 0.2) inset',
    height: 'inherit',
    zIndex: 1,
  },
  '&:after': {
    animationName: 'pushInOut2724',
    backgroundColor: 'var(--primary1)',
    borderRadius: '0.75em',
    boxShadow: '0.1em 0.3em 0.2em rgba(255, 255, 255, 0.4) inset, 0 -0.4em 0.2em #2e3138 inset, 0 -1em 0.25em rgba(0, 0, 0, 0.3) inset',
    bottom: 0,
    clipPath: 'polygon(0 75%, 100% 75%, 100% 100%, 0 100%)',
    height: '3em',
    transform: 'rotate(-45deg)',
    transformOrigin: '50% 2.25em',
  },
});

const Text = styled('div')({
  fontSize: '0.75em',
  maxWidth: '5rem',
  position: 'relative',
  textShadow: '0 0 0.1em var(--fg-t)',
  transform: 'rotateZ(-45deg)',
});

// Define dots with their specific transforms and animation delays
const dots = Array.from({ length: 12 }, (_, index) => {
  const angle = index * -30;
  const zIndex = index < 6 ? 6 - index : index - 5;
  const animationDelay = -(index * 0.1666666667) + 's';
  return (
    <Dot
      key={index}
      sx={{
        transform: `rotate(${angle}deg) translateX(5em) rotate(${-angle}deg)`,
        zIndex,
        '&, &:before, &:after': {
          animationDelay,
        },
      }}
    />
  );
});

// Define keyframes using Emotion
const GlobalStyles = styled('div')({
  '@keyframes shadow724': {
    from: {
      animationTimingFunction: 'ease-in',
      boxShadow: '0.1em 0.1em 0 0.1em black, 0.3em 0 0.3em rgba(0, 0, 0, 0.3)',
    },
    '25%': {
      animationTimingFunction: 'ease-out',
      boxShadow: '0.1em 0.1em 0 0.1em black, 0.8em 0 0.8em rgba(0, 0, 0, 0.5)',
    },
    '50%, to': {
      boxShadow: '0.1em 0.1em 0 0.1em black, 0.3em 0 0.3em rgba(0, 0, 0, 0.3)',
    },
  },
  '@keyframes pushInOut1724': {
    from: {
      animationTimingFunction: 'ease-in',
      backgroundColor: 'var(--bg)',
      transform: 'translate(0, 0)',
    },
    '25%': {
      animationTimingFunction: 'ease-out',
      backgroundColor: 'var(--primary2)',
      transform: 'translate(-71%, -71%)',
    },
    '50%, to': {
      backgroundColor: 'var(--bg)',
      transform: 'translate(0, 0)',
    },
  },
  '@keyframes pushInOut2724': {
    from: {
      animationTimingFunction: 'ease-in',
      backgroundColor: 'var(--bg)',
      clipPath: 'polygon(0 75%, 100% 75%, 100% 100%, 0 100%)',
    },
    '25%': {
      animationTimingFunction: 'ease-out',
      backgroundColor: 'var(--primary1)',
      clipPath: 'polygon(0 25%, 100% 25%, 100% 100%, 0 100%)',
    },
    '50%, to': {
      backgroundColor: 'var(--bg)',
      clipPath: 'polygon(0 75%, 100% 75%, 100% 100%, 0 100%)',
    },
  },
});

const Loading = () => {
  return (
    <>
      <GlobalStyles />
      <LoadingContainer>
        {dots}
        <Text>Loading…</Text>
      </LoadingContainer>
    </>
  );
};

export default Loading;