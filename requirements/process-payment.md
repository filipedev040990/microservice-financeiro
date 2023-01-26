# Salvar dados do pagamento

> ## Caso de sucesso

1. ✅ Pega os pagamentos com status 'waiting' na tabela payments
2. ✅ Atualiza o status para 'processing' e incrementa o campo attempts_processing
3. ✅ Coloca em uma fila para o 'gateway' processar (payments_processing)
4. ⛔ Atualiza o status para 'confirmed' e publica mensagem na fila 'payment_confirmed' em caso de sucesso
5. ⛔ Atualiza o status para 'waiting' novamente em caso de erro e incrementa o campo attempts_processing
6. ⛔ Atualiza o status para 'refused' novamente em caso de reprovação
7. ✅ Tenta processar o pagamento 3 vezes, se não der certo, muda o status para 'canceled'

> ## Exceções
1. ✅ Salva um log se der erro ao tentar processar o pagamento


> ## Objeto a ser enviado para a fila
{
    "client": {
    "id": "2056d848-3482-4585-87dc-02f2cb827552",
    "holder_name": "Zé das Couves,
    "email": "zedascouves@gmail.com",
    "person_type": "pf",
    "document": "123456789"
    },
    "card" {
        number: "132456798798",
        "brand": "visa",
        cvv: "132",
        "month": "05",
        year: "2025"
    },
    "payment": {
        "installments": "value
    }
}

✅
⛔