import { EmotionEntity } from "@libs/orm";

export class EmotionModel {
  id: number;
  /**
   * emotion name
   */
  title: string;
  /**
   * percent of this emotion on the emotions
   */
  percentage: number;

  constructor(emotionEntity: EmotionEntity) {
    this.id = emotionEntity.id;
    this.title = emotionEntity.title;
    this.percentage = emotionEntity.percentage;
  }
}
