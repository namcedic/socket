import { Controller, Render, Get, Res, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/chat')
  @Render('index')
  getChatPage() {
    return {};
  }

  @UseGuards(AuthGuard('local'))
  @Get('/api/chat')
  async chat(@Res() res) {
    const messages = await this.chatService.getMessages();
    res.json(messages);
  }
}
