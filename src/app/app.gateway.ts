import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatEntity } from '../database/entities/chat.entity';
import { ChatService } from '../chat/chat.service';
import { CurrentSocketUser } from '../common/decorators/socket-user.decorator';
import { AuthPayload } from '../common/types/auth.type';
import { plainToInstance } from 'class-transformer';
import { Logger, UnauthorizedException } from '@nestjs/common';
@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(AppGateway.name);
  constructor(private chatService: ChatService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @CurrentSocketUser() user: AuthPayload,
    @MessageBody() text: string,
  ): Promise<void> {
    const chat = plainToInstance(ChatEntity, {
      text,
      userId: user.id,
    });
    await this.chatService.createMessage(chat);
  }

  @SubscribeMessage('getAllMessages')
  async getAllMessages(@CurrentSocketUser() user: AuthPayload): Promise<void> {
    if (!user) {
      throw new UnauthorizedException();
    }

    const messages = await this.chatService.getMessages();
    this.server.emit('receiveMessage', messages);
  }

  afterInit(server: Server) {
    this.logger.log('server', server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Connected ${client.id}`);
  }
}
