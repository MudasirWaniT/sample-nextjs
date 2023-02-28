import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";
import Loader from "../../../components/loader/Loader";
import { Tokens } from "../../storage";
import { isLoggedIn } from "../common/authService";
import { INGREDIENTS, LOGIN } from "../common/routeConstants";
import PrivateLayout from "./private/Layout";
import PublicLayout from "./public/Layout";

const Layout = ({ children }: PropsWithChildren) => {
    const { route, replace } = useRouter();
    const [publicPrivatePaths] = useState<string[]>([
        "/ingredients",
        "/ingredients/view/[id]",
        "/cart",
        "/support",
        "/support/ClaimsAndCertifications",
        "/support/EngagementTool",
        "/support/Customization",
        "/support/NutritionalInfo",
        "/support/TripleImpact",
        "/support/GTM",
        "/support/Digitization",
        "/termsAndConditions"
    ]);
    const [publicPaths] = useState<string[]>([
        "/",
        "/signup",
        "/login",
        "/case-studies",
        "/forgot-password",
        "/reset-password/[resetToken]",
        "/nda-form",
    ]);
    const [authorized, setAuthorized] = useState<any>(null);

    useEffect(() => {
        if (isLoggedIn()) {
            if (publicPaths.includes(route)) {
                replace(INGREDIENTS);
            } else {
                setAuthorized(true);
            }
        } else {
            if (publicPaths.includes(route) || publicPrivatePaths.includes(route)) {
                Tokens.removeLocalData();
                setAuthorized(false);
            } else if (!publicPrivatePaths.includes(route)) {
                replace(LOGIN);
            } else {
                setAuthorized(false);
            }
        }
    }, [route, publicPaths]);

    return (
        <Box>
            {authorized ? (
                <PrivateLayout>{children}</PrivateLayout>
            ) : authorized !== null ? (
                <PublicLayout>{children}</PublicLayout>
            ) : (
                <Loader loading={authorized === null ? true : false} />
            )}
        </Box>
    );
};

export default Layout;