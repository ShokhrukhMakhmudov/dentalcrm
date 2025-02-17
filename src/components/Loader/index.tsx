import { Spin } from "antd";

export default function Loader() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[#ffffffa6]">
      <Spin size="large" />
    </div>
  );
}
