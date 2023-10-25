declare module 'express' {
  export interface Request {
    device: any; // укажите более конкретный тип, если у вас есть информация о структуре
  }
}
