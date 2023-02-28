import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { SUPPORT } from "../../lib/app/common/routeConstants";

const ClaimsAndLabeling = () => {
    return (
        <Box>
            <Breadcrumb spacing='8px' py="5px" separator={<FiChevronRight color='gray.500' />}>
                <BreadcrumbItem _hover={{ textDecoration: "underline" }}>
                    <Link href={SUPPORT}>Support</Link>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href='#' color={"#5E8E22"}>{"Claims & Labeling"}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Box bg={"#fff"} borderRadius="8px">
                <Box borderBottom={"3px solid #ccc"} p={"20px 35px"} mt="45px">
                    <Heading color={"#5E8E22"}>{"Claims & Labeling"}</Heading>
                </Box>
                <Box p="60px 40px">
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer feugiat leo turpis, in aliquet enim ornare non. Vivamus iaculis dictum nisl. Aliquam posuere nunc quis placerat dignissim. Fusce efficitur, lorem non tincidunt dignissim, augue ante lacinia mauris, ut accumsan augue arcu id purus. Proin elit enim, congue eget leo ac, pulvinar auctor nibh. Cras eget luctus lectus. Vestibulum imperdiet enim massa, non dignissim ligula congue a. Fusce venenatis luctus purus sit amet bibendum. Aliquam efficitur urna dolor. Proin molestie feugiat consequat. Nunc viverra diam non ipsum eleifend viverra. Aliquam molestie nibh at sagittis ultrices. Nam eu elit id nibh interdum lobortis. Integer eget risus quis magna dictum pellentesque ac at eros. Maecenas porttitor nulla enim, sed mattis ante viverra in. Sed ut nulla vitae est sollicitudin aliquam sed quis felis.

                        Vestibulum malesuada nec lectus nec malesuada. Etiam in tincidunt orci. Vivamus sit amet lorem nibh. Quisque imperdiet aliquet purus, vel auctor elit rhoncus et. Proin sagittis mi neque, at lobortis dui vehicula vitae. Nulla at ante vitae ante sagittis finibus at eu orci. Ut aliquet lacus eu diam tempus feugiat. Nunc in libero dui. Morbi ullamcorper porttitor justo, sed vehicula nunc sollicitudin in. Quisque mi enim, euismod vitae blandit eget, auctor eu felis. Sed semper risus ut rutrum mattis. Nunc at cursus est. Nulla viverra finibus justo, sit amet iaculis nisl vestibulum et. Phasellus magna arcu, commodo nec ligula id, dictum venenatis mauris. In hac habitasse platea dictumst. Etiam porttitor maximus mollis.

                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla porta congue sem et maximus. Proin at imperdiet sem. Aenean condimentum, nunc nec varius pharetra, urna libero dictum urna, vel placerat lectus ipsum elementum urna. Aenean non varius dolor, id dignissim justo. Integer volutpat maximus arcu, non lacinia ipsum. Nunc cursus viverra efficitur. Fusce egestas neque magna, ut commodo leo congue at. Phasellus eget rhoncus ipsum.

                        Donec convallis urna vitae eros eleifend feugiat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed et sapien dolor. Sed ut aliquet est. Curabitur quis elit interdum, tempus dolor sed, faucibus felis. Quisque scelerisque ornare lorem, vitae cursus lectus faucibus id. Donec risus tellus, tincidunt ut malesuada ut, facilisis a nisi. Pellentesque in nulla quis mauris venenatis auctor. Proin eget leo pretium tortor volutpat ultrices. Mauris volutpat neque et tristique vestibulum. In dictum eleifend facilisis. Cras consectetur, tellus sagittis posuere pellentesque, eros arcu hendrerit sem, sollicitudin consectetur odio mauris ut lectus. Aenean pellentesque eget eros in blandit. Etiam metus orci, porttitor in eleifend a, suscipit vel tortor.

                        Integer condimentum luctus nibh, et convallis ipsum ultrices sit amet. Duis at enim tempor, rhoncus mi vel, facilisis augue. Proin sed efficitur tellus. Integer molestie tortor at accumsan tincidunt. Quisque eu dapibus est. Suspendisse potenti. Proin vel lorem leo. Aenean vehicula, urna ut lacinia pulvinar, lorem magna vestibulum sem, id viverra lorem turpis at mi. Aenean ex est, efficitur sed lectus id, sagittis hendrerit turpis. Sed nec dignissim nisi, id ultricies libero. Mauris laoreet sem eget gravida vulputate.

                    </Text>
                </Box>
            </Box>
        </Box>
    );
}

export default ClaimsAndLabeling;