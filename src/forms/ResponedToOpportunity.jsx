import { Button, Modal } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import useToggle from "../customHooks/useToggle";

export default function ResponedToOpportunity(props) {
    const [modalVisable, toggleModal] = useToggle(false)

    const handleOk = () => {
        let data = { opportunity:{...props.opportunity}, state: props.mode === 'Accept'?'APPROVED':'REJECTED' };
        props.responed(data)
        toggleModal()
        props.toggleProgress()
    }

    const handleCancel = () => {
        toggleModal()
    }

    return (
        <>
            {props.mode === 'Accept' ? <Button
                onClick={toggleModal}
                style={{ color:'green' }}
                icon={<CheckCircleOutlined />}
                className="no-background-button"
            >
                Accept
            </Button> : <Button className="no-background-button" icon={<CloseCircleOutlined />} style={{ color:'red' }} onClick={toggleModal}>Reject</Button>}
            <Modal title={props.mode === 'Accept'? "Accept opportunity":"Reject Opportunity"} visible={modalVisable} onOk={handleOk} okText="Yes" onCancel={handleCancel}>
                <h3>{props.mode === 'Accept'? "Are you sure you want to accept this opportunity":"Are you sure you want to reject this Opportunity"}</h3>
            </Modal>
        </>
    );
}
