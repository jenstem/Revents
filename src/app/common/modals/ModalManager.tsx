// import Modals
import TestModal from "../../../features/scratch/TestModal";
import LoginForm from "../../../features/auth/LoginForm";
import { useAppSelector } from "../../store/store";
// import register form
import RegisterForm from "../../../features/auth/RegisterForm";

export default function ModalManager() {
    const modalLookup = {
        // Add all modals here
        TestModal,
        LoginForm,
        // add RegisterForm
        RegisterForm
    }

    const {type, data, open} = useAppSelector(state => state.modals);

    let renderedModal;

    if (open && type) {
        const ModalComponent = (modalLookup as any)[type];
        renderedModal = <ModalComponent data={data} />

    }


    return (
        <span>{renderedModal}</span>
    )
}