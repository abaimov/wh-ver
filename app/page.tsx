import Screen from './Screen'
import {list} from '@vercel/blob';

export default async function Home() {
    const response = await list();
    return <Screen images={response.blobs}/>
}
