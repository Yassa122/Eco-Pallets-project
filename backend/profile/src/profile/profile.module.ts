import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UserSchema } from '../../../account.services/src/identity/schemas/user.schema';  // Import the User interface

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
