import { Table } from "antd";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    sorter: {
      compare: (a, b) => a.name > b.name,
    },
  },
  {
    title: "Resultado",
    dataIndex: "result",
    key: "result",
    render: (e) => `$${e}`,
  },
  {
    title: "Hora",
    dataIndex: "time",
    key: "time",
    sorter: {
      compare: (a, b) => a.name > b.name,
    },
  },
];

export default function DataTable() {
  const { playerList } = useContext(AppContext);

  return <Table columns={columns} dataSource={playerList} rowKey="id" />;
}
