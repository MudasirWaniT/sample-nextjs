import { Image } from "@chakra-ui/react";

const IngredientImage = (props: any) => {
    function addDefaultSrc(event: any) {
        event.target.src = '/images/notFoundIngredientImg.jpg';
    }
    return (<Image {...props} onError={addDefaultSrc} />);
}

const S3Image = (props: any) => {
    let { image, src, component, ...propsData } = props;
    if (image && image.type === "Image") {
        if (image.path) {
            if (image.path.includes("https://") || image.path.includes("http://")) {
                src = image.path;
            } else {
                src = `${process.env.NEXT_PUBLIC_S3_BASE_URL}/ingredients/media/${image.ingredientId}/${image.path}`;
            }
        } else if (component === "edit") {
            src = `${process.env.NEXT_PUBLIC_S3_BASE_URL}/ingredients/media/${image.ingredientId}/${src}`;
        }
    }
    return (<IngredientImage {...propsData} src={src} component="ingredient" />);
}

export default S3Image;