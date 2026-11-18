<div align="center">

<img src="img/logo-colegio.jpeg" alt="Brasão do Colégio Integrado Santo André" width="140">

# Curiosidades da Grécia

**Site educativo e responsivo com quiz individual e painel de resultados**

Projeto desenvolvido para a apresentação dos alunos do 9º ano (turma da tarde) do Colégio Integrado Santo André.

[Acessar o site](https://ana-beatriz-ssc.github.io/curiosidades-grecia/) ·
[Painel dos administradores](https://ana-beatriz-ssc.github.io/curiosidades-grecia/admin.html)

![HTML5](https://img.shields.io/badge/HTML5-0f2350?style=flat-square&logo=html5&logoColor=f3e6c2)
![CSS3](https://img.shields.io/badge/CSS3-0f2350?style=flat-square&logo=css3&logoColor=f3e6c2)
![JavaScript](https://img.shields.io/badge/JavaScript-0f2350?style=flat-square&logo=javascript&logoColor=f3e6c2)
![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-0f2350?style=flat-square&logo=google&logoColor=f3e6c2)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-0f2350?style=flat-square&logo=github&logoColor=f3e6c2)

</div>

---

## Sobre o projeto

O site reúne seis curiosidades sobre a Grécia Antiga e a Grécia atual, cada uma com imagem, explicação e um quadro de apoio para aprender um pouco mais. Ao final, os visitantes podem jogar um quiz de verdadeiro ou falso. Cada participante joga sua própria rodada e o resultado é salvo automaticamente em uma planilha do Google, que alimenta um painel exclusivo para os administradores.

A identidade visual usa tons de branco, azul e dourado, inspirados nas cores da Grécia e no brasão da escola.

## Funcionalidades

**Curiosidades**
- Carrossel com seis cartões: no celular, o usuário desliza para o lado; no computador, navega pelas setas ou pelo teclado.
- Indicadores de posição e contador ("1 de 6").
- Comparação entre estátuas em mármore e suas reconstituições coloridas.
- Layout pensado para projeção em sala de aula.

**Quiz individual**
- O participante informa o nome antes de começar.
- Uma pergunta por vez, com barra de progresso e contagem de acertos em tempo real.
- Explicação após cada resposta.
- Tela final com o total de acertos em destaque.
- Envio automático do resultado, com opção de tentar novamente em caso de falha na internet.
- Botão "Novo participante" para a próxima pessoa jogar no mesmo aparelho.

**Painel dos administradores**
- Acesso protegido por senha (validada no servidor, nunca exposta no código público).
- Ranking com nome, data, hora e pontuação de cada participante.
- Resumo com total de participantes, média de acertos e quantos acertaram tudo.
- Busca por nome e ordenação por ranking ou por mais recentes.
- Atualização automática a cada 20 segundos.
- Exportação dos resultados em CSV, compatível com Excel.

## Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Interface | HTML, CSS e JavaScript puros, sem frameworks |
| Tipografia | Google Fonts (Cinzel e Nunito) |
| Banco de dados | Google Sheets |
| API | Google Apps Script (Web App) |
| Hospedagem | GitHub Pages |

## Como funciona

```
 Participante                 Google Apps Script            Google Sheets
 (index.html)                 (apps-script/Codigo.gs)       (aba "Resultados")
      |                               |                            |
      |-- POST nome e acertos ------->|-- valida e grava linha --->|
      |                               |                            |
 Administrador                        |                            |
 (admin.html)                         |                            |
      |-- GET com senha ------------->|-- confere senha e lê ----->|
      |<------------- lista de resultados em JSON -----------------|
```

O site é estático. Toda a parte que precisa guardar dados fica no Google Apps Script, que funciona como uma pequena API gratuita ligada à planilha.

## Estrutura de pastas

```
curiosidades-grecia/
├── index.html            Página principal: curiosidades e quiz
├── admin.html            Painel dos administradores
├── config.js             Endereço da API do Apps Script
├── apps-script/
│   └── Codigo.gs         Código do servidor (colar no Apps Script)
└── img/                  Imagens das curiosidades e brasão da escola
```

## Como usar este projeto

Siga os passos abaixo para publicar sua própria versão.

### 1. Copie o repositório

Clique em **Fork** no topo desta página ou baixe o projeto em **Code > Download ZIP**.

### 2. Publique o site no GitHub Pages

1. No seu repositório, acesse **Settings > Pages**.
2. Em **Branch**, selecione `main` e a pasta `/(root)`.
3. Clique em **Save**. Em alguns minutos o site estará disponível em `https://seu-usuario.github.io/nome-do-repositorio/`.

Neste ponto as curiosidades já funcionam. Os próximos passos ativam o registro dos resultados do quiz.

### 3. Crie a planilha e a API

1. Acesse [sheets.new](https://sheets.new) e crie uma planilha.
2. Na planilha, abra **Extensões > Apps Script**.
3. Apague o conteúdo do editor e cole todo o código de [`apps-script/Codigo.gs`](apps-script/Codigo.gs).
4. Na linha abaixo, substitua o texto pela senha dos administradores:
   ```js
   const SENHA_ADMIN = 'TROQUE_ESTA_SENHA';
   ```
   Altere a senha somente no editor do Apps Script. Não envie a senha real para o GitHub, pois o repositório é público.
5. Salve o projeto.
6. Clique em **Implantar > Nova implantação** e configure:
   - **Tipo:** App da Web
   - **Executar como:** Eu
   - **Quem pode acessar:** Qualquer pessoa
7. Clique em **Implantar** e autorize o acesso com sua conta Google. Se aparecer o aviso "O Google não verificou este app", clique em **Avançado** e depois em **Acessar**.
8. Copie a **URL do app da Web**, que termina em `/exec`.

### 4. Conecte o site à planilha

Abra o arquivo `config.js` e cole a URL entre as aspas:

```js
window.QUIZ_API_URL = "https://script.google.com/macros/s/SEU_CODIGO/exec";
```

Envie a alteração para o GitHub. A aba **Resultados** é criada automaticamente na planilha quando o primeiro participante terminar o quiz.

### 5. Teste

1. Abra o site, jogue o quiz até o fim e confira a mensagem "Resultado registrado".
2. Abra `admin.html`, digite a senha e verifique se o participante aparece na lista.

## Personalização

| O que mudar | Onde |
| --- | --- |
| Textos e imagens das curiosidades | Blocos `<article class="card">` em `index.html` |
| Perguntas do quiz | Lista `questions` no script de `index.html` (`q` é a pergunta, `a` é a resposta e `f` é a explicação) |
| Cores | Variáveis no início do `<style>` (`--navy`, `--gold`, `--blue` e outras) |
| Senha do painel | Constante `SENHA_ADMIN` no editor do Apps Script |

O total de perguntas é calculado automaticamente, então é possível adicionar ou remover perguntas sem alterar mais nada.

## Manutenção

- **Zerar os resultados:** apague as linhas da aba **Resultados** na planilha, mantendo a primeira linha (cabeçalho).
- **Alterar o código do Apps Script:** use **Implantar > Gerenciar implantações > Editar > Nova versão**. Assim a URL continua a mesma.
- **Alterar o `config.js`:** aumente o número da versão em `config.js?v=2` nos arquivos `index.html` e `admin.html` (por exemplo, para `v=3`). Isso faz os navegadores baixarem a versão nova em vez de usar a cópia guardada.

## Segurança e limitações

- A senha do painel fica apenas no Google Apps Script e é conferida no servidor.
- O servidor valida os dados recebidos (tamanho do nome e pontuação dentro do limite) e impede que nomes sejam interpretados como fórmulas na planilha.
- Como o site é público, alguém com conhecimento técnico poderia enviar uma pontuação manualmente. Para uso escolar esse risco é aceitável. Para competições com premiação, recomenda-se um sistema com login.

## Créditos

- Conteúdo e apresentação: alunos do 9º ano, turma da tarde, do Colégio Integrado Santo André.
- Desenvolvimento: [Ana Beatriz](https://github.com/ana-beatriz-ssc).
- As imagens foram usadas para fins exclusivamente educacionais e os direitos pertencem aos respectivos autores.
