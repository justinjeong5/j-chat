import { Button, Form, Input, Modal, Select } from "antd";
import useNotice from "hooks/notice/notice";
import useRooms from "hooks/room/rooms";
import Room from "models/Room";
import PropTypes from "prop-types";
import { useState } from "react";

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export default function CreateRoomModal({ onCreateRoom, children }) {
    const [form] = Form.useForm();
    const { errorHandler, contextHolder } = useNotice();

    const { createRoom } = useRooms();
    const [open, setOpen] = useState(false);
    const toggleModal = () => {
        setOpen(!open);
    };

    const handleOk = async () => {
        const data = form.getFieldsValue();
        try {
            const t = await createRoom(data);
            onCreateRoom(new Room(t));
            toggleModal();
        } catch (e) {
            errorHandler(e);
        }
    };

    return (
        <>
            {contextHolder}
            <Button block type="text" onClick={toggleModal}>
                {children}
            </Button>
            <Modal
                title="Create Room"
                open={open}
                onOk={handleOk}
                onCancel={toggleModal}
            >
                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={handleOk}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="Type"
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="대화방 종류를 선택해주세요."
                            allowClear
                        >
                            <Option value="public">Public</Option>
                            <Option value="direct">Direct</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

CreateRoomModal.propTypes = {
    onCreateRoom: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};
