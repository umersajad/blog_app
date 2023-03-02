import { Modal } from "antd";
import { Button, Form, Input, Space } from "antd";
import { useState, useRef, useEffect } from "react";

import API from "../../lib/API";

const PostComp = ({ id, title, body, onEdit, onRemove }) => {
  const [openModal, setOpenModal] = useState(false);

  const [form] = Form.useForm();
  const { TextArea } = Input;

  const postEditHandler = () => {
    const values = form.getFieldsValue();
    // Skipping await for now
    API.put(`/posts/${id}`, {
      title: values.title,
      body: values.body,
    });
    onEdit(values.title, values.body);
    setOpenModal(false);
  };

  const postRemoveHandler = () => {
    // Skipping await for now
    API.delete(`/posts/${id}`);
    onRemove();
  };

  useEffect(() => {
    if (openModal) {
      form.setFieldsValue({
        title,
        body,
      });
    }
  }, [openModal, body, form, title]);

  return (
    <>
      <div className="rounded-lg border border-solid border-secondary p-4">
        <div className="flex justify-end items-center space-x-2 mb-1">
          <svg
            onClick={() => {
              setOpenModal(true);
            }}
            className="w-4 h-4 cursor-pointer fill-[#1e293b]"
          >
            <use xlinkHref="/svg/sprites.svg#icon-edit-pencil" />
          </svg>
          <svg
            onClick={postRemoveHandler}
            className="w-5 h-5 cursor-pointer fill-[#1e293b]"
          >
            <use xlinkHref="/svg/sprites.svg#icon-delete" />
          </svg>
        </div>
        <h3 className="text-2xl font-Quicksand font-bold">{title}</h3>
        <p className="text-sm mt-2">{body}</p>
      </div>
      <Modal
        title="Edit Post"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={postEditHandler}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true }, { type: "string" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="body"
            label="Body"
            rules={[{ required: true }, { type: "string" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button htmlType="submit">Submit</Button>
            <Button
              className="ml-2"
              htmlType="button"
              onClick={() => setOpenModal(false)}
            >
              Close
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PostComp;
