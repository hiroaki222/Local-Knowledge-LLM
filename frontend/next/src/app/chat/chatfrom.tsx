'use client'

import React from "react"
import { RecoilRoot, useRecoilState } from "recoil"
import Chatmessage from './ChatMessage'
import ChatForm from '.ChatForm'

const ChatClient = () => {
    return(
        <RecoilRoot>
            <div className="flex-grow overflow-auto p-6 space-y-5">
                < Chatmessage/>
            </div>

            < ChatForm/>
        </RecoilRoot>
    )
}

export default ChatClient