"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button, Input, Space, Flex, Modal, Form, message } from "antd";
import { axiosGet, axiosPost, axiosPut } from "@/public/AxiosUtil";
import Image from 'next/image'
import { useMount, useUnmount } from 'ahooks';
import { useLayoutStore } from '@/store/layoutStore';

export default function login({ children }: { children: React.ReactNode }) {
  useMount(() => {
    useLayoutStore.setState({ skipGlobalLayout: true });
  });
  useUnmount(() => {
    // 如果需要在离开页面时重置状态
    useLayoutStore.setState({ skipGlobalLayout: false });
  });
  const router = useRouter()
  const [usernameLogin, setUsernameLogin] = useState<string>();
  const [passwordLogin, setPasswordLogin] = useState<string>();

  const [setUsername, setSetUsername] = useState<string>()
  const [setOldPassword, setSetOldPassword] = useState<string>()
  const [setNewPassword, setSetNewPassword] = useState<string>()
  const [setNewPasswordAgain, setSetNewPasswordAgain] = useState<string>()

  const [messageApi, contextHolder] = message.useMessage();

  // 模态框方法
  const passwordError = () => {
    messageApi.open({
      type: 'error',
      content: '密码错误',
      className: 'custom-class',
      style: {
        marginLeft: '20vh',
      },
    });
  };
  const editSuccess = () => {
    messageApi.open({
      type: 'success',
      content: '修改成功',
      className: 'custom-class',
      style: {
        marginLeft: '20vh',
      },
    });
  };
  const editError = () => {
    messageApi.open({
      type: 'error',
      content: '修改失败',
      className: 'custom-class',
      style: {
        marginLeft: '20vh',
      },
    });
  };
  // 修改按钮
  const handleOk = () => {
    axiosPost('/user/login', { username: setUsername, password: setOldPassword }).then(res => {
      if (res.data.code == 500) {
        passwordError()
      }
      if (res.data.code == 200) {
        if (setNewPassword === setNewPasswordAgain) {
          axiosPut('/user',
            {
              username: setUsername,
              password: setOldPassword,
              rePassword: setNewPassword
            }).then(res => {
              if (res.data.code === 200) {
                editSuccess()
                handleCancel()
              } else {
                editError()
              }
            })
        }
      }
    })
  };

  const login = document.getElementById("login")
  const edit = document.getElementById("edit")
  // 切换登录page
  const handleCancel = () => {
    login.style.display = "flex"
    edit.style.display = "none"
  };
  // 切换修改page
  const openModal = function () {
    login.style.display = "none"
    edit.style.display = "flex"
  }
  // 修改密码模态框
  type FieldType = {
    username?: string;
    password?: string;
  };

  //登录函数
  const handleSubmit = (e) => {
    axiosPost('/user/login', { username: usernameLogin, password: passwordLogin }).then(res => {
      if (res.data.code === 200) {
        localStorage.setItem("token", res.data.data.token)
        router.push("/filesUpload")
      } else {
        passwordError()
      }
    })
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        background: "#0568C1",
        backgroundSize: "300% 300%",
        animation: "gradientAnimation 10s ease infinite",
      }}
    >
      {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#FFFFFF", marginTop: "-200px" }}>
        <h1 style={{ fontSize: "50px" }}>工时加工工具</h1>
      </div> */}
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "30px",
          display: "flex",
          flexDirection: "row",
          marginTop: "100px",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          width: "700px",
          height: "350px"
        }}
        id="login">
        <div style={{ width: "250px" }}>
          {/* 用户名 */}
          <div style={{ display: "flex", flexDirection: "row", width: "300px", justifyContent: "space-around" }}>
            <label style={{ display: "flex", flexDirection: "row", width: "300px", justifyContent: "space-around", alignItems: "center" }}>用户名:
              <Space.Compact>
                <Input
                  placeholder="请输入用户名"
                  style={{ width: "200px" }}
                  value={usernameLogin}
                  onChange={e => {
                    setUsernameLogin(e.target.value);
                  }}
                />
              </Space.Compact></label>
          </div>
          {/* 密码 */}
          <div style={{ display: "flex", flexDirection: "row", width: "300px", justifyContent: "space-around", marginTop: "20px" }}>
            <label style={{ display: "flex", flexDirection: "row", width: "300px", justifyContent: "space-around", alignItems: "center" }}>密&nbsp;&nbsp;&nbsp;&nbsp;码:
              <Input.Password
                value={passwordLogin}
                placeholder="请输入密码"
                style={{ width: "200px" }}
                onChange={e => {
                  setPasswordLogin(e.target.value);
                }}
              /></label>

          </div>
          <div style={{ display: "flex", width: "300px", flexDirection: "column-reverse", justifyContent: "center", alignItems: "flex-end", }}>
            <Button style={{ fontSize: "12px" }} type="link" onClick={openModal} autoInsertSpace >修改密码</Button>
          </div>
          <div style={{ display: "flex", width: "300px", justifyContent: "center", marginTop: "10px", marginLeft: "20px", alignItems: "center" }}>
            <Flex gap="small" wrap >
              <Button type="primary" autoInsertSpace onClick={handleSubmit} >登录</Button>
            </Flex>
          </div>
        </div>
        <div>
          <Image src='/1.png' alt="" width="250" height="180" />
        </div>
      </form>

      <div
        style={{
          padding: "30px",
          display: "none",
          flexDirection: "row",
          marginTop: "100px",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          width: "700px",
          height: "350px",
        }}
        id="edit">

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: "300px" }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              value={setUsername}
              onChange={e => {
                setSetUsername(e.target.value);
              }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="原密码"
            name="password1"
            rules={[{ required: true, message: '请输入原密码!' }]}
          >
            <Input.Password
              value={setOldPassword}
              onChange={e => {
                setSetOldPassword(e.target.value);
              }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="新密码"
            name="password2"
            rules={[{ required: true, message: '请输入新密码!' }]}
          >
            <Input.Password
              value={setNewPassword}
              onChange={e => {
                setSetNewPassword(e.target.value);
              }} />
          </Form.Item>
          <Form.Item<FieldType>
            label="确认新密码"
            name="password3"
            rules={[{ required: true, message: '请确认新密码!' }]}
          >
            <Input.Password
              value={setNewPasswordAgain}
              onChange={e => {
                setSetNewPasswordAgain(e.target.value);
              }} />
          </Form.Item>
          <div style={{ display: "flex", width: "300px", flexDirection: "column", justifyContent: "center", alignItems: "flex-end", marginTop: "-25px" }}>
            <Button style={{ fontSize: "12px", }} type="link" onClick={handleCancel} autoInsertSpace >返回</Button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", marginLeft: "20px", alignItems: "center", width: "300px" }}>
            <Flex gap="small" wrap >
              <Button type="primary" autoInsertSpace onClick={handleOk} >修改</Button>
            </Flex>
          </div>
        </Form>
        <div>
          <Image src='/1.png' alt="" width="250" height="180" />
        </div>
      </div>
      {contextHolder}
    </div>
  );
}
