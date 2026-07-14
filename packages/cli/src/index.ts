import {Command} from "commander"
import {sendTelegramMessage} from 'MessageKit-core'


const program= new Command()

program
    .name("MessageKit")
    .description("MessageKit tutorial CLI")
    .command("telegram")
    .description("Send a Telegram message")
    .argument("<chatId>", "Telegram chat ID")
    .argument("<message>", "Message text to send")
    .action(async (chatId: string, message:string)=>{
        const token= process.env.TELEGRAM_BOT_TOKEN;

        if (!token){
            console.error("Missing TELEGRAM_BOT_TOKEN enviroment variable");
            process.exit(1)
        }

        if(!chatId)
        {
            console.error("Missing Telegram ChatID ")
            process.exit(1)
        }
        if(!message)
        {
            console.error("Missing Telegram Message");
            process.exit(1)
        }

        try {
            const result= await sendTelegramMessage({
            botToken:token,
            message:message,
            chatId:chatId
            })

            console.log(`Sent Telegram message to chat ${result.chatId}`)
            console.log(`Telegram Message Id ${result.messageId}`)
        } catch (error) {
            const detail= error instanceof Error ? error.message : String(error)
            console.log(`Telegram API Request failed ${detail}`)
            process.exit(1)
        }
    });

    program.parseAsync(process.argv)