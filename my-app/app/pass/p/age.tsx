'use client'
import { Breadcrumb, SelectProps, Space } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { Switch, Form, Select, Button } from 'antd';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import axios from "axios";

const getDalianTeamSelect: any[] = []
const getProjectSelect: any[] = []
var param = {
  dalianTeam: [],
  project: []
}
export default function filter() {
  let [passData, setPassData] = useState<String>("默认合格数据")
  const [sb, setSb] = useState<boolean>(true);
  const switchButton = function () {
    if (sb === true) {
      setSb(false)
    } else if (sb === false) {
      setSb(true)
    }
    console.log("切换" + sb)

    if (sb) {
      setPassData("默认不合格数据")
      getUnPass()
    } else {
      setPassData("默认合格数据")
      getPass()
    }
  }
  // 获取不合格数据
  const getUnPass = function () {
    axios("http://localhost:81/unPass?current=0&size=10000", {
      method: "post",
      data: { "dalianTeam": "WMB" }
    }).then((res) => {
      setDataSource(res.data.data)
    })
  }
  // 获取合格数据
  const getPass = function () {
    axios("http://localhost:81/pass?current=0&size=10000", {
      method: "post",
      data: { "dalianTeam": "WMB" }
    }).then((res) => {
      setDataSource(res.data.data)
    })
  }

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [selectedValues1, setSelectedValues1] = useState<string[]>([]);
  const [selectedValues2, setSelectedValues2] = useState<string[]>([]);
  const handleChange1 = (value: string[]) => {
    console.log(`selected ${value}`);
    param.dalianTeam = value
    setSelectedValues1(value);
  };
  const handleChange2 = (value: string[]) => {
    console.log(`selected ${value}`);
    param.project = value
    setSelectedValues2(value);
  };
  useEffect(() => {
    if (sb) {
      // 请求table默认合格数据
      getPass()
    } else {
      // 请求table默认不合格数据
      getUnPass()
    }
    // 请求筛选项dalianTeam
    axios.post("http://localhost:81/dalianTeam").then((res) => {
      let i = 0
      res.data.data.forEach((e: { dalianTeam: any; }) => {
        getDalianTeamSelect.push({ label: e.dalianTeam, value: e.dalianTeam, key: i++ })
      });
    })

    // 请求筛选项project
    axios.post("http://localhost:81/project").then((res) => {
      let i = 0
      res.data.data.forEach((e: { project: any; }) => {
        getProjectSelect.push({ label: e.project, value: e.project, key: i++ })
      });
    })

    // 多选下拉框

  }, []);

  // 更新表格数据的逻辑
  const updateTableData = () => {

    axios("http://localhost:81/filterData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: param
    }).then((res) => {
      console.log(res);
      setDataSource(res.data.data);
      console.log(param)
    });
  };
  //重置表格数据
  const resetTableData = () => {
    param = {
      dalianTeam: [],
      project: []
    }
    setSelectedValues1([])
    setSelectedValues2([])
    if (sb) { getPass() } else { getUnPass() }
  }
  const selectRef1 = useRef(null);
  const selectRef2 = useRef(null);
  const exportExcel = () => {
    try {
      axios("http://localhost:81/passExport", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        responseType: 'blob'
      }).then((res) => {
        res.headers.content
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '合格/不合格数据.xlsx'); // 指定下载文件的名称
        document.body.appendChild(link);
        link.click();
        // 移除链接元素
        link.parentNode.removeChild(link);
      });
    } catch (error) {
      console.error('下载文件失败', error);
    }
  }
  return (
    <div>
      {/* 面包屑 */}
      <div>
        <Breadcrumb
          items={[
            {
              title: '数据筛选项',
            }
          ]}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
        {/* 默认数据筛选滑块 */}
        <Switch checkedChildren="合格数据" unCheckedChildren="不合格数据" defaultChecked onChange={switchButton} />
        {/* 条件筛选框 */}
        <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%", marginTop: "30px" }}>
          <Form style={{ width: "98%", display: "flex", flexDirection: "row" }}>
            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: "100%" }}>
              <Form.Item
                label="dalianTeam"
                name="dalianTeam"
                style={{ width: '50%' }}
              >
                <Space style={{ width: '100%' }} direction="vertical">
                  <Select
                    ref={selectRef1}
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder={passData}
                    value={selectedValues1}
                    onChange={handleChange1}
                    options={getDalianTeamSelect}
                  />
                </Space>
              </Form.Item>

              <Form.Item
                label="project"
                name="project"
                style={{ width: '50%', marginLeft: "30px" }}
              >
                <Space style={{ width: '100%' }} direction="vertical">
                  <Select
                    ref={selectRef2}
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder={passData}
                    value={selectedValues2}
                    onChange={handleChange2}
                    options={getProjectSelect}
                  />
                </Space>
              </Form.Item>
            </div>

            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button type="primary" htmlType="submit" onClick={updateTableData} >
                  查询
                </Button>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 6, span: 16 }} style={{ marginLeft: "20px" }}>
                <Button type="primary" htmlType="submit" onClick={resetTableData}>
                  重置
                </Button>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 6, span: 16 }} style={{ marginLeft: "20px" }}>
                <Button type="primary" htmlType="submit" onClick={exportExcel}>
                  导出
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
        {/* 数据表格 */}
        <div style={{ width: "100%", height: "100%" }}>
          <Table<DataType>
            style={{
              width: "100%", height: "100%", overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: 'max-content', y: '650px ' }}
          />
        </div>
      </div >
    </div >
  );
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'dalianTeam',
    dataIndex: 'dalianTeam',
    key: '1',
    width: 100,
  },
  {
    title: 'tokyoTeam',
    dataIndex: 'tokyoTeam',
    key: '2',
    width: 100,
  },
  {
    title: 'name',
    dataIndex: 'name',
    key: '3',
    width: 100,
  },
  {
    title: 'project',
    dataIndex: 'project',
    key: '4',
    width: 100,
  },
  {
    title: 'workingTime',
    dataIndex: 'workingTime',
    key: '5',
    width: 100,
  },
  {
    title: 'task',
    dataIndex: 'task',
    key: '6',
    width: 300,
  }

];

interface DataType {
  id: String;
  dalianTeam: string;
  tokyoTeam: string;
  name: string;
  project: String;
  workingTime: String;
  task: String;
}
