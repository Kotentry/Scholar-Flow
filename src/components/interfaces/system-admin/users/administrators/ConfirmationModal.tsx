'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { HiOutlineExclamation } from 'react-icons/hi';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  actionLabel: string;
  isLoading?: boolean;
  type?: 'danger' | 'warning' | 'success';
}

const typeStyles = {
  danger: {
    icon: 'text-danger',
    button: 'bg-danger text-white',
  },
  warning: {
    icon: 'text-warning',
    button: 'bg-warning text-white',
  },
  success: {
    icon: 'text-success',
    button: 'bg-success text-white',
  },
};

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  actionLabel,
  isLoading = false,
  type = 'danger',
}: ConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex gap-2 items-center">
              <div className={`p-2 rounded-lg bg-default-100 ${typeStyles[type].icon}`}>
                <HiOutlineExclamation className="w-5 h-5" />
              </div>
              {title}
            </ModalHeader>
            <ModalBody>
              <p>{message}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                onPress={onClose}
                isDisabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                color={type}
                onPress={onConfirm}
                isLoading={isLoading}
                className={typeStyles[type].button}
              >
                {actionLabel}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
