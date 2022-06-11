import { ProxyState } from "../AppState.js"

async function getWords(word, index) {
  const res = await axios.get(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=eb472d40-a27d-4eec-a6f1-91e39cc61e27`)
  return {
    index,
    newWord: res.data[0].meta.syns[0][0]
  }
}

class ThesaurusService {


  async changeDescription(desc) {
    let descString = desc.split(" ")
    console.log(descString);
    let requests = []
    await descString.forEach(async (d, i) => {
      if (d.length > 5) {
        // axios.get(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${d}?key=eb472d40-a27d-4eec-a6f1-91e39cc61e27`)
        // console.log(res.data[0].meta.syns[0][0]);
        // descString.splice(i, 1, res.data[0].meta.syns[0][0])
        requests.push(getWords(d, i))
      }
    })
    const results = await Promise.all(requests)
    // descString = descString.join(' ')
    console.log(results);
    // itterate over results and replace the indexes of descString
    results.forEach(r => {
      descString[r.index] = r.newWord
    })
    descString = descString.join(' ')
    console.log(descString);
    return descString
  }
}

export const thesaurusService = new ThesaurusService

