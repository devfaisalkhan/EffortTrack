import { Module } from '@nestjs/common';
import { CustomConfigurationService } from './configuration.service'; // Adjust path as needed

@Module({
  providers: [CustomConfigurationService],
  exports: [CustomConfigurationService],
})
export class ConfigurationModule {}
