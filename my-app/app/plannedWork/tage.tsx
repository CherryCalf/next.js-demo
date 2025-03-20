'use client'
import React, { useEffect, useState } from 'react';
import type { TableProps } from 'antd';
import { Breadcrumb, Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd'
import { axiosPost, axiosGet } from '@/public/AxiosUtil'
const getTask: any[] = []
export default function plannedWork() {
  const [originData, setOriginData] = useState();
  const [data, setData] = useState<DataType[]>(originData);

  // 请求table数据

  useEffect(() => {
    axiosPost("/user/task?current=0&size=10000").then((res) => {
      let i = 0
      const getProjectSelect: any = []
      res.data.data.forEach((e: { project: any, projectName: any, plannedManHours: any }) => {
        getProjectSelect.push({ key: e.project.toString(), name: e.projectName, plannedWorkingHours: e.plannedManHours })
      });
      console.log(res.data.data)
      setData(getProjectSelect)
    })
  }, []);

  //定义datatype
  interface DataType {
    key: string;
    name: string;
    plannedWorkingHours: number;
  }

  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'text';
    record: DataType;
    plannedWorkingHours: number;
  }

  const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    plannedWorkingHours,
    children,
    ...restProps
  }) => {
    const inputNode = <Input />;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: DataType) => record.key === editingKey;

  const edit = (record: Partial<DataType> & { key: React.Key }) => {
    form.setFieldsValue(record);
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('')
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataType;
      console.log(row);
      await axiosPost("/user/taskUpdate", { "projectName": row.name, "project": key }).then((res) => {
        
      })
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');

      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }

    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: '案件号',
      dataIndex: 'key',
      width: '20%',
      
      ellipsis: true,
      render: (text) => (
        <div style={{ width: "10px", wordBreak: "break-all" }}>{text}</div>
      )
    },
    {
      title: '案件名',
      dataIndex: 'name',
      width: '50%',
      editable: true,
      ellipsis: true,
      render: (text) => (
        <div style={{ width: "10px", wordBreak: "break-all" }}>{text}</div>
      )
    },
    {
      title: '予定工数',
      dataIndex: 'plannedWorkingHours',
      width: '20%',
      
      ellipsis: true,
      render: (text) => (
        <div style={{ width: "10px", wordBreak: "break-all" }}>{text}</div>
      )
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, record: DataType) => {
        const editable = isEditing(record);
        return editable ? (
          <div style={{ width: "10px", wordBreak: "break-all" }}>
            <span>
              <Typography.Link onClick={() => save(record.key)} style={{ marginInlineEnd: 8 }}>
                Save
              </Typography.Link>
            </span></div>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
      ellipsis: true,

    },
  ];
  const mergedColumns: TableProps<DataType>['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType: col.dataIndex === 'plannedWorkingHours' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const exportExcel = () => {
    try {
      axiosGet("/user/taskExport", null, undefined, 'blob').then((res) => {
        console.log(res)
        res.headers.content
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Task一览.xlsx'); // 指定下载文件的名称
        document.body.appendChild(link);
        link.click();
        // 移除链接元素
        // link.parentNode.removeChild(link);
      });
    } catch (error) {
      console.error('下载文件失败', error);
    }
  }

  return (
    <>
      <div style={{ marginBottom: "30px" }}>
        <Breadcrumb
          items={[
            {
              title: <span style={{ fontSize: "30px" }}>Task一览</span>
            }
          ]}
        />
      </div>
      <Form form={form} component={false}>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }} style={{ marginLeft: "95%", marginTop: "50px" }}>
          <Button type="primary" htmlType="submit" onClick={exportExcel}>
            导出
          </Button>
        </Form.Item>
        <Table<DataType>
          style={{
            width: "100%", height: "90%", overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
          components={{
            body: { cell: EditableCell },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
        />
      </Form>
    </>

  );
}
