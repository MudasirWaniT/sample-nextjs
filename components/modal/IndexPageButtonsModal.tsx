import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Checkbox,
    Link
} from '@chakra-ui/react'
import { ChangeEvent, memo } from 'react';
import { TERMS_AND_CONDITIONS } from '../../lib/app/common/routeConstants';

interface IModalContainerProps {
    isLoading: boolean;
    modalTitle?: string;
    closeOnOverlayClick: boolean;
    modalPrimaryButtonText: string;
    modalPrimaryButtonFn: () => void;
    modalSecondaryButtonText: string;
    modalSecondaryButtonFn: () => void;
    modalTertiaryButtonText?: string;
    modalTertiaryButtonFn?: () => void;
    modalQuaternaryButtonText?: string;
    termsAndConditions?: boolean;
    handleTermsOnChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    isOpen: boolean;
    showOrderContent?: boolean;
    showCustomisationContent?: boolean;
    customisationText?: string;
    onClose: () => void;
}

const IndexPageModal = ({ isLoading, closeOnOverlayClick, isOpen, showOrderContent, showCustomisationContent, customisationText, onClose, modalTitle, modalPrimaryButtonText, modalPrimaryButtonFn, modalSecondaryButtonText, modalSecondaryButtonFn, termsAndConditions, handleTermsOnChange, modalTertiaryButtonText, modalTertiaryButtonFn, modalQuaternaryButtonText }: IModalContainerProps) => {
    return (
        <>
            <Modal closeOnOverlayClick={closeOnOverlayClick} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{showOrderContent ? modalTitle : ""}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody textAlign={showOrderContent ? "start" : "center"} p={showOrderContent || showCustomisationContent ? "15px 30px" : "30px 60px"}>
                        {!showOrderContent && !showCustomisationContent ?
                            <>
                        <Button w="100%" colorScheme='black' variant="outline" onClick={modalPrimaryButtonFn} p="24px 16px">
                            {modalPrimaryButtonText}
                        </Button>
                        <Text color={"#939393"} my="10px">or</Text>
                                <Button width="100%" bg={"#5E8E22"} color="white" p="24px 16px" _hover={{ bg: "#5E8E22", color: "white" }} _active={{ bg: "#5E8E22", color: "white" }} onClick={modalSecondaryButtonFn}>{modalSecondaryButtonText}</Button>
                            </>
                            :
                            showOrderContent ?
                                <Checkbox name="termsAndConditions" checked={termsAndConditions} onChange={handleTermsOnChange}>I agree to <Link href={TERMS_AND_CONDITIONS} color="black" target={"_blank"} fontWeight={600}> terms and conditions</Link></Checkbox>
                                :
                                <Text fontWeight={"400"} lineHeight="25px" fontSize={"18px"} dangerouslySetInnerHTML={{ __html: customisationText ? customisationText : "" }}></Text>
                        }
                    </ModalBody>
                    <ModalFooter>
                        {showOrderContent ? <Button width="100%" bg={"#5E8E22"} color="white" p="24px 16px" _hover={{ bg: "#5E8E22", color: "white" }} _active={{ bg: "#5E8E22", color: "white" }} isLoading={isLoading} disabled={isLoading || !termsAndConditions} onClick={modalTertiaryButtonFn}>
                            {modalTertiaryButtonText}
                        </Button> :
                            showCustomisationContent &&
                            <Button width="100%" bg={"#5E8E22"} color="white" p="24px 16px" _hover={{ bg: "#5E8E22", color: "white" }} _active={{ bg: "#5E8E22", color: "white" }} onClick={onClose}>
                                {modalQuaternaryButtonText}
                            </Button>}</ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default memo(IndexPageModal);