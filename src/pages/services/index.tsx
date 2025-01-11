import { Button, Popover, Space, Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import ServicesModal from "../../components/Modals/ServicesModal";
import { useAuthContext } from "../../context";
import Loader from "../../components/Loader";
import { baseUrl } from "../../config";

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

  const [modal, setModal] = useState<{
    open: boolean;
    setOpen: (state: boolean) => void;
    type: "create" | "edit";
    data: {} | null;
  }>({
    open: false,
    setOpen: (state: boolean) => setModal((prev) => ({ ...prev, open: state })),
    type: "create",
    data: null,
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  function ServiceActions({ record }: { record: DataType }) {
    const [open, setOpen] = useState(false);

    const hide = () => {
      setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen);
    };

    return (
      <Space size="middle" className="w-fit" key={record.id}>
        <Button
          type="default"
          onClick={() =>
            setModal((prev) => ({
              ...prev,
              open: true,
              type: "edit",
              data: record,
            }))
          }>
          Edit
        </Button>
        <Popover
          content={
            <div>
              <h2 className="mb-2 text-lg font-semibold">Delete service</h2>
              <p className="mb-5">
                Are you sure you want <br /> to delete this service?
              </p>
              <div className="flex gap-2">
                <Button type="primary" onClick={() => DeleteService(record.id)}>
                  Yes
                </Button>
                <Button onClick={hide}>No</Button>
              </div>
            </div>
          }
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}>
          <Button type="primary">Delete</Button>
        </Popover>
      </Space>
    );
  }

  useEffect(() => {
    async function fetchServices() {
      const req = await fetch(baseUrl + `/api/service/clinic/${user?.id}`);

      const res = await req.json();

      if (res.length) {
        setData(res);
      }
    }

    fetchServices();
  }, [modal.data]);

  async function DeleteService(id: number) {
    setLoading(true);

    try {
      const req = await fetch(baseUrl + `/api/service/${id}`, {
        method: "DELETE",
      });

      if (req.status === 200) {
        alert("Service deleted");
      }
    } catch (error) {
      alert("Error " + error);
    }

    setLoading(false);
  }

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
      render: (_, record) => <ServiceActions record={record} />,
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-5">Services</h2>
        <Button type="primary" onClick={() => modal.setOpen(true)}>
          Add Service
        </Button>
      </div>
      <Table<DataType>
        pagination={{
          pageSize: 10,
        }}
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
      />
      <ServicesModal modal={modal} setModal={setModal} />
    </>
  );
}
