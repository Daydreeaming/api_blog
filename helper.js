/**
 *  Grupo 1. Questão 1
    Crie uma função que receba um código de três digitos e retorne o nome do banco,
    o nome retornado não deve conter as palavras S.A., (antigo), (Brasil), Holding. 
    Leia as instruções para entender como os códigos de bancos são representados.

    // função (codigo) -> string
    // remover S.A., (antigo), (Brasil), Holding
 */


/**
 * 2. Crie uma função que remova quaisquer caracteres
 * que não seja número dentro de uma string.
 * O retorno deve ser uma string.
 */

const limpaTexto = (texto) => {
  let textoTransformado = texto;

  while (textoTransformado.indexOf(".") !== -1) {
    textoTransformado = textoTransformado.replace(".", "");
  }

  while (textoTransformado.indexOf("-") !== -1) {
    textoTransformado = textoTransformado.replace("-", "");
  }

  return textoTransformado;
};

const formatarEmail = (email) => {
  const formatado = email.trim();
  return formatado
}


module.exports = {
  limpaTexto: limpaTexto,
  formatarEmail: formatarEmail,
};
