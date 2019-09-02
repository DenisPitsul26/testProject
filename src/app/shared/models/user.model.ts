export class User {
  constructor(public email: string,
              public password: string,
              public name: string,
              public isAdmin: number,
              public groupId?: number,
              public numberOfGroup?: string,
              public id?: number
  ) {}
}
