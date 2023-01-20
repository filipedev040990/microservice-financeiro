# Salvar dados do pagamento

> ## Caso de sucesso

1. ✅ Pega os pagamentos com status 'waiting' na tabela payments e envia para o 'gateway' processar
2. ✅ Atualiza o status para 'processing' e incrementa o campo attempts_processing
3. ✅ Atualiza o status para 'confirmed' e publica mensagem na fila 'payment_confirmed' em caso de sucesso
4. ✅ Atualiza o status para 'waiting' novamente em caso de erro e incrementa o campo attempts_processing
5. ✅ Atualiza o status para 'refused' novamente em caso de reprovação
6. ✅ Tenta processar o pagamento 3 vezes, se não der certo, muda o status para 'canceled'

> ## Exceções
1. ✅ Retorna **500** se der erro ao tentar processar o pagamento


> ## Objeto Pessoa
Tipo de Pessoa
Nome Completo
E-mail
CPF
Telefone
CEP
Logradouro
Número 
Complemento
Bairro 
Cidade 
Estado 

> ## Objeto Cartão de crédito
Nome do Titular
Número do Cartão
Mês 
Ano
CVV
Número de Parcelas

> ## Dados do pagamento
ID
ID do cliente
Status (waiting, processing, confirmed, refused)
Valor
attempts_processing

✅
⛔