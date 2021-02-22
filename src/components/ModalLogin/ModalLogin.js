import React, { useState, useContext } from "react";
import { Modal, Button, Row, Col, Input } from "antd";
import { AppContext } from "../../context/AppContext";
export default function ModalLogin() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {login} = useContext(AppContext);
  const [user, setUser]=  useState('');
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    login(user)
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Iniciar sesión
      </Button>
      <Modal
        title="Inicie sesión"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button type="danger" key={'btn1'} onClick={handleCancel}>Cancelar</Button>,
          <Button type="primary" key={'btn2'} onClick={handleOk}>Iniciar</Button>,
        ]}
      >
        <Input.Group>
          <Row gutter={24}>
            <Col span={24}>
              <Input placeholder="Ingresa nombre de usuario" value={user} onChange={e => setUser(e.target.value)} />
            </Col>
          </Row>
        </Input.Group>
      </Modal>
    </>
  );
}
