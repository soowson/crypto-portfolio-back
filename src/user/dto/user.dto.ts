import {IsEmail, IsString, Length} from "class-validator";

export class UserDto {
    @IsString()
    @IsEmail()
    @Length(7, 320)
    email: string;

    @IsString()
    @Length(8, 255)
    pwdHash: string;
}
