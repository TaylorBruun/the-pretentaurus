import { thesaurusService } from "../Services/ThesaurusService.js";


export class ThesaurusController {
  constructor() {

  }

  async changeDescription(desc) {
    try {
      console.log("trying here at change description");
      let editedString = await thesaurusService.changeDescription(desc)
      return editedString
    } catch (error) {
      console.error(error)
    }
  }
}