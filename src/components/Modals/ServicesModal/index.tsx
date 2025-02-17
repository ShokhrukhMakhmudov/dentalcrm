import { useEffect, useState } from "react";
import { Form, Input, Modal, Select, SelectProps } from "antd";
import { useAuthContext } from "../../../context";
import { baseUrl } from "../../../config";

export default function ServicesModal({
  modal: { open, setOpen, type, data },
  setModal,
}: any) {
  const { state } = useAuthContext();
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState("Content of the modal");
  const [form] = Form.useForm();

  useEffect(() => {
    if (type === "edit" && data) {
      form.setFieldsValue({
        name: data.name,
        price: data.price,
        description: data.description,
        consumables: data.consumables.split(","),
      });
    }
  }, [type, data]);
  const handleCreateSubmit = async () => {
    setConfirmLoading(true);

    const sendData: {
      name: string;
      price: number;
      description: string;
      consumables: string;
      clinic: { id?: string; name?: string; email?: string };
      id?: number;
    } = {
      name: form.getFieldsValue().name,
      price: Number(form.getFieldsValue().price),
      description: form.getFieldsValue().description,
      consumables: form.getFieldsValue().consumables.join(","),
      clinic: {
        ...state.user,
      },
    };

    if (type === "edit") sendData["id"] = data.id;

    const req = await fetch(baseUrl + "/api/service/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    });

    if (req.status === 200) {
      // window.location.reload();
      setModal((prev: any) => ({
        ...prev,
        open: false,
        type: "create",
        data: null,
      }));
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
