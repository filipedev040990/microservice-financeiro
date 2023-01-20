# Salvar dados do pagamento

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/payments**
2. ✅ Valida dados obrigatórios **Pessoa**
3. ✅ Valida dados do cartão de crédito **Cartão de crédito**
4. ✅ **Salva** os dados fornecidos
5. ✅ Cria dados do pagamento

> ## Exceções
1. ✅ Retorna **400** se  cliente já existir (validar pelo documento)
2. ✅ Retorna **400** se  dados de **Pessoa** não forem fornecidos pelo client
3. ✅ Retorna **400** se  dados de  **Cartão de crédito** não forem fornecidos pelo client
4. ✅ Retorna **500** se der erro ao tentar salvar os dados


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
Status (waiting, processing, confirmed, refused, canceled)
Valor
attempts_processing
produto (curso)

✅
⛔