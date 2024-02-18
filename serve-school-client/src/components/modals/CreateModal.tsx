"use client";
import React, { useState } from 'react';
import { Button, Checkbox, DatePicker, Form, Input, Modal } from 'antd';

const CreateModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    schoolName?: string;
    foundingDate?: string;
  };

  return (
    <div>
      <Button className='btn btn-primary relative inline top-8' size='large' onClick={showModal}>
        <h2 className="align-middle">Create Scholl</h2>
      </Button>
      <Modal title="Create School" open={isModalOpen} onOk={handleOk} okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
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

          <Form.Item<FieldType> label="School Name" name="schoolName" rules={[{ required: true, message: 'Please input school name!' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Founding Date" name="foundingDate" rules={[{ required: true, message: 'Please input founding date!' }]}>
            <Input name='foundingDate' type='date'/>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" className='btn btn-primary' htmlType="submit">
              Submit
            </Button>
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default CreateModal;