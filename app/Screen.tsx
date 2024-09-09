'use client';

import Switcher from "@/components/shared/switcher";
import FileUploader from "@/components/shared/imageUpload";

export default function Screen({ images }: any) {
    const delImg = async (url: string) => {
        try {
            const response = await fetch('/api/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pathname: url }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log('IMG DEL', result.message);
            } else {
                console.error('ERROR DELETE IMG', result.message);
            }
        } catch (e) {
            console.error('ERROR DELETE IMG', e);
        }
    };

    return (
        <>
            <Switcher />
            <FileUploader />
            {images.map((el: any, index: number) => (
                <div key={index} className="flex">
                    <img src={el.url} alt={`pic${index}`} />
                    <div
                        className="bg-red-200 h-[30px] w-[100px] text-center cursor-pointer"
                        onClick={() => delImg(el.url)}
                    >
                        DELETE
                    </div>
                </div>
            ))}
        </>
    );
}
