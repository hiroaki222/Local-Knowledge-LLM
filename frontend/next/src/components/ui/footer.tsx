import { Button } from "./button"
import { Input } from "./input"

export default function Footer() {

    return (
        <footer className="flex w-full justify-center items-center h-16 bg-sky-300 ">
            <div className="flex w-full items-center spave-x-2">
                <Input type="query" placeholder="query" />
                <Button type="submit">送信</Button>
            </div>
        </footer>
    )

}