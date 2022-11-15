class BreakingBad{

    constructor(baseURLQuote = "https://api.breakingbadquotes.xyz/v1/quotes", baseURLCharacterInfo = "https://breakingbadapi.com/api/") {
        this.baseURLQuote = baseURLQuote;
        this.baseURLCharacterInfo = baseURLCharacterInfo;

        this.correctCharacterNamesKeys = [...this.nameCorrector.keys()]
    }


    getRandomQuote(){
        return fetch(`${this.baseURLQuote}`)
            .then(response=>response.json())
    }
    getCharacterInfoByName(characterName){
        console.log(`${this.baseURLCharacterInfo}characters?name=${characterName}`)
        return fetch(`${this.baseURLCharacterInfo}characters?name=${characterName}`)
            .then(response=>response.json())
    }

    correctName(name){
        console.log(this.correctCharacterNamesKeys.includes(name.toLowerCase()))
         if (this.correctCharacterNamesKeys.includes(name.toLowerCase())){
            return this.nameCorrector.get(name.toLowerCase());
         }
         return name;
    }
    

    nameCorrector = new Map([
        ["hank schrader", "Henry Schrader"],
        ["badger", "Brandon Mayhew"]
      ]);


}

export {BreakingBad}
