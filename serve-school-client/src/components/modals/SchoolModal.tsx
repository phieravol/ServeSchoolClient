"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { format } from "date-fns";
import { toSimplifyDate } from "@/helpers/dateHelper";
import { log } from "console";

interface ModalProps {
  onSave: (data: School) => void;
  visible?: boolean;
  onCancel?: () => void;
  onShow?: () => void;
  school?: School;
}

type CreateSchoolDTO = {
  id?: number;
  name?: string;
  foundingDate?: string;
};

const SchoolModal: React.FC<ModalProps> = ({
  onSave,
  visible,
  onCancel,
  onShow,
  school,
}) => {
  const [schoolData, setSchoolData] = useState<CreateSchoolDTO>({
    name: "",
    foundingDate: "",
  });
  const formRef = React.createRef();

  const onFinish = async () => {
    try {
      const response = await fetch(
        "http://localhost:5261/api/Schools/CreateSchools",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(schoolData),
        }
      );

      if (response.ok) {
        var data = await response.json();
        onSave(data);
        message.success(`Create school successfully!`, 3);
      } else {
        message.error(response.text(), 3);
      }
    } catch (error) {
      message.error("Error creating school:", 3);
    }
  };

  useEffect(() => {
    setSchoolData({
      name: school?.name,
      foundingDate: school?.foundingDate,
    });

    console.log(`school new: ${JSON.stringify(schoolData.name)}`);
  }, [school]);

  const onFinishFailed = (errorInfo: any) => {
    message.error(`Failed when submit form`, 3);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSchoolData((prevData) => ({
      ...prevData,
      [name]: name === "foundingDate" ? new Date(value).toISOString() : value,
    }));
    console.log(schoolData);
  };

  const handleClose = () => {
    onCancel?.();
  };

  return (
    <div>
      <Button
        className="btn btn-primary relative inline"
        size="large"
        onClick={onShow}
      >
        <h2 className="align-middle">Create School</h2>
      </Button>
      <Modal
        title={`Create School`}
        open={visible}
        onOk={handleClose}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={handleClose}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="School Name"
            name="name"
            rules={[{ required: true, message: "Please input school name!" }]}
            valuePropName={schoolData.name}
          >
            <Input
              name="name"
              type="text"
              onChange={handleChange}
              value={schoolData.name}
            />
          </Form.Item>

          <Form.Item
            label="Founding Date"
            name="foundingDate"
            rules={[{ required: true, message: "Please input founding date!" }]}
            valuePropName={schoolData.foundingDate}
          >
            <Input
              name="foundingDate"
              type="date"
              onChange={handleChange}
              value={toSimplifyDate(schoolData.foundingDate)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              className="btn btn-primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SchoolModal;
