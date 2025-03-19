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




要将文件上传组件改为使用自定义参数，你可以在 `beforeUpload` 钩子中自定义上传请求。以下是修改后的代码示例：

```tsx
"use client"
import { message, Upload } from "antd";
import type { UploadProps } from "antd";
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
    customRequest: async (options) => {
      const { onSuccess, onError, file, onProgress } = options;
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://10.143.18.215:8080/user/plannedWork/read', formData, {
          headers: {
            "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImV4cCI6MTc0MTc0MzMyMH0.fg2tSRYPjhO9XEi1YMqqMQGCfz-_8241kbaE2rZCUFk",
            "content-type": "multipart/form-data"
          },
          onUploadProgress: (progressEvent) => {
            if (onProgress) {
              // 计算上传进度
              const percent = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
              onProgress({ percent });
            }
          }
        });
        onSuccess(response.data);
        message.success(`${file.name} file uploaded successfully.`);
      } catch (error) {
        onError(error);
        message.error(`${file.name} file upload failed.`);
      }
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
      <Dragger {...props}>
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
```

在这个示例中，我们使用了 `customRequest` 属性来处理自定义上传请求，并通过 `axios` 发送上传请求。这样你可以根据需要添加自定义参数并处理上传进度。




在 `upload.tsx` 文件中，以下是可能导致 "未定义未声明" 的地方，以及相应的修正建议：

### 1. 引入的问题
确保你引入了所有必要的依赖和类型。

### 2. `Dragger` 的定义重复
删除重复定义的 `Dragger` 常量。

### 修正后的代码示例

```tsx
"use client"
import { message, Upload } from "antd";
import type { UploadProps } from "antd";
import { useEffect } from "react";
import { InboxOutlined } from '@ant-design/icons';
import axios from "axios";

export default function FilesUpload() {

  useEffect(() => {

  }, []);

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    customRequest: async (options) => {
      const { onSuccess, onError, file, onProgress } = options;
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://10.143.18.215:8080/user/plannedWork/read', formData, {
          headers: {
            "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImV4cCI6MTc0MTc0MzMyMH0.fg2tSRYPjhO9XEi1YMqqMQGCfz-_8241kbaE2rZCUFk",
            "content-type": "multipart/form-data"
          },
          onUploadProgress: (progressEvent) => {
            if (onProgress) {
              // 计算上传进度
              const percent = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
              onProgress({ percent: percent });
            }
          }
        });
        onSuccess(response.data);
        message.success(`${file.name} file uploaded successfully.`);
      } catch (error) {
        onError(error);
        message.error(`${file.name} file upload failed.`);
      }
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
      <Upload.Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other
          banned files.
        </p>
      </Upload.Dragger>
    </div>
  );
}
```

请尝试使用上述修正后的代码，并确保所有必要的依赖已正确导入。如果仍然存在编译错误，请提供具体的错误信息以便进一步调试。