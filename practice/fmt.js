// 답 텍스트 → HTML: **굵게**, "| a | b |" 줄은 표로
function fmt(text) {
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  let html = '', rows = [];
  const flush = () => {
    if (!rows.length) return;
    html += '<table>' + rows.map((r, i) => '<tr>' + r.map(c => i ? `<td>${esc(c)}</td>` : `<th>${esc(c)}</th>`).join('') + '</tr>').join('') + '</table>';
    rows = [];
  };
  for (const line of (text || '').split('\n')) {
    if (line.startsWith('| ') && line.endsWith(' |')) { rows.push(line.slice(2, -2).split(' | ')); continue; }
    flush();
    html += `<div>${esc(line) || '&nbsp;'}</div>`;
  }
  flush();
  return html;
}

// 원본 PDF는 로컬에만 있으므로(.gitignore) 로컬에서 열었을 때만 링크 표시
const pdfLink = d => d.page && location.protocol === 'file:' ? ` · <a href="정처기.pdf#page=${d.page}" target="_blank">원본 p.${d.page}</a>` : '';
