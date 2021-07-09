import React from 'react';
import { useProgress, Html } from '@react-three/drei';

export default function LoadingSplash() {
  const { progress } = useProgress()
  const roundedProgress = progress.toPrecision(3);
  return (
    <Html>
      <div className="loading-splash__background">
        <div className="loading-splash">
          <h1 className="loading-splash__title">LOADING...</h1>
          <h2 className="loading-splash__percentage-loaded">{roundedProgress}% loaded</h2>
        </div>
      </div>
    </Html>
  )
}

