import { Controller, Render, Get, Res } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/chat')
  @Render('index')
  getChatPage() {
    return {};
  }

  @Get('/api/chat')
  async chat(@Res() res) {
    const messages = await this.chatService.getMessages();
    res.json(messages);
  }
}
