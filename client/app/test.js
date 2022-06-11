const thesaurusApi = axios.create({
    baseURL: `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=b456de96-e180-4a80-962b-915fb18a154c`
})
// NOTE for each word in the description, inject into the url and grab a random synonym from the Api

const d = post.originalDescription
console.log(d.replace("___", (Math.random(thesaurusApi[0]))))