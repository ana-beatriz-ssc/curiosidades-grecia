/**
 * Backend do quiz "Curiosidades da Grécia".
 * Cole este código em Extensões → Apps Script da planilha de resultados.
 *
 * IMPORTANTE: troque a senha abaixo SOMENTE no editor do Apps Script.
 * Não coloque a senha verdadeira no GitHub (o repositório é público).
 */
const SENHA_ADMIN = 'TROQUE_ESTA_SENHA';
const ABA = 'Resultados';

function aba_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(ABA);
  if (!sh) {
    sh = ss.insertSheet(ABA);
    sh.appendRow(['Data/hora', 'Nome', 'Acertos', 'Total']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Recebe o resultado de cada participante (enviado pelo site).
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    let nome = String(d.nome || '').trim().replace(/\s+/g, ' ').slice(0, 40);
    const acertos = Number(d.acertos);
    const total = Number(d.total);
    const valido = nome.length >= 2 &&
      Number.isInteger(acertos) && Number.isInteger(total) &&
      total >= 1 && total <= 50 && acertos >= 0 && acertos <= total;
    if (!valido) return json_({ ok: false, erro: 'dados inválidos' });

    // Evita que um "nome" vire fórmula na planilha.
    if (/^[=+\-@]/.test(nome)) nome = "'" + nome;

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      aba_().appendRow([new Date(), nome, acertos, total]);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, erro: String(err) });
  }
}

// Lista os resultados para o painel dos administradores (exige senha).
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.senha !== SENHA_ADMIN) return json_({ ok: false, erro: 'senha' });

  const linhas = aba_().getDataRange().getValues().slice(1);
  const resultados = linhas
    .filter(r => r[1] !== '')
    .map(r => ({
      data: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
      nome: String(r[1]),
      acertos: Number(r[2]),
      total: Number(r[3])
    }));
  return json_({ ok: true, resultados });
}
