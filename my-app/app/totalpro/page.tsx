'use client'
import { Breadcrumb, Button, Form, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { axiosGet } from '@/public/AxiosUtil';
import type { TableProps } from 'antd';

//导出文件
const exportExcel = () => {
  try {
    axiosGet("/user/total/export", null, undefined, "blob").then((res) => {
      res.headers.content
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '案件别合计（按分后）.xlsx'); // 指定下载文件的名称
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
  
    const getListName = function () {
      axiosGet('/user/total/listTableName').then((res) => {
        let s1: React.SetStateAction<undefined> | { title: any; dataIndex: any; key: any; fixed?: any; width?: any; ellipsis?: any; render?: any }[] = []
  
        for (let index = 0; index < res.data.data.length; index++) {
          s1.push({ title: res.data.data[index], dataIndex: res.data.data[index], key: res.data.data[index] })
        }
        s1[0].fixed = "left"
        s1[1].fixed = "left"
        s1[2].fixed = "left"
  
        s1[0].width = 50
        s1[2].width = 300
        s1[3].width = 100
        s1[4].width = 160
        s1[5].width = 100

        for (let index = 6; index < res.data.data.length; index++) {
          s1[index].width = 140
        }
        setColumns(s1)
        axiosGet('/user/total/listAll').then((res) => {
          for(let index = 0; index < res.data.data.length; index++){
            res.data.data[index].id = index+1
          }
          setDataSource(res.data.data)
        })
  
        axiosGet('/user/total/totalStatistics').then((res) => {
  
          const length = s1.length
          let s2 = []
          var totalKeys = Object.keys(res.data.data)
          var totalValues = Object.values(res.data.data)
          for (let index = 3; index < s1.length; index++) {
            for (let i = 0; i < totalKeys.length; i++) {
              const totalKey = totalKeys[i];
              const totalValue = totalValues[i];
              if (totalKey == s1[index].key) {
                s2.push(totalValue);
              }
            }
          }
          setItems(s2)
        })
      })
    }
  
    let [items, setItems] = useState([])

  //调用方法
  useEffect(() => {
    getListName()

  }, []);
  const [bottom, setBottom] = useState<TablePaginationPosition<DataType>>('none');

  return (
    <>
      <div style={{ marginBottom: "10px" ,height:"40px", fontStyle: "STKaiti"}}>
        <Breadcrumb
          items={[
            {
              title: <span style={{ fontSize: "30px" }}>按分后合计</span>
            }
          ]}
        />
        <h1 style={{fontSize:"20px"}}>
          (140人/月)
        </h1>
      </div>

      <Form.Item wrapperCol={{ offset: 6, span: 16 }} style={{ marginLeft: "95%", marginTop: "30px"  }}>
        <Button type="primary" htmlType="submit" onClick={exportExcel}>
          导出
        </Button>
      </Form.Item>

      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 'max-content', y: 55 * 10 }}
        pagination={{ position: [bottom], defaultPageSize: 99999 }}
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={3}>
                合计
              </Table.Summary.Cell >
              {items.map((item) => (
                <Table.Summary.Cell index={3}>{item}</Table.Summary.Cell>
              ))}
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
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
