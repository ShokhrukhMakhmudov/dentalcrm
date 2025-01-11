import { Button, Space, Popover, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context";
import { baseUrl } from "../../config";
import PatientsModal from "../../components/Modals/PatientsModal";
import Loader from "../../components/Loader";

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

  useEffect(() => {
    async function fetchServices() {
      const req = await fetch(baseUrl + `/api/client/all/clinic/${user?.id}`);

      const res = await req.json();

      if (res?.content) {
        setData(res?.content);
      }
    }

    fetchServices();
  }, []);

  function PatientActions({ record }: { record: DataType }) {
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
                <Button type="primary" onClick={() => DeletePatient(record.id)}>
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

  async function DeletePatient(id: number) {
    setLoading(true);

    try {
      const req = await fetch(baseUrl + `/api/client/${id}`, {
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
      render: (_, record) => <PatientActions record={record} />,
    },
  ];

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-5">Patients</h2>
        <Button type="primary" onClick={() => modal.setOpen(true)}>
          Add Patient
        </Button>
      </div>
      <Table<DataType>
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id}
      />
      <PatientsModal modal={modal} setModal={setModal} />
    </>
  );
}
