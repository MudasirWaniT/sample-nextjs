import { Box, Spinner } from "@chakra-ui/react";

interface ILoaderProps {
    loading: boolean;
}

const Loader = ({ loading }: ILoaderProps) => {
    return (
        <Box
            className="loader"
            display={"flex"}
            alignItems="center"
            justifyContent={"center"}
            position="fixed"
            zIndex={999}
            background="rgba(0,0,0,0.7)"
            left="0"
            right="0"
            top="0"
            bottom="0"
            margin="0"
        >
            {
                loading && <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='white'
                    color='#5E8E22'
                    size='xl'
                />
            }
        </Box>
    );
}

export default Loader;