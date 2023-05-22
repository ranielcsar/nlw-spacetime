Cápsula do tempo
---
Este projeto foi desenvolvido como parte do evento "Next Level Week" da Rocketseat e tem como propósito criar uma "Cápsula do Tempo" na qual os usuários podem salvar memórias, escrever sobre elas e adicionar fotos ou vídeos. A aplicação possui versões web e mobile, com login através do Github e funcionalidades para tornar as memórias públicas ou privadas.


### História

Como usuário, gostaria de uma aplicação web e mobile na qual eu possa salvar minhas memórias de vida. Com login através de uma rede social (Github, nesse caso), gostaria de ter a possibilidade de salvar uma foto ou vídeo, escrever sobre essa memória e também definir se ela será pública ou privada. Além disso, seria interessante que outras pessoas pudessem acessar facilmente as memórias, mesmo sem instalar a versão mobile, por isso, a aplicação web deve ser responsiva.


### Tecnologias

- **Web**
	- NextJS 13 (Incluindo nova pasta **app** e também **server components** do React 18)
	- React 18
	- Typescript
	- TailwindCSS
	- Axios

- **Mobile**
	- Expo
	- React native
	- Typescript
	- Native wind
	- Axios

- **Server**
	- Prisma
	- Node
	- Typescript
	- Fastify
	- Zod
	- Axios


### Funcionalidades

- **Web/Mobile**
	- Login com Github
	- Criação de memórias (apenas se estiver logado)
	- Listagem de memórias (apenas se estiver logado)

- **Server**
	- CRUD de memórias
	- Upload de imagens
	- Github OAuth


### Desafios e Melhorias Futuras:

- [ ] Deixar o layout da Web responsivo
- [ ] **Mobile/Web**
	- [ ] Criar página de detalhes da lembrança (ao clicar em ler mais)
	- [ ] Implementar edição e deleção de uma memória específica
	- [ ] Implementar o upload de vídeo (só funciona imagens por enquanto)
- [ ] **Server**
	- [ ] Implementar a rota de upload de vídeo (só funciona imagens por enquanto)
- [ ] Implementar testes
