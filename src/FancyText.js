import React from 'react'
import { Text } from '@react-three/drei'

function FancyText(props) {
  return (
    <Text
      color={'#EC2D2D'}
      fontSize={1}
      maxWidth={200}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign={'left'}
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      anchorX="center"
      anchorY="middle"
    >
      {props.text}
    </Text>
  )
}

export default FancyText
