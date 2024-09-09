'use client';

import Switcher from "@/components/shared/switcher";
import FileUploader from "@/components/shared/imageUpload";
import { useState } from "react";

interface Image {
    url: string;
    downloadUrl: string;
    pathname: string;
    size: number;
    uploadedAt: Date;
}

export default function Screen({ images }: { images: Image[] }) {
    const [dataImages, setDataImages] = useState<Image[]>(images);

    const delImg = async (pathname: string) => {
        try {
            const response = await fetch('/api/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pathname }),
            });

            const result = await response.json();

            if (response.ok) {
                setDataImages(prev => prev.filter(image => image.pathname !== pathname));
                console.log('IMG DEL', result.message);
            } else {
                console.error('ERROR DELETE IMG', result.message);
            }
        } catch (e: unknown) {
            let errorMessage = 'Unknown error occurred';
            if (e instanceof Error) {
                errorMessage = e.message;
            }
            console.error('ERROR DELETE IMG', errorMessage);
        }
    };

    return (
        <>
            <Switcher />
            <FileUploader />
            {dataImages.map((el: Image, index: number) => (
                <div key={index} className="flex">
                    <img src={el.url} alt={`pic${index}`} />
                    <div
                        className="bg-red-200 h-[30px] w-[100px] text-center cursor-pointer"
                        onClick={() => delImg(el.pathname)}
                    >
                        DELETE
                    </div>
                </div>
            ))}
        </>
    );
}
