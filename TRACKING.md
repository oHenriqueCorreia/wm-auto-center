# Rastreamento no Google Tag Manager

O site carrega o contêiner **GTM-T9W4442K**. Os cliques e a reprodução do vídeo são enviados para `window.dataLayer` como eventos personalizados. O código do site não depende de uma tag do Google Ads para funcionar; as tags e os acionadores devem ser criados e publicados no contêiner.

## Eventos disponíveis

| Evento | Quando ocorre | Dados adicionais |
| --- | --- | --- |
| `wm_click` | Clique em links e botões do site | `click_type`, `click_label`, `click_section`, `service_name` |
| `wm_faq_open` | Uma pergunta do FAQ é aberta | `faq_question` |
| `wm_video_start` | A reprodução do vídeo da história começa pela primeira vez | `video_name` |
| `wm_video_complete` | O vídeo chega ao fim | `video_name` |

Todos os eventos incluem `page_path`, `utm_source`, `utm_medium` e `utm_campaign` quando esses parâmetros estiverem na URL. Os valores de `click_type` são `whatsapp`, `telefone`, `mapa`, `avaliacoes`, `instagram`, `navegacao`, `menu` e `outro`. Nos botões dos serviços, `service_name` identifica o serviço solicitado. Nos demais cliques, esse campo é vazio.

Exemplo de clique no orçamento de pneus:

```js
{
  event: 'wm_click',
  click_type: 'whatsapp',
  click_label: 'Pedir orçamento de pneus no WhatsApp',
  click_section: 'servicos',
  service_name: 'Pneus',
  page_path: '/',
  utm_source: '',
  utm_medium: '',
  utm_campaign: ''
}
```

## Configuração no contêiner

1. Em **Variáveis**, crie variáveis da camada de dados (versão 2) com os nomes exatos `click_type`, `click_label`, `click_section`, `service_name`, `page_path`, `utm_source`, `utm_medium` e `utm_campaign`.
2. Em **Acionadores**, crie um acionador de **Evento personalizado** com o nome de evento `wm_click`. Para medir somente contatos pelo WhatsApp, adicione a condição `{{click_type}}` igual a `whatsapp`. Crie outro com `telefone` se quiser medir ligações separadamente.
3. Associe o acionador à tag de evento do GA4 ou à tag de conversão do Google Ads da campanha. Na tag, envie `click_section` e `service_name` como parâmetros para saber qual parte do site gerou o contato. Para Google Ads, use o ID e o rótulo de conversão da sua conta.
4. Para medir o vídeo, crie acionadores de Evento personalizado para `wm_video_start` e `wm_video_complete`. O FAQ usa `wm_faq_open`.
5. Teste com **Visualizar / Tag Assistant**: clique em um botão de orçamento e confira o evento `wm_click` com `click_type = whatsapp`. Depois publique o contêiner.

Um clique no WhatsApp representa intenção de contato; ele não confirma que a conversa foi enviada nem que houve uma venda. Para evitar contagem duplicada nas campanhas, escolha uma única fonte para cada conversão: tag direta do Google Ads ou importação de um evento do GA4.
