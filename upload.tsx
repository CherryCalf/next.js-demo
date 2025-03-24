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



在 Next.js 中，您可以通过多种方式实现页面重定向并触发强刷新。以下是两种常见方法：

### 1. 使用 `useEffect` 和 `window.location.href`

如果您希望在客户端进行重定向并触发页面的强刷新，可以使用 `useEffect` 钩子和 `window.location.href`：

```jsx
import { useEffect } from 'react';

const RedirectPage = () => {
  useEffect(() => {
    // 重定向到目标页面并触发强刷新
    window.location.href = '/target-page';
  }, []);

  return null;
};

export default RedirectPage;
```

### 2. 在 `getServerSideProps` 中使用 `res.writeHead` 和 `res.end`

如果您希望在服务器端进行重定向，可以在 `getServerSideProps` 中使用 `res.writeHead` 和 `res.end`：

```jsx
export async function getServerSideProps(context) {
  const { res } = context;

  res.writeHead(302, {
    Location: '/target-page',
  });
  res.end();

  return {
    props: {},
  };
}

const RedirectPage = () => {
  return null;
};

export default RedirectPage;
```

### 总结

- **客户端重定向**：使用 `useEffect` 和 `window.location.href` 进行客户端重定向并触发强刷新。
- **服务器端重定向**：在 `getServerSideProps` 中使用 `res.writeHead` 和 `res.end` 进行服务器端重定向。

选择其中一种方法，根据您的具体需求来实现页面重定向和强刷新。如果您有其他问题或需要进一步的帮助，请告诉我！