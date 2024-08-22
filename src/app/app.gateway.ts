import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatEntity } from '../database/entities/chat.entity';
import { ChatService } from '../chat/chat.service';
@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: ChatEntity): Promise<void> {
    await this.chatService.createMessage(payload);
    const messages = await this.chatService.getMessages();
    this.server.emit('recMessage', messages);
  }

  afterInit(server: Server) {
    console.log('server', server);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    //Do stuffs
  }

  handleConnection(client: Socket) {
    console.log(`Connected ${client.id}`);
    //Do stuffs
  }
}
