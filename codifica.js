const fs = require('fs');

// Função para calcular o código CRC
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

// Função para converter uma string para uma sequência de bits
function stringParaBits(texto) {
    let resultado = "";
    for (let i = 0; i < texto.length; i++) {
        let binario = texto[i].charCodeAt(0).toString(2);
        // Preenche com zeros à esquerda para garantir 8 bits por caractere
        resultado += "00000000".slice(binario.length) + binario;
    }
    return resultado;
}



// Palavra a ser processada (substitua isso pela leitura do seu arquivo txt)
function lerPalavraDeArquivo(caminhoArquivo) {
    try {
        return fs.readFileSync(caminhoArquivo, 'utf8').trim();
    } catch (erro) {
        console.error("Erro ao ler o arquivo:", erro.message);
        process.exit(1);
    }
}

// Função para escrever o resultado em um arquivo txt
function escreverResultadoEmArquivo(caminhoArquivo, resultado) {
    try {
        fs.writeFileSync(caminhoArquivo, resultado, 'utf8');
        console.log("Resultado escrito em", caminhoArquivo);
    } catch (erro) {
        console.error("Erro ao escrever o arquivo:", erro.message);
        process.exit(1);
    }
}

// Caminhos dos arquivos de entrada e saída
const arquivoEntrada = 'entrada.txt'; // Substitua pelo caminho do seu arquivo de entrada
const arquivoSaida = 'saida.txt'; // Substitua pelo caminho desejado para o arquivo de saída

// Palavra a ser processada (lida do arquivo de entrada)
let palavraOriginal = lerPalavraDeArquivo(arquivoEntrada);
// Polinômio CRC: 11010
let polinomioCRC = "11010";

// Converte a palavra para bits
let palavraBinaria = stringParaBits(palavraOriginal);
console.log('palavra do arquivo = ' + palavraBinaria)
// Calcula o CRC
let crc = calcularCRC(palavraBinaria, polinomioCRC);
console.log('palavra do crc = ' + crc)

// Adiciona o CRC à palavra original
let palavraComCRC = palavraBinaria + crc;
console.log('palavra do final = ' + palavraComCRC)

// Escreve o resultado no arquivo de saída
escreverResultadoEmArquivo(arquivoSaida, palavraComCRC);
