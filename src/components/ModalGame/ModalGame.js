import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Input, Row, Col, notification } from "antd";
import { AppContext } from "../../context/AppContext";

export default function ModalGame({ isModalVisible, setIsModalVisible }) {
  const { balance, addSuperPoint, addPoint, removePoint } = useContext(
    AppContext
  );

  const getNumbers = () => {
    return {
      num1: Math.floor(Math.random() * 10 - 0) + 0,
      num2: Math.floor(Math.random() * 10 - 0) + 0,
      num3: Math.floor(Math.random() * 10 - 0) + 0,
    };
  };

  const [nums, setnums] = useState({ num: "", num1: "", num2: "" });
  const [check, setCheck] = useState(false);

  // useEffect(() => {
  //   setnums(getNumbers);
  // }, [isModalVisible]);

  const checkGame = (debug = false) => {
    let { num1, num2, num3 } = nums;
    if ((num1 === num2 && num1 === num3) || debug) {
      addSuperPoint();
      if (!debug) {
        notification.open({
          message: "Punto un Super Punto!!!!",
          description: `Ganaste 10 monedas con la combinacion { ${num1} - ${num2} - ${num3} }`,
        });
      } else {
        notification.open({
          message: "Punto un Super Punto!!!!",
          description: `Ganaste 10 monedas simuladas`,
        });
      }
    } else if (num1 === num2 || num2 === num3) {
      addPoint();
      notification.open({
        message: "Punto Ganado",
        description: `Ganaste 0.5 monedas con la combinacion { ${num1} - ${num2} - ${num3} }`,
      });
    } else {
      removePoint();
    }
  };

  useEffect(() => {
    if (check) {
      checkGame();
      setCheck(false);
    }
  }, [check]);

  const debuggerBottom = () => {
    setnums({ num1: 7, num2: 7, num3: 7 });
    checkGame(true);
  };

  const resetNumbers = () => {
    setnums(getNumbers());
    setCheck(true);
  };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title={"Nuevo Juego - Saldo: " + balance}
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={resetNumbers}
          >
            Generar Números
          </Button>,
          <Button
            key="back1"
            type=""
            onClick={debuggerBottom} /* onClick={this.handleCancel} */
          >
            Depurar
          </Button>,
          <Button key="back" type="danger" onClick={handleCancel}>
            Cerrar
          </Button>,
        ]}
      >
        <p>Presiona <b>Generar Números</b> para empezar a jugar</p>
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
      </Modal>
    </>
  );
}
