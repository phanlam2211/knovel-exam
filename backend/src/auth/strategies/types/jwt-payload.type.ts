import { Session } from 'src/session/entities/session.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

export type JwtPayloadType = Pick<User, 'id'> & {
  role: Role;
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
