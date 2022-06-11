import { ProxyState } from "../AppState.js"


class ThesaurusService {


  async changeDescription(desc) {
    let descString = desc.split(" ")
    console.log(descString);
    descString.forEach(async d => {
      console.log("trying here too");
      if (d.length > 5) {
        const res = await axios.get(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${d}?key=eb472d40-a27d-4eec-a6f1-91e39cc61e27`)
        console.log(res.data);
        console.log(res.data[0].meta.syns[0][0]);
        console.log(d);
      }
    })
  }

}

export const thesaurusService = new ThesaurusService