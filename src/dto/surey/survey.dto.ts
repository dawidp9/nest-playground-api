import { IsEmail, IsString, Length } from 'class-validator';
import { SurveyEntity } from '../../entities/survey.entity';

export class SurveyDto implements Readonly<SurveyDto> {
  @IsEmail() email: string;
  @IsString() @Length(3, 99) username: string;

  public static from(dto: Partial<SurveyDto>) {
    const it = new SurveyDto();
    it.email = dto.email;
    it.username = dto.username;
    return it;
  }

  public static fromEntity(entity: SurveyEntity) {
    return this.from({
      email: entity.email,
      username: entity.username,
    });
  }

  public toEntity() {
    const it = new SurveyEntity();
    it.email = this.email;
    it.username = this.username;
    it.createDateTime = new Date();
    return it;
  }
}
