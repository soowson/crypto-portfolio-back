import {IsEmail, IsString} from "class-validator";

export class AuthLoginDto {
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    pwd: string;
}
