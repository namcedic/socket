import { Controller, Render, Get, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthenticationGuard } from '../common/guards/auth.guard';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/chat')
  @Render('index')
  getChatPage() {
    return {};
  }

  @UseGuards(AuthenticationGuard)
  @Get('/api/chat')
  chat() {
    return this.chatService.getMessages();
  }
}
