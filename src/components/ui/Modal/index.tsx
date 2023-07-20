"use client";
import React from "react";
import Modal from "./Modal";

export type ClosePopupEvent = () => void;

export interface PopupProps {
  selector?: React.ReactNode;
  title?: React.ReactNode;
  width?: string | number;
  labelOk?: React.ReactNode;
  labelCancel?: React.ReactNode;
  onSubmit?: (
    e: React.MouseEvent<HTMLElement>,
    closePopup: ClosePopupEvent
  ) => void;
  onCancel?: (
    e: React.MouseEvent<HTMLElement>,
    closePopup: ClosePopupEvent
  ) => void;
  okButtonProps?: any;
  cancelButtonProps?: any;
  okLoading?: boolean;
  afterOpen?: () => void;
  afterClose?: () => void;
  closable?: boolean;
  styleContent?: React.CSSProperties;
  content?: React.ReactNode;
  footer?: boolean;
  header?: boolean;
  className?: string;
}

export interface PopupRef {
  open: () => void;
  close: () => void;
}

const PopupRender: React.ForwardRefRenderFunction<PopupRef, PopupProps> = (
  props,
  ref
) => {
  const {
    title,
    labelOk,
    labelCancel,
    onSubmit,
    onCancel,
    afterOpen,
    afterClose,
    selector,
    content,
    className,
    styleContent,
    width,
  } = props;
  let { closable, footer, header } = props;

  if (closable === undefined) closable = true;
  if (header === undefined) header = true;
  if (footer === undefined) footer = true;

  const [show, setShow] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    open: () => {
      toggleShow(true, setShow);
      afterOpen?.();
    },
    close: () => {
      toggleShow(false, setShow);
      afterClose?.();
    },
  }));

  return (
    <React.Fragment>
      {selector}
      <Modal
        show={show}
        closeAble={closable}
        title={title}
        footer={footer}
        header={header}
        width={width}
        styleContent={styleContent}
        okText={labelOk}
        cancelText={labelCancel}
        onOk={(e) =>
          onSubmit
            ? onSubmit(e, () => toggleShow(false, setShow))
            : toggleShow(false, setShow)
        }
        className={className}
        onCancel={(e) =>
          onCancel
            ? onCancel(e, () => toggleShow(false, setShow))
            : toggleShow(false, setShow)
        }
      >
        {content}
      </Modal>
    </React.Fragment>
  );
};

const toggleShow = (show: boolean, setShow: React.Dispatch<boolean>) => {
  setShow(show);
};

const Popup = React.forwardRef<PopupRef, PopupProps>(PopupRender);

export default Popup;
