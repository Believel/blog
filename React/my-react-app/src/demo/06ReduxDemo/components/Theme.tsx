import React from 'react'
import { Button } from 'antd';

interface Props {
  themeColor: string;
  handleColor: (color: string) => void;
}
const Theme = (props: Props) => {
  const { themeColor, handleColor } = props;
  return (
    <>
      <Button type="text" style={{color: themeColor }} onClick={() => handleColor('red')}>变红</Button>
      <Button type="text" style={{color: themeColor}} onClick={() => handleColor('green')}>变绿</Button>
    </>
  )
}

export default Theme;