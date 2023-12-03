import { FocusModal } from "@medusajs/ui";
import BodyTypography from "../typography/body";

type WriteTargetNoteModalProps = {
    targetId: string;
    targetTypeName: string;
    children: React.ReactNode;
}

const WriteTargetNoteModal = ({
    targetId,
    targetTypeName,
    children: trigger,
}: WriteTargetNoteModalProps) => {
    return (
        <FocusModal>
            <FocusModal.Trigger asChild>
                {trigger}
            </FocusModal.Trigger>
            <FocusModal.Content>
                <FocusModal.Header>
                    <BodyTypography weight="bold">Write {targetTypeName} Note.</BodyTypography>
                    {/* OR */}
                    {/* CREATE BUTTON */}
                </FocusModal.Header>
                <FocusModal.Body>Create</FocusModal.Body>
            </FocusModal.Content>
        </FocusModal>
    );
}

export default WriteTargetNoteModal;