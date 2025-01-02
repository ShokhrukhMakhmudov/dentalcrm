import { Card, Col, Row } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const data = [
    { name: "Dushanba", soni: 2 },
    { name: "Seshanba", soni: 3 },
    { name: "Chorshanba", soni: 6 },
    { name: "Payshanba", soni: 5 },
    { name: "Juma", soni: 6 },
    { name: "Shanba", soni: 9 },
    { name: "Yakshanba", soni: 7 },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
      <Row gutter={28}>
        <Col span={8}>
          <Card
            bordered={true}
            className="shadow-[0_2px_2px_0_rgba(0,0,0,0.2),0_2px_4px_0_rgba(0,0,0,0.1)] ">
            <div className="w-full flex gap-5">
              <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-lg text-white">
                <TeamOutlined className="text-xl" />
              </div>
              <div>
                <h3 className="font-[500]">Ko'riklar soni</h3>
                <span className="font-bold text-2xl">72</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            bordered={true}
            className="shadow-[0_2px_2px_0_rgba(0,0,0,0.2),0_2px_4px_0_rgba(0,0,0,0.1)] ">
            <div className="w-full flex gap-5">
              <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-lg text-white">
                <TeamOutlined className="text-xl" />
              </div>
              <div>
                <h3 className="font-[500]">Ko'riklar soni</h3>
                <span className="font-bold text-2xl">72</span>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            bordered={true}
            className="shadow-[0_2px_2px_0_rgba(0,0,0,0.2),0_2px_4px_0_rgba(0,0,0,0.1)] ">
            <div className="w-full flex gap-5">
              <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-lg text-white">
                <TeamOutlined className="text-xl" />
              </div>
              <div>
                <h3 className="font-[500]">Ko'riklar soni</h3>
                <span className="font-bold text-2xl">72</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <div className="mt-10 bg-white shadow-[0_2px_2px_0_rgba(0,0,0,0.2),0_2px_4px_0_rgba(0,0,0,0.1)] p-6 rounded-lg">
        <h2 className="text-2xl font-[500]">Kunlik ko'riklar soni</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1677ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#1677ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" className="text-xl" />
            <YAxis dataKey="soni" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip cursor={true} />

            <Area
              type="monotone"
              dataKey="soni"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
