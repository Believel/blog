// 第一种方式实现缓存：Map
// 缓存实现写在业务代码中
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Space, Spin, Table } from 'antd';
axios.defaults.baseURL = 'https://api.github.com';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  }
]
// ！定义在函数组件外，是需要在页面卸载的时候清除的，否则针对单页面再次进来是有影响的
const cacheMap = new Map();
const Demo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<Array<any>>([])
  
  const fetchList = async (username :string) => {
    setLoading(true);
    // 实现缓存
    // 键值：这里用得是请求的参数，因为参数这里能保证是唯一的
    const cacheResult = cacheMap.get(username)
    // 有了，就直接拿来用
    if (cacheResult) {
      setList(cacheResult)
      setLoading(false);
      return
    }
    const res: any = await axios.request({
      url: `users/${username}/repos`,
      method: 'get'
    })
    // 不存在在缓存中，就存一份
    cacheMap.set(username, res.data);
    setLoading(false);
    setList(res.data);
  }

  const getUserInfo = (username: string) => {
    fetchList(username)
  }
  useEffect(() => {
    return () => {
      // 卸载
      cacheMap.clear();
    }
  }, [])
  return (
    <Spin spinning={loading}>
      <Space size="small">
        <Button onClick={() => getUserInfo('Believel')}>Believle</Button>
        <Button onClick={() => getUserInfo('zhangxiang958')}>zhangxiang958</Button>
        <Button onClick={() => getUserInfo('tanggd')}>tanggd</Button>
        <Button onClick={() => getUserInfo('baozouai')}>baozouai</Button>
      </Space>
      <Table dataSource={list} columns={columns} rowKey='id' />
    </Spin>
  )
};
export default Demo;