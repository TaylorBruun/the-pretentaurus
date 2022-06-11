import { ProxyState } from "../AppState.js"


class ThesaurusService {


  async changeDescription(desc) {
    let descString = desc.split(" ")
    console.log(descString);
    let editedString = descString.forEach(async d => {
      console.log("trying here too");
      if (d.length > 5) {
        const res = await axios.get(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${d}?key=eb472d40-a27d-4eec-a6f1-91e39cc61e27`)
      }
    })
    return descString
  }

}

export const thesaurusService = new ThesaurusService

