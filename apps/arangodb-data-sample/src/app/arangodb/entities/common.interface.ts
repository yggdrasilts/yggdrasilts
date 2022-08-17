export interface BaseEntity {
  identifier: string;
  name: string;
  description?: string;
  createdDate: Date;
  updatedDate: Date;
}
