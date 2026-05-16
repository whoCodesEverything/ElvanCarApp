// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoggingService {

//   constructor() { }
// }




import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  private logs: string[] = [];
  

  constructor() {}

  /** Log ekler */
  add(message: string): void {
    const log = `[${new Date().toLocaleTimeString()}] ${message}`;
    this.logs.push(log);
    console.log(log);
  }

  /** Tüm logları döner */
  getLogs(): string[] {
    return this.logs;
  }


  clear(): void {
    this.logs = [];
    console.clear();
  }
}
