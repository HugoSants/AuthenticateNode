# Node_authentication

API de autenticação com **Node.js + Express**, usando **JWT** para geração/validação de tokens e **bcrypt** para hash de senhas. Persistência via **Prisma ORM**.

<p align="left">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="Express Logo" width="200"/>
  <img src="https://cdn.worldvectorlogo.com/logos/jwt-3.svg" alt="JWT Logo" width="50" height="50"/>
</p>

---

## Requisitos

- Node.js (recomendado LTS)
- npm
- Um banco de dados configurado para uso com Prisma (ex.: PostgreSQL, MySQL, SQLite etc.)

---

## Configuração (.env)

Crie um arquivo **.env** na raiz do projeto com as variáveis abaixo:

```.env
DATABASE_URL="your database URL"
PORT=your door
JWT_SECRET=add the key you created
```

### O que significa cada variável?

- **DATABASE_URL**: string de conexão do seu banco (formato depende do provedor).
- **PORT**: porta onde a API vai rodar (ex.: `3000`).
- **JWT_SECRET**: chave usada para assinar/verificar o token JWT (use uma chave forte).

> Dica: não versione o arquivo `.env` (adicione em `.gitignore`).

---

## Criar a aplicação

```.
npm init -y
```

---

## Instalar dependências necessárias

```.
npm install express dotenv bcrypt jsonwebtoken
```

### Para que servem?

- **express**: framework HTTP para criar rotas e middlewares.
- **dotenv**: carrega variáveis do `.env` para `process.env`.
- **bcrypt**: hash e verificação de senhas com segurança.
- **jsonwebtoken**: criação e validação de tokens JWT.

---

## Prisma installation

```.
npm install prisma @prisma/client
```

- **prisma**: CLI e ferramentas do Prisma (migrations, init, etc.)
- **@prisma/client**: cliente gerado para acessar o banco via Prisma

---

## Inicializando o Prisma

```.
npx prisma init
```

Isso cria (entre outros):
- a pasta `prisma/`
- o arquivo `prisma/schema.prisma`
- ajustes iniciais para conexão com `DATABASE_URL`

---

## Criar Tabelas no Banco de Dados

```.
npx prisma migrate dev --name init
```

Isso:
- cria/atualiza migrations
- aplica as mudanças no banco
- atualiza o Prisma Client

### Ou sincronizar o banco sem criar migrações:

```.
npx prisma db push
```

Use quando você quer refletir o `schema.prisma` no banco **sem** manter histórico de migrations.

---

## Executar o projeto

Depois disso, é só iniciar a aplicação com Node:

```.
node name_file.js
```

> Substitua `name_file.js` pelo arquivo principal (ex.: `index.js`, `server.js`, `app.js`).

---

## Fluxo de autenticação (visão geral)

1. **Cadastro/Registro**
   - Recebe credenciais (ex.: email/senha)
   - Faz hash da senha com `bcrypt`
   - Salva usuário no banco com Prisma

2. **Login**
   - Busca usuário no banco
   - Verifica senha com `bcrypt.compare`
   - Gera um token JWT com `jsonwebtoken`

3. **Rotas protegidas**
   - Cliente envia `Authorization: Bearer <token>`
   - Middleware valida token e libera acesso

---

## Boas práticas recomendadas

- Utilize um **JWT_SECRET** longo e difícil de adivinhar.
- Nunca armazene senhas em texto puro; sempre com **bcrypt**.
- Prefira validar entradas (ex.: email/senha) antes de salvar/autenticar.
- Se possível, use expiração curta para tokens e estratégia de refresh token (quando aplicável).

---

## Troubleshooting

### Erro de conexão com banco
- Confira `DATABASE_URL` no `.env`
- Verifique se o banco está online e acessível
- Rode novamente:
  - `npx prisma migrate dev --name init` **ou**
  - `npx prisma db push`

### Porta em uso
- Altere o valor de `PORT` no `.env`

