import { ClientProxy } from '@nestjs/microservices';
import { Request as ExpressRequest } from 'express';

export const proxySend = (proxy: ClientProxy, req: ExpressRequest) => {
  const url = req.url.split('/');
  switch (req.method) {
    case 'GET':
      return proxy.send(
        { cmd: url[url.length - 1], method: req.method },
        req.params,
      );

    case 'POST':
    default:
      return proxy.send(
        { cmd: url[url.length - 1], method: req.method },
        req.body,
      );
  }
};
