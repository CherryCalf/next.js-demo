"use client"
import { message, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useState, useEffect } from "react";
import { InboxOutlined } from '@ant-design/icons';
import axios from "axios";


export default function filesUpload() {

  useEffect(() => {

  }, []);


  const { Dragger } = Upload;

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'http://10.143.18.215:8080/user/plannedWork/read',
    headers: {
      "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImV4cCI6MTc0MTc0MzMyMH0.fg2tSRYPjhO9XEi1YMqqMQGCfz-_8241kbaE2rZCUFk",
      "content-type": "multipart/form-data"
    },
    method: "POST",
    accept: ".xls,.xlsx,.xlsm,.xlsb,.xltx,.xltm",
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  return (
    <div>
      <Dragger  {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other
          banned files.
        </p>
      </Dragger>
    </div>
  );
}
