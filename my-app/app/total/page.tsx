'use client'
import { Breadcrumb, Button, Form, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { axiosGet } from '@/public/AxiosUtil';
import type { TableProps } from 'antd';

//导出文件
const exportExcel = () => {
  try {
    axiosGet("/user/totalBefore/export", null, undefined, 'blob').then((res) => {
      res.headers.content
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '案件别合计.xlsx'); // 指定下载文件的名称
      document.body.appendChild(link);
      link.click();
    });
  } catch (error) {
    console.error('下载文件失败', error);
  }
}

export default function filter() {
  const [columns, setColumns] = useState()
  const [dataSource, setDataSource] = useState()
  //获取表头,获取表内数据,获取合计数据
  // const getListName = function () {
  //   axiosGet('/user/totalBefore/listTableName').then((res) => {
  //     let s1: React.SetStateAction<undefined> | { title: any; dataIndex: any; key: any; fixed?: any; width?: any; ellipsis?: any; render?: any }[] = []

  //     for (let index = 0; index < res.data.data.length; index++) {
  //       s1.push({ title: res.data.data[index], dataIndex: res.data.data[index], key: res.data.data[index] })
  //     }

  //     s1[0].fixed = "left"
  //     s1[1].fixed = "left"
  //     s1[2].fixed = "left"

  //     s1[0].width = 50
  //     s1[2].width = 300
  //     s1[3].width = 100

  //     for (let index = 4; index < res.data.data.length; index++) {
  //       s1[index].width = 140
  //     }
  //     setColumns(s1)
  //     axiosGet('/user/totalBefore/listAll').then((res) => {
  //       setTimeout(() => {
  //         for (let index = 0; index < res.data.data.length; index++) {
  //           res.data.data[index].id = index + 1
  //         }
  //         setDataSource(res.data.data)
  //       }, 1000);
  //       console.log(res.data.data)
  //     })

  //     axiosGet('/user/totalBefore/totalStatistics').then((res) => {

  //       const length = s1.length
  //       let s2 = []
  //       var totalKeys = Object.keys(res.data.data)
  //       var totalValues = Object.values(res.data.data)
  //       for (let index = 3; index < s1.length; index++) {
  //         for (let i = 0; i < totalKeys.length; i++) {
  //           const totalKey = totalKeys[i];
  //           const totalValue = totalValues[i];
  //           if (totalKey == s1[index].key) {
  //             s2.push(totalValue);
  //           }
  //         }
  //       }
  //       setTimeout(() => {
  //         setItems(s2)
  //       }, 1000);
  //     })
  //   })
  // }
  // 假数据生成函数
  const getListName = function () {
    // 模拟表头数据
    const s1 = mockTableHeaders.map((header, index) => ({
      title: header,
      dataIndex: header,
      key: header,
      fixed: index < 3 ? "left" : undefined, // 固定前三列
      width: index === 0 ? 50 : index === 2 ? 300 : 140, // 设置列宽
    }));

    setColumns(s1);

    // 模拟表格数据
    setTimeout(() => {
      setDataSource(mockTableData);
    }, 500);

    // 模拟合计数据
    setTimeout(() => {
      const totalValues = Object.values(mockTotalStatistics);
      setItems(totalValues);
    }, 500);
  };
  let [items, setItems] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getListName()
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const [bottom, setBottom] = useState<TablePaginationPosition<DataType>>('none');

  return (
    <>
      <div style={{ marginBottom: "10px", height: "40px", fontStyle: "STKaiti" }}>
        <Breadcrumb
          items={[
            {
              title: <span style={{ fontSize: "30px" }}>案件别合计</span>
            }
          ]}
        />
        <h1 style={{ fontSize: "20px" }}>
          (人/时)
        </h1>
      </div>

      {/* 导出按钮 */}
      <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }} style={{ marginRight: "20px" }}>
          <Button type="primary" htmlType="submit" onClick={exportExcel}>
            导出
          </Button>
        </Form.Item>
      </div>
      {/* 表格 */}
      <Spin spinning={loading} >
        <Table<DataType>
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: 'max-content', y: "calc(100vh - 350px)" }}
          pagination={false}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={3}>
                  合计
                </Table.Summary.Cell>
                {items.map((item) => (
                  <Table.Summary.Cell index={3}>{item} </Table.Summary.Cell>
                ))}
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Spin>
    </>
  );
};

type ColumnsType<T extends object> = TableProps<T>['columns'];
type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition<T extends object> = NonNullable<
  TablePagination<T>['position']
>[number];

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
// 假数据生成函数
const generateMockData = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Name ${index + 1}`,
    age: 20 + (index % 10),
    address: `Address ${index + 1}`,
    tags: [`Tag ${index % 3 + 1}`],
    [`Column ${index % 5 + 1}`]: `Value ${index + 1}`,
  }));
};

// 模拟表头数据
const mockTableHeaders = [
  "ID",
  "Name",
  "Age",
  "Address",
  "Tags",
  "Column 1",
  "Column 2",
  "Column 3",
  "Column 4",
  "Column 5",
  "Column 5",
  "Column 5",
  "Column 5",
  "Column 5",
  "Column 5",
  "Column 5",
  "Column 5",
  "Column 5",
  "Column 5",
  "Column 5",
  "Column 5",
];

// 模拟表格数据
const mockTableData = generateMockData(50); // 模拟 50 条数据

// 模拟合计数据
const mockTotalStatistics = {
  "Column 1": 500,
  "Column 2": 450,
  "Column 3": 400,
  "Column 4": 350,
  "Column 5": 300,
};