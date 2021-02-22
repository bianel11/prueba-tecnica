import "./App.css";
import React, { useState } from "react";
import { Typography, Button } from "antd";
import LayoutApp from "./Layout/LayoutApp";
import DataTable from "./components/DataTable/DataTable.js";
import ModalGame from "./components/ModalGame/ModalGame.js";
import { AppContextProvider } from "./context/AppContext";
const { Title } = Typography;

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  return (
    <AppContextProvider>
      <LayoutApp>
        <div>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" size="large" onClick={showModal}>
              Iniciar nuevo juego
            </Button>
          </div>
          <ModalGame
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
          <Title level={2}>Historial de partidas</Title>
          <DataTable />
        </div>
      </LayoutApp>
    </AppContextProvider>
  );
}

export default App;
