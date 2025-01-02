import { useState } from "react";
import { Button, Form, Input, Modal, Select, SelectProps, Space } from "antd";
import { useAuthContext } from "../../context";

export default function ServicesModal({ open, setOpen, type }: any) {
  const { state } = useAuthContext();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [form] = Form.useForm();

  const handleCreateSubmit = async () => {
    setConfirmLoading(true);

    const baseUrl = (import.meta as any).env.VITE_BASE_URL;
    console.log(form.getFieldsValue(), state.user);

    const data = {
      name: form.getFieldsValue().name,
      price: Number(form.getFieldsValue().price),
      description: form.getFieldsValue().description,
      consumables: form.getFieldsValue().consumables.join(","),
      clinic: {
        ...state.user,
      },
    };

    const req = await fetch(baseUrl + "/api/service/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const res = await req?.json();

    if (res.id) {
      // message success
    }
    setOpen(false);
    setConfirmLoading(false);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const options: SelectProps["options"] = [
    { value: "plomba", label: "plomba" },
  ];

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleCreateSubmit}
        okText="Submit"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <Form
          form={form}
          onFinish={handleCreateSubmit}
          name="validateOnly"
          layout="vertical"
          autoComplete="off">
          <Form.Item name="name" label="Name">
            <Input required />
          </Form.Item>
          <Form.Item name="consumables" label="Consumables">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Tags Mode"
              onChange={handleChange}
              options={options}
            />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <Input type="number" required />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} required />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
