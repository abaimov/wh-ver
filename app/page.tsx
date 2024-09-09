import Screen from './Screen'


export default async function Home() {
    const response = await fetch('http://localhost:3000/api/get-images', {cache: "no-cache"})
    const data = await response.json()
    console.log(data.images.blobs);
    return <Screen images={data.images.blobs}/>
}
