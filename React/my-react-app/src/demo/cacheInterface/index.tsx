import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Space, Spin, Table } from 'antd';
axios.defaults.baseURL = 'https://api.github.com';
import CacheServiceInstance from './cacheService';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  }
]
const Demo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<Array<any>>([])
  const fetchList = async (username :string) => {
    setLoading(true);
    const res: any = await CacheServiceInstance.fetch({
      url: `users/${username}/repos`,
      method: 'get'
    })
    setLoading(false);
    setList(res.data);
  }

  const getUserInfo = (username: string) => {
    fetchList(username)
  }
  useEffect(() => {
    return () => {
      // 清除缓存
      CacheServiceInstance.clearCache();
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
