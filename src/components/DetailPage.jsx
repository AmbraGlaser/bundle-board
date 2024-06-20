import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DetailPage() {
    const { id } = useParams();
    const [imageData, setImageData] = useState(null);
    const [error, setError] = useState(null);
    const accessKey = "4enS4f3YopIfkSudT_f_-mVR6RAsYRDWjIANb8S3Y2Q";

    useEffect(() => {
        const fetchImageDetail = async () => {
            try {
                const data = await fetch(
                    `https://api.unsplash.com/photos/${id}?client_id=${accessKey}`
                );
                if (!data.ok) {
                    if (data.status === 403) {
                        setError("Access forbidden: 403");
                    } else {
                        throw new Error("Request failed");
                    }
                } else {
                    const dataJ = await data.json();
                    setImageData(dataJ);
                }
            } catch (error) {
                console.error(error);
                setError("An error occurred while fetching image details.");
            }
        };

        fetchImageDetail();
    }, [id]);

    if (error) {
        return <div className="error-page">{error}</div>;
    }

    if (!imageData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-screen justify-center">
            <div className="flex flex-col md:flex-row self-start m-2 rounded border-2 border-purple dark:border-light-blue p-2 max-w-5xl">
                <img
                    className="h-auto object-cover mr-0 md:mr-4 mb-4 md:mb-0"
                    src={imageData.urls.small}
                    alt={imageData.alt_description}
                />
                <div className="flex flex-col items-start justify-center">
                    <h1 className="text-2xl font-Title text-purple dark:text-light-blue mb-2 uppercase">
                        {imageData.alt_description || "No Description"}
                    </h1>
                    <p className="font-Secundair text-purple dark:text-light-blue mb-8">
                        {imageData.user.name}
                    </p>
                    <h1 className="text-2xl font-Title mt-8 md:mt-48 text-purple dark:text-light-blue">
                        Relative AI generated photo's
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
