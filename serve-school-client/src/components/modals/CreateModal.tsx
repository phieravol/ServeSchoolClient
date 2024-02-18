"use client";
import React, { useState } from 'react';
import { Button, Checkbox, DatePicker, Form, Input, Modal, message } from 'antd';

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

  const onFinish = async () => {
    try {
      const response = await fetch('http://localhost:5261/api/Schools/CreateSchools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schoolData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        message.success(response.text(), 3);
      } else {
        message.error(response.text(), 3);
      }
    } catch (error) {
      console.error('Error creating school:', error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type CreateSchoolDTO = {
    name?: string;
    foundingDate?: string;
  };

  const [schoolData, setSchoolData] = useState<CreateSchoolDTO>({ 
    name: '', 
    foundingDate: '' 
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setSchoolData((prevData) => ({
      ...prevData,
      [name]: name === 'foundingDate' ? new Date(value).toISOString() : value,
    }));
    
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

          <Form.Item<CreateSchoolDTO> label="School Name" name="name" rules={[{ required: true, message: 'Please input school name!' }]}>
            <Input name='name' type='text' onChange={handleChange} />
          </Form.Item>

          <Form.Item<CreateSchoolDTO> label="Founding Date" name="foundingDate" rules={[{ required: true, message: 'Please input founding date!' }]}>
            <Input name='foundingDate' type='date' onChange={handleChange} />
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