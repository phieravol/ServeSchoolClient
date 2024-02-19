// Modal.tsx
import { Modal, Form, Input, Button, FormInstance } from "antd";
import React, { useRef, useState } from "react";

interface Props {
  visible: boolean;
  school?: School;
  onCancel: () => void;
  onSave: (school: School) => void;
}

const ModalServe: React.FC<Props> = ({ visible, school, onCancel, onSave }) => {
  const [form] = Form.useForm();

  // Set initial form values when school changes
  React.useEffect(() => {
    if (school !== undefined) {
      form.setFieldsValue({
        name: school.name,
        foundingDate: school.foundingDate,
      });
    } else {
      form.setFieldsValue({
        name: "",
        foundingDate: "",
      });
    }
  }, [school]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onSave({ ...school, ...values });
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
    form.setFieldsValue({
      name: "",
      foundingDate: "",
    });
  };

  return (
    <div>
      <Modal
        title={school ? "Edit School" : "Create School"}
        open={visible}
        onOk={handleOk}
        onCancel={() => {
          onCancel();
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={school}
          id="modalForm"
        >
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Founding Date"
            name="foundingDate"
            rules={[{ required: true }]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalServe;
