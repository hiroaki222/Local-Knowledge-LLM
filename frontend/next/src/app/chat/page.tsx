import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

export default function Chat() {
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="flex items-center justify-between border-b bg-background px-4 py-3 shadow-sm sm:px-6">
        <div className="flex items-center gap-2">
          <MessageCircleIcon className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold">Chat App</h1>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <PlusIcon className="h-5 w-5" />
          <span className="sr-only">New Chat</span>
        </Button>
      </header>
      <div className="flex h-full">
        <div className="hidden w-60 border-r bg-background p-4 sm:block">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium">Chats</h2>
            <Button variant="ghost" size="icon" className="rounded-full">
              <PlusIcon className="h-5 w-5" />
              <span className="sr-only">New Chat</span>
            </Button>
          </div>
          <div className="space-y-2 overflow-auto">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md bg-muted/50 p-2 transition-colors hover:bg-muted"
              prefetch={false}
            >
              <Avatar className="h-8 w-8">s
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="truncate">
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-muted-foreground">Hello, how are you?</div>
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md bg-muted/50 p-2 transition-colors hover:bg-muted"
              prefetch={false}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="truncate">
                <div className="font-medium">Jane Doe</div>
                <div className="text-sm text-muted-foreground">Hey, did you see the new design?</div>
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md bg-muted/50 p-2 transition-colors hover:bg-muted"
              prefetch={false}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="truncate">
                <div className="font-medium">Bob Smith</div>
                <div className="text-sm text-muted-foreground">Sounds good, let's discuss it.</div>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-auto px-4 py-6 sm:px-6">
            <div className="grid gap-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-medium">John Doe</div>
                  <div className="rounded-lg bg-muted p-3 text-sm">Hey, how's it going?</div>
                </div>
              </div>
              <div className="flex items-start gap-4 justify-end">
                <div className="grid gap-1">
                  <div className="font-medium text-right">You</div>
                  <div className="rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                    Pretty good, just working on a new project.
                  </div>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>YO</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="font-medium">Jane Doe</div>
                  <div className="rounded-lg bg-muted p-3 text-sm">That's great! Let me know if you need any help.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 justify-end">
                <div className="grid gap-1">
                  <div className="font-medium text-right">You</div>
                  <div className="rounded-lg bg-primary p-3 text-sm text-primary-foreground">
                    Thanks, I'll keep you posted!
                  </div>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>YO</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          <div className="border-t bg-background px-4 py-3 sm:px-6">
            <div className="relative">
              <Textarea
                placeholder="Type your message..."
                className="min-h-[48px] w-full rounded-2xl border border-neutral-400 shadow-sm pr-16"
              />
              <Button type="submit" size="icon" className="absolute top-3 right-3" disabled>
                <ArrowUpIcon className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ArrowUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  )
}


function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
