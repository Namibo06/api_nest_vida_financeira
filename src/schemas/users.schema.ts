import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserSchema{
    @Prop({required: true, maxlength: 25})
    nickname: string;

    @Prop({required: true, maxlength: 64, unique: true})
    email: string;

    @Prop({required: true, maxlength: 80})
    password: string;

    @Prop({required: false, maxlength: 100})
    token: string;
}

export const userSchema = SchemaFactory.createForClass(UserSchema);