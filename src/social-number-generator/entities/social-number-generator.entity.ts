import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SocialNumberGeneratorDocument = HydratedDocument<SocialNumberGenerator>;

@Schema({ timestamps: true })
export class SocialNumberGenerator {
    _id: string;
   @Prop({ required: true, unique: true })
   key: string;

  @Prop({ default: 0 })
  seq: number;
}

export const SocialNumberGeneratorSchema = SchemaFactory.createForClass(SocialNumberGenerator);

