import { useState } from "react";

const [isModalOpen, setIsModalOpen] = useState(false);

export const showModal = () => {
    setIsModalOpen(true);
};

export const handleOk = () => {
    setIsModalOpen(false);
};

export const handleCancel = () => {
    setIsModalOpen(false);
};

