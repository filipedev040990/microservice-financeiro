# Atualizar status do pagamento

> ## Caso de sucesso

1. ⛔ Deve consumir a fila 'payments_processeds'
2. ⛔ Atualiza o status para 'paid' se pagamento foi autorizado
3. ⛔ Atualiza o status para 'waiting' se pagamento foi recusado

> ## Exceções
1. ⛔ Salva um log se der erro ao tentar processar o pagamento

✅
⛔