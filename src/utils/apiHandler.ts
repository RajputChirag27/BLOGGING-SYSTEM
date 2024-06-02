// class ApiHandler extends HTT

export class ApiHandler {
  private success: boolean
  constructor(private readonly result: any) {
    this.success = true
    this.result = result
  }
}
