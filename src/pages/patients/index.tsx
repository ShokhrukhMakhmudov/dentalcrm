import { Button, Space, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context";

interface DataType {
  id: number;
  name: string;
  birthDate: string;
  medicalHistory: string;
  phone: string;
}
export default function Patients() {
  const {
    state: { user },
  } = useAuthContext();
  const [modal, setModal] = useState({
    open: false,
    setOpen: (state: boolean) => setModal((prev) => ({ ...prev, open: state })),
    type: "create",
  });
  console.log(modal);

  const [data, setData] = useState([
    {
      id: 1,
      name: "Jamshid",
      birthDate: "2024-12-25T05:51:17.676+00:00",
      phone: "+99891991112233",
      medicalHistory: "Чистка зубов",
      clinic: {
        id: 3,
        name: "TEST",
        phone: "+998919998877",
        codeword: "test",
        login: "test",
        password: "12345",
      },
      deletedAt: "2024-12-25T05:51:17.676+00:00",
    },
  ]);

  useEffect(() => {
    async function fetchServices() {
      const baseUrl = (import.meta as any).env.VITE_BASE_URL;

      const req = await fetch(baseUrl + `/api/client/all/clinic/${user?.id}`);

      const res = await req.json();

      if (res?.content) {
        setData(res?.content);
      }
    }

    fetchServices();
  }, []);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Medical history",
      dataIndex: "medicalHistory",
      key: "medicalHistory",
    },
    {
      title: "Birth of date",
      key: "birthDate",
      dataIndex: "birthDate",
      render: (_, { birthDate }) =>
        new Date(birthDate).toLocaleDateString("uz", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space className="w-16">
          <Button type="default" onClick={() => console.log(record)}>
            Edit
          </Button>
          <Button type="primary">Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-5">Patients</h2>
        <Button type="primary" onClick={() => ""}>
          Add Patient
        </Button>
      </div>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
      />
    </>
  );
}
