import { createServer, proxy } from 'aws-serverless-express';
import { Handler, Context, Callback } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

let server: any;

async function bootstrapServer(): Promise<any> {
  if (!server) {
    const expressApp = express();
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    app.enableCors({ origin: true, credentials: true });
    await app.init();
    server = createServer(expressApp);
  }
  return server;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  const srv = await bootstrapServer();
  return proxy(srv, event, context, 'PROMISE').promise;
};