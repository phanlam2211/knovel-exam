import { Modal, type ModalProps } from 'antd';
import type { ReactNode } from 'react';

export type CustomModalProps = ModalProps & {
  open: boolean;
  onClosed?: () => void;
  onSubmitted?: () => void;
};

export function CommonModal({ children, ...props }: { children: ReactNode } & CustomModalProps) {
  const { open, onClosed, onSubmitted } = props;

  return (
    <Modal {...props} open={open} onOk={onSubmitted} onCancel={onClosed}>
      {children}
    </Modal>
  );
}
