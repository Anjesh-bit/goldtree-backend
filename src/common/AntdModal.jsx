import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
export const AntModal = (props) => {
  const handleCancel = () => {
    props.setOpen instanceof Function && props.setOpen({ open: false });
  };
  return (
    <div className="overflow-hidden">
      <Modal
        title={props.title}
        open={props.open?.open}
        footer={false}
        onCancel={handleCancel}
        getContainer={false}
        centered={false}
        zIndex={props.zIndex || 2050}
        maskClosable={props?.open?.mask || false}
        wrapClassName="custom-modal submodal"
        closeIcon={props.closeIcon ? false : <CloseOutlined />} //add default icon
        okText={"Save"}
        okButtonProps={{
          className: "bg-main",
        }}
        style={{ top: "2px", padding: "27px !important" }}
        className={`lg:top-2px !p-[30px]" : "lg:top-40px !p-[30px]`}
        width={props.width ? props.width : "70vw"}
      >
        {props.children}
      </Modal>
    </div>
  );
};
