export function httpErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return 'Dados inválidos. Verifique os campos e tente novamente.';
    case 401:
      return 'Email ou senha incorretos.';
    case 403:
      return 'Você não tem permissão para realizar esta ação.';
    case 404:
      return 'Recurso não encontrado.';
    case 409:
      return 'Conflito: o recurso já existe.';
    case 422:
      return 'Os dados enviados são inválidos.';
    case 429:
      return 'Muitas tentativas. Aguarde e tente novamente.';
    default:
      return 'Ocorreu um erro inesperado. Tente novamente.';
  }
}
