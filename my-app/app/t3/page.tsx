"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Table, Spin } from 'antd';

const TableWithDynamicHeader = () => {
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState([]);

    const colum = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ]
    // 模拟动态获取表头属性和样式
    useEffect(() => {
        setTimeout(() => {
            setColumns(colum);
            setLoading(false);
        }, 1000);
    }, []);

    const memoizedColumns = useMemo(() => columns, [columns]);

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ];

    return (
        <Spin spinning={loading}>
            <Table columns={memoizedColumns} dataSource={data} />
        </Spin>
    );
};

export default TableWithDynamicHeader;