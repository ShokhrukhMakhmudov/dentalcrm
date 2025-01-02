import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useAuthContext } from "../../context";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    setLoading(true);
    console.log("Success:", values);

    const baseUrl = (import.meta as any).env.VITE_BASE_URL;

    const req = await fetch(
      baseUrl +
        "/api/clinic/login" +
        `?login=${values.login}&password=${values.password}`
    );

    const res = await req?.json();

    if (res) {
      login(res);
      navigate({ to: "/" });
    }
    setLoading(false);
  };

  return (
    <section className="h-full w-full flex items-center justify-center bg-[#f5f5f5]">
      <div className="w-full max-w-md p-6 shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] rounded-lg bg-white">
        <h2 className="text-center mb-5 text-2xl">LOGIN</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large">
          <Form.Item
            name="login"
            rules={[
              { required: true, message: "Please input your Username!" },
            ]}>
            <Input
              className=""
              prefix={<UserOutlined className="me-2" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your Password!" },
            ]}>
            <Input
              className=""
              prefix={<LockOutlined className="me-2" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item className="m-0">
            <Button block type="primary" htmlType="submit" disabled={loading}>
              Log in
              {loading && <LoadingOutlined />}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
