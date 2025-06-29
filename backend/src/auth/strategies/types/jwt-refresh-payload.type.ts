import { Session } from 'src/session/entities/session.entity';

export type JwtRefreshPayloadType = {
  sessionId: Session['id'];
  hash: string;
  iat: number;
  exp: number;
};
