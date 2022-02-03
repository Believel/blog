import React from 'react';
import { connect } from 'react-redux'
import Theme from './Theme'

interface Props {
  themeColor: string;
  handleColor: (color: string) => void;
}
const Content = (props: Props) => {
  const { themeColor } = props;
  return (
    <>
      <p style={{color: themeColor }}>我是内容区域</p>
      <Theme {...props}/>
    </>
  )
}
const mapStateToProps = (state: any) => {
  return {
    themeColor: state.themeReducer.themeColor
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    handleColor: (color: string) => {
      dispatch({ type: 'CHANGE_COLOR', themeColor: color})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);