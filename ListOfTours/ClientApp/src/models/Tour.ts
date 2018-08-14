import { ExcursionSight } from '../models/ExcursionSight';

export class Tour {
  constructor(
    public id: number,
    public name: string,
    public clientName: string,
    public date: Date,
    public excursionSights: ExcursionSight[]
  ) { }
}
