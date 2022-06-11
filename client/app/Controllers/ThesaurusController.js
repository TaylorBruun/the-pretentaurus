import { thesaurusService } from "../Services/ThesaurusService.js";


export class ThesaurusController {
  constructor() {
    ThesaurusController.changeDescription('picture')
  }

  static async changeDescription(desc) {
    try {
      console.log("trying here at change description");
      let editedString = await thesaurusService.changeDescription(desc)
      console.log(editedString);
      return editedString
    } catch (error) {
      console.error(error)
    }
  }
}