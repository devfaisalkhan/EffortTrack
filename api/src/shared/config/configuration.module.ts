import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service'; // Adjust path as needed

@Module({
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
