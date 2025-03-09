'use client';
import Image from "next/image";
import styles from "./page.module.css";
import { Table } from "antd";
import type { TableColumnsType } from 'antd';
import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';


export default function Home() {
  const [dataSource, setDataSource] = useState<DataType[]>([]
  );
  useEffect(() => {
    axios("http://localhost:8080/t", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      setDataSource(res.data);
    });
  }, []); // 空数组作为依赖项，确保只在组件挂载时执行一次

  const updateTableData = () => {
    // 更新表格数据的逻辑
    axios("http://localhost:8080/t2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      setDataSource(res.data);
    });
  };

  return (
    <div >

      <button onClick={updateTableData}>Click me</button>
      <Table<DataType>
        className={styles.customTable}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 'max-content', y: 55 * 5 }}
      />
    </div>
  );
}


interface DataType {
  key: String;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },

];