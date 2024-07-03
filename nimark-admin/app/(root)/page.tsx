"use client";

import { Modal } from "@/components/ui/modal";

const SetupPage = () => {
  return (
    <div className="p-4">
      <Modal title="Setup" description="Setup your account" isOpen onClose={() => {}}>
        Children
      </Modal>
    </div>
  );
};

export default SetupPage;