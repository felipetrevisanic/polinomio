const fs = require('fs');

const arquivoSaida = 'saida.txt';
const polinomioCRC = '11010'

function calcularCRC(palavraBinaria, polinomio) {
    // Adiciona zeros ao final da palavra para o tamanho do polinômio - 1
    let palavraEstendida = palavraBinaria + "0".repeat(polinomio.length - 1);

    // Converte a palavra estendida e o polinômio para arrays de bits
    let palavraArray = palavraEstendida.split("").map(Number);
    let polinomioArray = polinomio.split("").map(Number);

    // Loop para realizar a operação XOR bit a bit
    for (let i = 0; i < palavraBinaria.length; i++) {
        if (palavraArray[i] === 1) {
            // Realiza a operação XOR
            for (let j = 0; j < polinomio.length; j++) {
                palavraArray[i + j] ^= polinomioArray[j];
            }
        }
    }

    // Retorna os bits de verificação (CRC)
    return palavraArray.slice(-polinomio.length + 1).join("");
}



let palavraBinaria = fs.readFileSync(arquivoSaida, 'utf8').trim();

let crc = calcularCRC(palavraBinaria, polinomioCRC);
if(crc == 0){
    console.log('MENSAGEM CHEGOU COM SUCESSO');
}
else{
    console.log('HOUVE UM ERRO NA TRANSMISSÃO DA MENSAGEM');
}
