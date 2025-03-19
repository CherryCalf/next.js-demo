"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Table, Spin, Breadcrumb, Pagination } from "antd";
import { Segmented } from "antd";

const TableWithDynamicHeader = () => {
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const [pageSize, setPageSize] = useState(10); // 每页条数

  const colum = [];
  const colum1 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150, // 设置列宽度
      fixed: "left",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 100, // 设置列宽度
      fixed: "left",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200, // 设置列宽度
    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100, // 设置列宽度
      }, {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100, // 设置列宽度
      }, {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100, // 设置列宽度
      }, {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100, // 设置列宽度
      }, {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100, // 设置列宽度
      }, {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100, // 设置列宽度
      }, {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100, // 设置列宽度
      }, {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100, // 设置列宽度
      }, {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100, // 设置列宽度
      }, {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100, // 设置列宽度
      }, {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100, // 设置列宽度
      }, {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100, // 设置列宽度
      }, {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100, // 设置列宽度
      }, {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100, // 设置列宽度
      },
  ];

  useEffect(() => {
    colum1.map((item) => {
      colum.push(item);
    });

    setTimeout(() => {
      setColumns(colum);
      setLoading(false);
    }, 1000);
  }, []);

  const memoizedColumns = useMemo(() => columns, [columns]);

  const data = Array.from({ length: 50 }, (_, index) => ({
    key: index + 1,
    name: `顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶 ${index + 1}`,
    age: 20 + (index % 10),
    address: `Address ${index + 1}`,
  }));

  // 分页数据
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [currentPage, pageSize, data]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh", // 占满屏幕高度
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // 隐藏外部滚动条
      }}
    >
      <Breadcrumb>Breadcrumb Example</Breadcrumb>

      <Segmented
        options={["合格数据", "不合格数据", "全部数据"]}
        defaultValue="合格数据"
        onChange={(value) => {
          console.log(value);
        }}
        style={{ marginBottom: "10px" }}
      />

      <Spin spinning={loading} style={{ flex: 1, overflow: "hidden" }}>
        {/* 表格容器 */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            height: "calc(100vh - 190px)", // 动态计算表格高度
          }}
          className="table-container" // 添加自定义类名
        >
          <Table
            columns={memoizedColumns}
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
        total={data.length}
        showSizeChanger
        pageSizeOptions={["5", "10", "20", "50"]}
        onChange={(page, size) => {
          setCurrentPage(page);
          setPageSize(size);
        }}
        showTotal={(total) => `共 ${total} 条`}
      />
    </div>
  );
};

export default TableWithDynamicHeader;