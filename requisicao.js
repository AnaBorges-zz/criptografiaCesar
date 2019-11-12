
            function fazerRequisicaoGet(){
                var url = 'https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=c9d203797e3ea7e942e376a9b72d5b28bf01da8d'

            
                var response = new XMLHttpRequest();
                response.open("GET", url, false);
            
                response.send();
            
                var answer = JSON.parse(response.responseText);
                
                console.log(answer.cifrado);
                console.log(answer.numero_casas);
                console.log(encriptar(answer.cifrado, answer.numero_casas));
                

                document.getElementById("resposta").innerHTML = answer;
            }

            function encriptar(textoOriginal, chave){
                var textoCifrado = "";

                for (var i = 0; i < textoOriginal.length; i++) {
                    textoCifrado += encriptarTexto(textoOriginal.charCodeAt(i), chave);
                }
        
                return textoCifrado;
            }

            function encriptarTexto(charOriginal, chave) {
                var charCifrado;

                    if (charOriginal >= 97 && charOriginal <= 122) {
                        charCifrado = String.fromCharCode(((charOriginal - 97 - chave + 26) % 26 + 97));
                    }
                    else {
                        
                        charCifrado = String.fromCharCode(charOriginal);
                    }
                    
                return charCifrado;
            }
