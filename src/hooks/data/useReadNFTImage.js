import React from "react";

export default function useReadNFTImage(data) {
    const [image, setImage] = React.useState(null);
    async function fetchMetadata(uri) {
        const response = await fetch(uri);
        const metadata = await response.json();
        setImage(metadata.image);
    }
    React.useEffect(() => {
        if (data && !data.metadata) {
            fetchMetadata(data.token_uri);
            return;
        }
        if (data && data.metadata) {
            setImage(JSON.parse(data?.metadata).image);
        }
    }, [data]);
    return image;
}