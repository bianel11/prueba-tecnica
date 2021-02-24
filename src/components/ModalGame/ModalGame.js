import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Modal, Button, Input, Row, Col, notification } from "antd";

export default function ModalGame({ isModalVisible, setIsModalVisible }) {
  const { balance, addPoint, removePoint, endGame } = useContext(AppContext);
  const [nums, setnums] = useState({ num: "", num1: "", num2: "" });

  const getNumbers = () => {
    return {
      num1: Math.floor(Math.random() * 10 - 0) + 0,
      num2: Math.floor(Math.random() * 10 - 0) + 0,
      num3: Math.floor(Math.random() * 10 - 0) + 0,
    };
  };

  const checkGame = ( num1, num2, num3 ) => {
    if (num1 === num2 && num1 === num3) {
      if (num1 === 7 && num2 === 7 && num3 === 7) {
        addPoint(10);
        notification.open({
          message: "Acertaste!",
          description: `Ganaste $10 con la combinacion { ${num1} - ${num2} - ${num3} }`,
        });
      } else {
        addPoint(5);
        notification.open({
          message: "Acertaste!",
          description: `Ganaste $5 con la combinacion { ${num1} - ${num2} - ${num3} }`,
        });
      }
    } else if (num1 === num2 || num2 === num3) {
      addPoint(0.5);
      notification.open({
        message: "Acertaste!",
        description: `Ganaste $0.5 con la combinacion { ${num1} - ${num2} - ${num3} }`,
      });
    } else {
      removePoint();
    }
  };
 
  const debuggerBottom = () => {
    checkGame(7, 7, 7);
    setnums({ num1: 7, num2: 7, num3: 7 });
  };

  const resetNumbers = () => {
    let {num1, num2, num3} = getNumbers();
    checkGame(num1, num2, num3);
    setnums({num1, num2, num3,}); 
  };

  const closeGame = () => {
    if (nums.num1 !== "") {
      endGame();
    }
    setnums({ num: "", num1: "", num2: "" });
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title={"Nuevo Juego - Saldo: " + balance}
        visible={isModalVisible}
        onCancel={closeGame}
        footer={[
          <Button key="submit" type="primary" onClick={resetNumbers}>
            Generar Números
          </Button>,
          <Button key="back1" type="" onClick={debuggerBottom}>
            Depurar
          </Button>,
          <Button key="back" type="danger" onClick={closeGame}>
            Cerrar
          </Button>,
        ]}
      >
        <p>
          Presiona <b>Generar Números</b> para empezar a jugar. <br />
        </p>

        <Input.Group size="large">
          <Row gutter={24}>
            <Col span={8}>
              <Input value={nums.num1} />
            </Col>
            <Col span={8}>
              <Input value={nums.num2} />
            </Col>
            <Col span={8}>
              <Input value={nums.num3} />
            </Col>
          </Row>
        </Input.Group>
        <p>
          <b>¿Cómo jugar?</b> Por cada jugada consumes $1 de tu saldo. <br />-
          Si sacas tres veces el mismo número ganas <b> $10.</b> Por ejemplo: [
          7 - 7 - 7 ] <br />- Si sacas dos veces el mismo número uno al lado del
          otro ganas <b>$0.5.</b> Por ejemplo: [ 2 - 2 - 3] o [ 3 - 5 - 5]{" "}
          <br />- Si sacas dos veces el mismo número pero no juntos,{" "}
          <b>no ganarás nada.</b>
          Por ejemplo: [ 2 - 3 - 2] o [ 1 - 5 - 1]
        </p>
      </Modal>
    </>
  );
}
