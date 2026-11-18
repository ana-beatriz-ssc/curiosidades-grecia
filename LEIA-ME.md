# Curiosidades da Grécia · 9º ano Tarde

Site: https://ana-beatriz-ssc.github.io/curiosidades-grecia/
Painel dos administradores: https://ana-beatriz-ssc.github.io/curiosidades-grecia/admin.html

## Como ligar o quiz à planilha (fazer uma vez só)

Os resultados do quiz (nome + acertos) ficam salvos numa planilha do Google.

1. Acesse **sheets.new** e crie uma planilha (ex.: "Resultados Quiz Grécia").
2. Na planilha, clique em **Extensões → Apps Script**.
3. Apague o que estiver lá e cole todo o conteúdo do arquivo `apps-script/Codigo.gs`.
4. Na linha `const SENHA_ADMIN = 'TROQUE_ESTA_SENHA';` troque pela senha dos administradores.
   ⚠️ Troque **só no Apps Script**. Não coloque a senha no GitHub.
5. Clique em **Salvar** (ícone de disquete).
6. Clique em **Implantar → Nova implantação**.
   - Em "Tipo", escolha **App da Web**.
   - **Executar como:** Eu.
   - **Quem pode acessar:** Qualquer pessoa.
   - Clique em **Implantar** e autorize com sua conta Google.
     (Se aparecer "O Google não verificou este app", clique em **Avançado → Acessar (não seguro)**. O script é seu.)
7. Copie a **URL do app da Web** (termina em `/exec`).
8. Abra o arquivo `config.js` e cole a URL entre as aspas:
   `window.QUIZ_API_URL = "https://script.google.com/macros/s/.../exec";`
9. Envie a alteração para o GitHub. Pronto!

## Dicas

- O painel atualiza sozinho a cada 20 segundos e permite baixar os resultados em CSV.
- Para zerar os resultados (ex.: nova turma), apague as linhas da aba **Resultados** na planilha (mantenha a linha 1).
- Se mudar o código do Apps Script, use **Implantar → Gerenciar implantações → Editar → Nova versão** para a URL continuar a mesma.
