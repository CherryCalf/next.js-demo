"use client"
import { Breadcrumb, DatePicker, message, Upload } from "antd";
import type { UploadProps } from "antd";
import { useEffect, useState } from "react";
import { InboxOutlined } from '@ant-design/icons';
import axios from "axios";
import { SmileOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import { Button } from 'antd';
import { axiosGet, axiosPost } from '../../public/AxiosUtil'
import SizeContext from "antd/es/config-provider/SizeContext";
export default function FilesUpload() {
  const [disabled, setDisabled] = useState(true)
  const [mount, setMount] = useState(false)
  const [up1, setUp1] = useState(false)
  const [up2, setUp2] = useState(false)
  // 合并按钮提示信息
  const [messageApi, contextHolder] = message.useMessage();
  const mergeInfo = () => {
    messageApi.open({
      type: 'success',
      content: '上传成功',
      className: 'custom-class',
      style: {
        marginLeft: '20vh',
      },
    });
  };
  const mergeError = () => {
    messageApi.open({
      type: 'error',
      content: '上传失败，请重新上传文件',
      className: 'custom-class',
      style: {
        marginLeft: '20vh',
      },
    });
  };

  // 月份输入框
  const [inputnum, setInputnum] = useState<string>()
  const onChange = (date: Dayjs, dateString: string | string[]) => {
    console.log(dateString)
    // inputnum = dateString
    setInputnum(dateString)
    console.log(inputnum)
    if (dateString != undefined || dateString != null || dateString != '') {
      setMount(true)
    }
  };

  // 文件上传组件plannedWork
  const propsplanned: UploadProps = {
    name: 'file',
    multiple: true,
    maxCount: 1,
    customRequest: async (options) => {
      const { onSuccess, onError, file, onProgress } = options;
      const formData = new FormData();
      formData.append('file', file);
      try {
        console.log(inputnum)
        if (inputnum == undefined || inputnum == null) {
          console.log(inputnum)
          throw new Error("请填入您要处理的月份")
        }
        const response = await axiosPost('/user/plannedWork/read?date=' + inputnum + "-01", formData, "multipart/form-data");
        if (response.data.code === 500) {
          throw new Error("文件内容有误")
        } else {
          onSuccess(response.data);
          setUp1(true)
        }

      } catch (error) {
        if (error.status == 400) {
          error.message = "请填入您要处理的月份"
        }
        onError(error);
      }
    },
    method: "POST",
    accept: ".xls,.xlsx,.xlsm,.xlsb,.xltx,.xltm",
  };
  // 文件上传组件timeSheet
  const propstimesheet: UploadProps = {
    name: 'file',
    multiple: true,
    maxCount: 1,
    customRequest: async (options) => {
      const { onSuccess, onError, file, onProgress } = options;
      const formData = new FormData();
      formData.append('file', file);

      try {
        console.log(inputnum)
        if (inputnum == undefined || inputnum == null) {
          console.log(inputnum)
          throw new Error("请填入您要处理的月份")
        }
        const response = await axiosPost('/user/timesheet/read?date=' + inputnum + "-01", formData, "multipart/form-data")
        if (response.data.code === 500) {
          throw new Error("文件内容有误")
        } else {
          onSuccess(response.data);
          setUp2(true)
        }
      } catch (error) {
        if (error.status == 400) {
          error.message = "请填入您要处理的月份"
        }
        onError(error);
      }
    },
    method: "POST",
    accept: ".xls,.xlsx,.xlsm,.xlsb,.xltx,.xltm",
  };
  const smileIcon = <SmileOutlined />;

  const merge = function () {
    axiosGet('/user/total/merge').then(res => {
      res.data.code == '200' ? mergeInfo() : mergeError()
    })
  }
  //监听
  useEffect(() => {
    console.log('mount', mount)
    if (mount == true && (up1 == true && up2 == true)) {
      setDisabled(false)
    }
  }, [mount])
  useEffect(() => {
    console.log('我是改变后的up1', up1)
    if (mount == true && (up1 == true && up2 == true)) {
      setDisabled(false)
    }
  }, [up1])
  useEffect(() => {
    console.log('我是改变后的up2', up2)
    if (mount == true && (up1 == true && up2 == true)) {
      setDisabled(false)
    }
  }, [up2])
  return (
    <div> {/* 面包屑 */}
      <div style={{ marginBottom: "30px" }}>
        <Breadcrumb
          items={[
            {
              title: <span style={{ fontSize: "30px" }}>文件上传</span>
            }
          ]}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: "20px", marginTop: "200px" }}>
          <span>请输入您当前要处理的月份:</span>
          <DatePicker suffixIcon={smileIcon} onChange={onChange} picker="month" />
        </div>

        <div style={{ display: "flex", width: "1200px", flexDirection: "row", justifyContent: "space-around" }}>
          <Upload.Dragger {...propsplanned} style={{ width: "500px" }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或将计划工时拖到此区域进行上传</p>

          </Upload.Dragger>

          <Upload.Dragger {...propstimesheet} style={{ width: "500px" }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">单击或将timesheet拖到此区域进行上传</p>

          </Upload.Dragger>
        </div>

        <div>
          {contextHolder}
          <Button style={{ marginTop: "40px" }} type="primary" onClick={merge} disabled={disabled}>确认</Button>
        </div>
      </div>
    </div >
  );
}
