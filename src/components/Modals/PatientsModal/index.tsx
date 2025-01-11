import { useEffect, useState } from "react";
import { DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";
import { useAuthContext } from "../../../context";
import { baseUrl } from "../../../config";

export default function PatientsModal({
  modal: { open, setOpen, type, data },
  setModal,
}: any) {
  const { state } = useAuthContext();
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState("Content of the modal");
  const [form] = Form.useForm();

  useEffect(() => {
    if (type === "edit" && data) {
      const birthDate = dayjs(data.birthDate);
      console.log(birthDate);

      form.setFieldsValue({
        name: data.name,
        phone: data.phone,
        birthDate,
        medicalHistory: data.medicalHistory,
      });
    }
  }, [type, data]);
  const handleCreateSubmit = async () => {
    setConfirmLoading(true);
    console.log(form.getFieldsValue());

    const sendData: {
      name: string;
      phone: string;
      birthDate: string;
      medicalHistory: string;
      clinic: { id?: string; name?: string; email?: string };
      id?: number;
    } = {
      ...form.getFieldsValue(),
      birthDate: form.getFieldsValue().birthDate.format("YYYY-MM-DD"),
      clinic: {
        ...state.user,
      },
    };
    // 'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
    if (type === "edit") sendData["id"] = data.id;

    const req = await fetch(baseUrl + "/api/client/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendData),
    });
    console.log(await req.json());

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
    setOpen(false);
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
          <Form.Item name="birthDate" label="DatePicker">
            <DatePicker
              required
              format={"DD-MM-YYYY"}
              onChange={() => {
                console.log(form.getFieldsValue());
              }}
            />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number">
            <Input
              addonBefore={"+998"}
              style={{ width: "100%" }}
              maxLength={9}
              required
            />
          </Form.Item>
          <Form.Item name="medicalHistory" label="medicalHistory">
            <Input.TextArea rows={4} required />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
