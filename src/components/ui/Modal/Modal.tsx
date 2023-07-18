import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import "./index.css";

interface IModalProps {
  show: boolean;
  footer?: boolean;
  children?: React.ReactNode;
  onOk?: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
  className?: string;
  onCancel?:
    | ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
  title: React.ReactNode;
  header?: boolean;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  closeAble?: boolean;
}

interface ComponentModal extends React.FC<IModalProps> {}

const Modal: ComponentModal = (props) => {
  const {
    show,
    title,
    children,
    footer,
    onOk,
    className,
    onCancel,
    header,
    okText,
    cancelText,
    closeAble,
  } = props;

  return (
    <AnimatePresence>
      {show && (
        <motion.div className={`container-modal ${className ?? ""}`}>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={(e) => onCancel?.(e)}
            className={`modal-overlay`}
          />
          <motion.div
            className="modal"
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ duration: 0.5 }}
          >
            {header && (
              <div className="modal-header">
                <div className="modal-title">{title}</div>
                {closeAble && (
                  <div
                    className="modal-close-icon"
                    onClick={(e) => onCancel?.(e)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      style={{ fontSize: 35, fontWeight: 500 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )}
            <div className="modal-content">{children}</div>
            {footer && (
              <div className="modal-footer">
                <button
                  className="modal-footer-button-left"
                  onClick={(e) => onCancel?.(e)}
                >
                  {cancelText ?? "Cancel"}
                </button>
                <button
                  className="modal-footer-button-right"
                  onClick={(e) => onOk?.(e)}
                >
                  {okText ?? "Accept"}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const overlayVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.3,
      delayChildren: 0.4,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
      duration: 0.3,
      delay: 0.4,
    },
  },
};

export default Modal;
