const sha1 = require('node-sha1');
const axios = require('axios');
async function fetchData(url){
    try{
        const response  = await axios.get(url);

        return response.data;
    }catch(e){
    
        return e;
    }
}

function Desencriptar(textoOriginal, chave){
    var textoCifrado = "";

    for (var i = 0; i < textoOriginal.length; i++) {
        textoCifrado += DesencriptarTexto(textoOriginal.charCodeAt(i), chave);
    }

    return textoCifrado;
}

function DesencriptarTexto(charOriginal, chave) {
    var charCifrado;

        if (charOriginal >= 97 && charOriginal <= 122) {
            charCifrado = String.fromCharCode(((charOriginal - 97 - chave + 26) % 26 + 97));
        }
        else {
            
            charCifrado = String.fromCharCode(charOriginal);
        }
        
    return charCifrado;
}

async function run(){
    try{
        let response = await fetchData('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=c9d203797e3ea7e942e376a9b72d5b28bf01da8d')
        response.decifrado = Desencriptar(response.cifrado, response.numero_casas);
        response.resumo_criptografico = sha1(response.decifrado);
        console.log(response);
        axios.post('https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=c9d203797e3ea7e942e376a9b72d5b28bf01da8d', response);

    }catch(e){
        console.log(e);
    }
}

run();