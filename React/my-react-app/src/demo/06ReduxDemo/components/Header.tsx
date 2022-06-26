import React from 'react';
// import { connect } from 'react-redux';
import { connect } from '../source/react-redux';
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
const mapDispatchToProps = () => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)