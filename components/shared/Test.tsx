'use client'

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ApiBot} from "@/app/service/bot";

const sendData = async () => {
    await ApiBot.sendMessage({str:"PIDR"})

}

const Test = () => {
    return (
        <div className={'w-full flex items-center justify-center h-screen'}>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" placeholder="Text"/>
                <Button onClick={sendData} type="submit">Subscribe</Button>
            </div>
        </div>
    );
}

export default Test;
