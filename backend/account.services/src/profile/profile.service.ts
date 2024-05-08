import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserProfileDto } from 'src/identity/dto/updateUserProfile.dto';
import { IdentityService } from 'src/identity/identity.service';
import { User } from 'src/identity/interfaces/user';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class ProfileService {
    private readonly logger = new Logger(ProfileService.name);
    hello: any;
  

    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService,
        private kafkaService: KafkaService,
      ) {}
    async getUserProfileInfo(id: string): Promise<User> {
        try {
          const user = await this.userModel
            .findById(id)
            .select('-password -__v')
            .exec();
          if (!user) {
            this.logger.warn(`No user found with ID: ${id}`);
            return null; // Ensure to return null if no user found
          }
          return user;
        } catch (error) {
          this.logger.error(`Error retrieving user profile: ${error}`);
          throw new Error('Failed to retrieve user profile');
        }
      }
    
      async updateUserProfile(userId: string, profileDto: UpdateUserProfileDto): Promise<User | null> {
        if (!userId) {
            this.logger.warn('Attempted to update user profile without providing an ID');
            return null;
        }

        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(userId, profileDto, { new: true })
                .select('-password -__v')
                .exec();
            if (!updatedUser) {
                this.logger.warn(`No user found with ID: ${userId}`);
                return null;
            }
            return updatedUser;
        } catch (error) {
            this.logger.error(`Error updating user profile: ${error}`);
            throw new Error('Failed to update user profile');
        }
    }



}
