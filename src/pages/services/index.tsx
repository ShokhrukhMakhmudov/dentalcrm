import { Button, Space, Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import ServicesModal from "../../components/ServicesModal";
import { useAuthContext } from "../../context";

interface DataType {
  id: number;
  name: string;
  price: number;
  description: string;
  consumables: string;
}
export default function Services() {
  const {
    state: { user },
  } = useAuthContext();
  const [modal, setModal] = useState({
    open: false,
    setOpen: (state: boolean) => setModal((prev) => ({ ...prev, open: state })),
    type: "create",
  });
  const [data, setData] = useState([
    {
      id: 4,
      name: "Чистка зубов",
      price: 150000,
      clinic: {
        id: 3,
        name: "TEST",
        phone: "+998919998877",
        codeword: "test",
        login: "test",
        password: "12345",
      },
      description: "Чистка зубов от камней",
      consumables: "очиститель,салфетки",
      deletedAt: "1970-01-01T00:00:00.000+00:00",
    },
  ]);

  useEffect(() => {
    async function fetchServices() {
      const baseUrl = (import.meta as any).env.VITE_BASE_URL;

      const req = await fetch(baseUrl + `/api/service/clinic/${user?.id}`);

      const res = await req.json();

      if (res.length) {
        setData(res);
      }
    }

    fetchServices();
  }, []);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) =>
        text.toLocaleString("uz", {
          style: "currency",
          currency: "UZS",
          minimumFractionDigits: 0,
        }),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Consumables",
      key: "consumables",
      dataIndex: "consumables",
      render: (_, { consumables }) => (
        <>
          {consumables.split(",").map((tag) => {
            let color = tag.length > 9 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
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
        <h2 className="text-2xl font-bold mb-5">Services</h2>
        <Button type="primary" onClick={() => modal.setOpen(true)}>
          Add Service
        </Button>
      </div>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
      />
      <ServicesModal
        open={modal.open}
        setOpen={modal.setOpen}
        type={modal.type}
      />
    </>
  );
}
