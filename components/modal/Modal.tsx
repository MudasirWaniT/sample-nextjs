import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import { memo } from 'react';

interface IModalContainerProps {
    isLoading?: boolean;
    closeOnOverlayClick?: boolean;
    modalTitle?: string;
    modalBody: string;
    showPrimaryButton: boolean;
    showSecondaryButton: boolean;
    modalPrimaryButtonText?: string;
    modalSecondaryButtonText?: string;
    modalSecondaryButtonFn?: () => void;
    isOpen: boolean;
    onClose: () => void;
    isCentered: boolean;
    size: string;
}

const ModalContainer = ({ isLoading, size, isCentered, showPrimaryButton, showSecondaryButton, closeOnOverlayClick, modalTitle, modalBody, isOpen, onClose, modalPrimaryButtonText, modalSecondaryButtonText, modalSecondaryButtonFn }: IModalContainerProps) => {
    return (
        <>
            <Modal closeOnOverlayClick={closeOnOverlayClick} size={size} isOpen={isOpen} onClose={onClose} isCentered={isCentered}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody fontSize={"18px"}>
                        {modalBody}
                    </ModalBody>
                    <ModalFooter>
                        {showPrimaryButton && <Button colorScheme='green' variant="outline" mr={3} disabled={isLoading} onClick={onClose}>
                            {modalPrimaryButtonText}
                        </Button>}
                        {showSecondaryButton && <Button isLoading={isLoading} loadingText={modalSecondaryButtonText + 'ing'} disabled={isLoading} bg='#5E8E22' color={"#fff"} _hover={{ bg: "#5E8E22", color: "#fff" }} onClick={modalSecondaryButtonFn}>{modalSecondaryButtonText}</Button>}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default memo(ModalContainer);