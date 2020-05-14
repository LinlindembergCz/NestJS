import { User } from '../user/user.entity';
import { Repository, EntityRepository, getConnection } from 'typeorm';
import { SignupDto } from './dto';
import { RoleRepository } from '../role/role.repository';
import { Role } from '../role/role.entity';
import { Roletype } from '../role/roletype.enum';
import { UserDetails } from '../user/user.details.entity';
//import { genSalt, hash } from 'bcryptjs';//npm i -D @types/bcryptjs @types/passport @types/passport-jwtcls

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signup(signupDto: SignupDto) {
    const { username, email, password } = signupDto;
    const user = new User();
    user.username = username;
    user.email = email;

    const roleRepository: RoleRepository = await getConnection().getRepository(
      Role,
    );

    const defaultRole: Role = await roleRepository.findOne({
      where: { name: Roletype.GENERAL },
    });

    user.roles = [defaultRole];

    const details = new UserDetails();
    user.details = details;

    //const salt = await genSalt(10);
    user.password = password;//await hash(password, salt);

    await user.save();
  }
}