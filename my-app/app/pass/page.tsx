'use client'
import { Breadcrumb, Pagination, Segmented, SelectProps, Space, Spin } from 'antd';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Switch, Form, Select, Button } from 'antd';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { axiosGet, axiosPost } from '../../public/AxiosUtil'

var param = {
  dalianTeam: [],
  project: []
}
export default function filter() {
  const [getDalianTeamSelect, setGetDalianTeamSelect] = useState()
  const [getProjectSelect, setgetProjectSelect] = useState()


  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [dataSource2, setDataSource2] = useState<DataType[]>([]);
  const [dataSource3, setDataSource3] = useState<DataType[]>([]);


  // 获取不合格数据
  const getUnPass = function () {
    axiosPost('/user/unPass?current=0&size=10000', { "dalianTeam": "WMB" }).then((res) => {
      setDataSource2(res.data.data)
    })
  }
  // 获取合格数据
  const getPass = function () {
    axiosPost('/user/pass?current=0&size=10000', { "dalianTeam": "WMB" }).then(res => {
      setDataSource(res.data.data)
    })
  }
  // 获取全部数据
  const selectRef1 = useRef(null);
  const selectRef2 = useRef(null);
  const [selectedValues1, setSelectedValues1] = useState<string[]>([]);
  const [selectedValues2, setSelectedValues2] = useState<string[]>([]);

  const handleChange1 = (value: string[]) => {
    console.log(`selected ${value}`);
    param.dalianTeam = value
    console.log(param)
    setSelectedValues1(value);
  };
  const handleChange2 = (value: string[]) => {
    console.log(`selected ${value}`);
    param.project = value
    console.log(param)
    setSelectedValues2(value);
  };

  const getAll = function () {
    console.log(param)
    axiosPost("/user/filterData", param).then(res => {
      setDataSource3(res.data.data)
    });
  }
  //重置表格数据
  const resetTableData = () => {
    param = {
      dalianTeam: [],
      project: []
    }
    setSelectedValues1([])
    setSelectedValues2([])
    getAll()
  }



  const columns: TableColumnsType<DataType> = [
    {
      title: 'dalianTeam',
      dataIndex: 'dalianTeam',
      key: '1',
      width: "100"
    },
    {
      title: 'tokyoTeam',
      dataIndex: 'tokyoTeam',
      key: '2',
      width: "100"

    },
    {
      title: 'name',
      dataIndex: 'name',
      key: '3',
      width: "100"

    },
    {
      title: 'project',
      dataIndex: 'project',
      key: '4',
      width: "100"

    },
    {
      title: 'workingTime',
      dataIndex: 'workingTime',
      key: '5',
      width: "100"

    },
    {
      title: 'task',
      dataIndex: 'task',
      key: '6',
      width: "100"

    }, {
      title: 'memo',
      dataIndex: 'memo',
      key: '7',
      width: "100"

    }, {
      title: 'entity',
      dataIndex: 'entity',
      key: '8',
      width: "100"

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
  let t1 = document.getElementById("t1")
  let t2 = document.getElementById("t2")
  let t3 = document.getElementById("t3")
  let s1 = document.getElementById("s1")
  let s2 = document.getElementById("s2")
  let b1 = document.getElementById("b1")
  let b2 = document.getElementById("b2")
  useEffect(() => {

    setTimeout(() => {
      // 请求table默认合格数据
      getPass()
      // 请求table默认不合格数据
      getUnPass()
      // 请求table全部数据
      getAll()
    }, 1000);


    // 请求筛选项dalianTeam
    axiosPost("/user/dalianTeam").then((res) => {
      console.log(res.data.data)
      let s1: React.SetStateAction<undefined> | { label: any; value: any; key: any; }[] = []
      res.data.data.forEach((e: { dalianTeam: any; }) => {
        s1.push({ label: e.dalianTeam, value: e.dalianTeam, key: e.dalianTeam })
      });
      setGetDalianTeamSelect(s1)
    })

    // 请求筛选项project
    axiosPost("/user/project").then((res) => {
      let s2: React.SetStateAction<undefined> | { label: any; value: any; key: any; }[] = []
      res.data.data.forEach((e: { project: any; }) => {
        s2.push({ label: e.project, value: e.project, key: e.project })
      });
      setgetProjectSelect(s2)
    })

    setTimeout(() => {
      // setColumns(colum);
      setLoading(false);
    }, 1000);
  }, []);

  const exportExcel = () => {
    try {
      axiosGet("/user/passExport", null, undefined, 'blob').then((res) => {
        res.headers.content
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '合格/不合格数据.xlsx'); // 指定下载文件的名称
        document.body.appendChild(link);
        link.click();

      });
    } catch (error) {
      console.error('下载文件失败', error);
    }
  }
  // 分页合格
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const [pageSize, setPageSize] = useState(10); // 每页条数
  // 分页数据
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return dataSource.slice(startIndex, endIndex);
  }, [currentPage, pageSize, dataSource]);


  // 分页不合格
  const [currentPage2, setCurrentPage2] = useState(1); // 当前页码
  const [pageSize2, setPageSize2] = useState(10); // 每页条数
  // 分页数据
  const paginatedData2 = useMemo(() => {
    const startIndex2 = (currentPage2 - 1) * pageSize2;
    const endIndex2 = startIndex2 + pageSize;
    return dataSource2.slice(startIndex2, endIndex2);
  }, [currentPage2, pageSize2, dataSource2]);


  // 分页全部
  const [currentPage3, setCurrentPage3] = useState(1); // 当前页码
  const [pageSize3, setPageSize3] = useState(10); // 每页条数
  // 分页数据
  const paginatedData3 = useMemo(() => {
    const startIndex3 = (currentPage3 - 1) * pageSize3;
    const endIndex3 = startIndex3 + pageSize3;
    return dataSource3.slice(startIndex3, endIndex3);
  }, [currentPage3, pageSize3, dataSource3]);

  return (
    <>
    <div style={{ marginBottom: "30px" }}>
    <Breadcrumb
      items={[
        {
          title: <span style={{ fontSize: "30px" }}>数据筛选项</span>
        }
      ]}
    />
    </div>
    <div
      style={{
        width: "100%",
        height: "100vh", // 占满屏幕高度
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // 隐藏外部滚动条
      }}
    >

      <Segmented
        options={["合格数据", "不合格数据", "全部数据"]}
        defaultValue="合格数据"
        onChange={(value) => {
          console.log(value);
          if (value === "合格数据") {
            t1.style.display = "flex"
            t2.style.display = "none"
            t3.style.display = "none"
            s1.style.display = "none"
            s2.style.display = "none"
            b1.style.display = "none"
            b2.style.display = "none"

          } else if (value === "不合格数据") {
            t1.style.display = "none"
            t2.style.display = "flex"
            t3.style.display = "none"
            s1.style.display = "none"
            s2.style.display = "none"
            b1.style.display = "none"
            b2.style.display = "none"
          } else if (value === "全部数据") {
            t1.style.display = "none"
            t2.style.display = "none"
            t3.style.display = "flex"
            s1.style.display = "block"
            s2.style.display = "block"
            b1.style.display = "block"
            b2.style.display = "block"
          }
        }}
        style={{
          marginBottom: "10px",
        }}
      />
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-end", marginBottom: "10px" }} >
        <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: "100%" }}>
          <Form style={{ width: "98%", display: "flex", flexDirection: "row" }}>
            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: "200%" }}>
              <div id='s1' style={{ display: "none", width: "100%" }}>
                <Form.Item
                  label="dalianTeam"
                  name="dalianTeam"
                  style={{ width: '90%' }}
                >
                  <Space style={{ width: '100%' }} direction="vertical">
                    <Select
                      ref={selectRef1}
                      mode="multiple"
                      allowClear
                      style={{ width: '100%' }}
                      placeholder={"请选择"}
                      value={selectedValues1}
                      onChange={handleChange1}
                      options={getDalianTeamSelect}
                    />
                  </Space>
                </Form.Item>
              </div>
              <div id='s2' style={{ display: "none", width: "100%" }}>
                <Form.Item
                  label="project"
                  name="project"
                  style={{ width: '90%', marginLeft: "30px" }}
                >
                  <Space style={{ width: '100%' }} direction="vertical">
                    <Select
                      ref={selectRef2}
                      mode="multiple"
                      allowClear
                      style={{ width: '100%' }}
                      placeholder={"请选择"}
                      value={selectedValues2}
                      onChange={handleChange2}
                      options={getProjectSelect}
                    />
                  </Space>
                </Form.Item>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
              <div id='b1' style={{ display: "none" }}>
                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                  <Button type="primary" htmlType="submit" onClick={getAll}  >
                    查询
                  </Button>
                </Form.Item>
              </div>
              <div id='b2' style={{ display: "none" }} >
                <Form.Item wrapperCol={{ offset: 6, span: 16 }} style={{ marginLeft: "20px" }}>
                  <Button type="primary" htmlType="submit" onClick={resetTableData}  >
                    重置
                  </Button>
                </Form.Item>
              </div>
              <Form.Item wrapperCol={{ offset: 6, span: 16 }} style={{ marginLeft: "20px" }}>
                <Button type="primary" htmlType="submit" onClick={exportExcel}>
                  导出
                </Button>
              </Form.Item>
            </div>
          </Form>

        </div>
      </div>
      <div id='t1' style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <Spin spinning={loading} size={"large"} style={{ flex: 1, backgroundColor: "white", overflow: "hidden" }}>
          {/* 表格容器 */}
          <div
            style={{
              flex: 1,
              overflow: "auto",
              height: "calc(100vh - 200px)", // 动态计算表格高度
            }}
            className="table-container" // 添加自定义类名
          >
            <Table
              columns={columns}
              dataSource={paginatedData}
              pagination={false} // 禁用默认分页
              scroll={{ x: "max-content", y: "calc(100vh - 250px)" }} // 设置表格滚动高度
              rowClassName={() => "custom-row"} // 添加自定义行样式
            />

          </div>
        </Spin>
        {/* 自定义分页组件 */}
        <Pagination
          style={{ marginTop: "10px", textAlign: "center" }}
          current={currentPage}
          pageSize={pageSize}
          total={dataSource.length}
          showSizeChanger
          pageSizeOptions={["5", "10", "20", "50"]}
          onChange={(page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          }}
          showTotal={(total) => `共 ${total} 条`}
        />
      </div>
      <div id='t2' style={{ display: "none", flexDirection: "column", alignItems: "flex-end" }}>
        <Spin spinning={loading} size={"large"} style={{ flex: 1, overflow: "hidden", backgroundColor: "white", }}>
          {/* 表格容器 */}
          <div
            style={{
              flex: 1,
              overflowX: "auto",
              height: "calc(100vh - 200px)", // 动态计算表格高度
            }}
            className="table-container" // 添加自定义类名
          >
            <Table
              columns={columns}
              dataSource={paginatedData2}
              pagination={false} // 禁用默认分页
              scroll={{ x: "max-content", y: "calc(100vh - 250px)" }} // 设置表格滚动高度
              rowClassName={() => "custom-row"} // 添加自定义行样式
            />

          </div>
        </Spin>
        {/* 自定义分页组件 */}
        <Pagination
          style={{ marginTop: "10px", textAlign: "center" }}
          current={currentPage2}
          pageSize={pageSize2}
          total={dataSource2.length}
          showSizeChanger
          pageSizeOptions={["5", "10", "20", "50"]}
          onChange={(page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          }}
          showTotal={(total) => `共 ${total} 条`}
        />
      </div>
      <div id='t3' style={{ display: "none", flexDirection: "column", alignItems: "flex-end" }}>
        <Spin spinning={loading} size={"large"} style={{ flex: 1, overflow: "hidden", backgroundColor: "white", }}>
          {/* 表格容器 */}
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              height: "calc(100vh - 200px)", // 动态计算表格高度
            }}
            className="table-container" // 添加自定义类名
          >
            <Table
              columns={columns}
              dataSource={paginatedData3}
              pagination={false} // 禁用默认分页
              scroll={{ x: "max-content", y: "calc(100vh - 250px)" }} // 设置表格滚动高度
              rowClassName={() => "custom-row"} // 添加自定义行样式
            />

          </div>
        </Spin>
        {/* 自定义分页组件 */}
        <Pagination
          style={{ marginTop: "10px", textAlign: "center" }}
          current={currentPage3}
          pageSize={pageSize3}
          total={dataSource3.length}
          showSizeChanger
          pageSizeOptions={["5", "10", "20", "50"]}
          onChange={(page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          }}
          showTotal={(total) => `共 ${total} 条`}
        />
      </div>

    </div>
    </>
  );
}
