import React from 'react';
import { connect } from 'react-redux';
interface Props {
  themeColor: string;
}
const Header = (props: Props) => {
  const { themeColor } = props;

  return (
    <h4 style={{color: themeColor}}>案例1： 设置主题色</h4>
  )
}
const mapStateToProps = (state: any) => {
  return {
    themeColor: state.themeReducer.themeColor
  }
}
export default connect(mapStateToProps)(Header)