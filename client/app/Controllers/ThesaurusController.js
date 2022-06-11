import { thesaurusService } from "../Services/ThesaurusService.js";


export class ThesaurusController {
  constructor() {
    this.changeDescription("longer string terrible")
  }

  async changeDescription(desc) {
    try {
      console.log("trying here at change description");
      await thesaurusService.changeDescription(desc)
    } catch (error) {
      console.error(error)
    }
  }
}