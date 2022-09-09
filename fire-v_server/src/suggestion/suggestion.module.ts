import { Module } from '@nestjs/common';
import { SuggestionService } from './suggestion.service';
import { SuggestionController } from './suggestion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Suggestion, SuggestionSchema } from 'src/schemas/suggestion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Suggestion.name, schema: SuggestionSchema }]),
  ],
  controllers: [SuggestionController],
  providers: [SuggestionService],
  exports: [SuggestionService]
})
export class SuggestionModule {}
