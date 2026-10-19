# Nuxt 4 — Benefícios com MVVM

Exemplo didático de um dashboard de benefícios com **Nuxt 4, Vue 3, TypeScript, composables e uma API fake implementada no servidor Nitro do Nuxt**.

## Requisitos

- Node.js 20 ou superior (recomendado Node.js 22 LTS)
- npm

## Executar

```bash
npm install
npm run dev
```

Abra a URL indicada pelo Nuxt, normalmente `http://localhost:3000`.

## Funcionalidades

- Lista de benefícios carregada de `server/api/benefits`
- Filtro por nome, categoria e status
- Resumo com saldo total e quantidade de benefícios ativos
- Ativar/desativar um benefício (PATCH)
- Estado de carregamento e erros
- API fake em memória, sem banco de dados

> A API guarda alterações apenas em memória. Ao reiniciar o servidor, os dados voltam aos valores iniciais. É um mock para desenvolvimento, não uma API de produção.

## Organização

```text
app/
├── app.vue
├── assets/css/main.css
├── components/benefits/BenefitSummary.vue
├── composables/benefits/useBenefitsViewModel.ts
├── pages/benefits/index.vue
├── services/benefits/benefits.service.ts
└── types/benefits.ts
server/
├── api/benefits/
│   ├── index.get.ts
│   └── [id].patch.ts
└── utils/benefits-store.ts
```

## Como o MVVM aparece aqui

- **View:** `app/pages/benefits/index.vue` e componentes Vue.
- **ViewModel:** `app/composables/benefits/useBenefitsViewModel.ts`.
- **Service:** `app/services/benefits/benefits.service.ts`, responsável pelo HTTP.
- **Model/contratos:** `app/types/benefits.ts`.
- **API fake:** handlers Nitro em `server/api/benefits/`.
- **Persistência mock:** `server/utils/benefits-store.ts`, com dados em memória.

No Nuxt 4, `app/` contém o código da aplicação cliente e compartilhado com a interface; `server/` fica na raiz para código Nitro executado no servidor.

## Endpoints

| Método | Endpoint | Comportamento |
|---|---|---|
| GET | `/api/benefits` | Lista benefícios |
| PATCH | `/api/benefits/:id` | Atualiza `active` |

Exemplo de `PATCH`:

```json
{
  "active": false
}
```

## Decisões intencionais

- O composable usa `useAsyncData` para aproveitar SSR/hidratação e manter o estado da requisição.
- Os filtros e os totais são `computed`, derivados da lista recebida.
- A API valida a entrada e responde com status HTTP apropriados.
- Não foi incluído Pinia: o estado pertence a esta funcionalidade e não precisa ser global.
- Não foi adicionada biblioteca de UI; a interface usa CSS simples para manter o exemplo fácil de executar.

## Próximos passos possíveis

- Trocar a store em memória por banco de dados.
- Adicionar testes unitários com Vitest.
- Adicionar autenticação e autorização.
- Extrair regras de domínio para funções puras quando as regras de negócio crescerem.
# nuxt4-mvvm
