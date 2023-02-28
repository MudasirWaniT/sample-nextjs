import { Image } from "@chakra-ui/react";

const UserImage = (props: any) => {
    function addDefaultSrc(event: any) {
        event.target.src = '/images/notFoundIngredientImg.jpg';
    }
    return (<Image {...props} onError={addDefaultSrc} />);
}

export const S3UserImage = (props: any) => {
    let { image, id, src, ...propsData } = props;
    if (image && id) {
        src = `${process.env.NEXT_PUBLIC_S3_BASE_URL}/users/image/${id}/${image}`;
    }
    return (
        <UserImage {...propsData} src={src} component={"avatar"} />
    );
}