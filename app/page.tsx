import Screen from './Screen';

export default async function Home() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/get-images`, { cache: "no-cache" });

        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }

        const data = await response.json();

        if (!data?.images?.blobs) {
            throw new Error('Invalid data format');
        }

        console.log(data.images.blobs);

        return <Screen images={data.images.blobs} />;
    } catch (error) {
        console.error('Error fetching images:', error);

        // Возвращаем альтернативный контент в случае ошибки
        return <div>Error loading images</div>;
    }
}
