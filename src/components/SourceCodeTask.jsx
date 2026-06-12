import React from "react";

export default function SourceCodeTask({ task }) {
  return (
    <div className="source-code-task">
      <section className="source-brief">
        <span>Bu görev bilgisayar üzerinden yapılmalıdır.</span>
        <p>
          Aşağıdaki bağlantı seni GençTek'in görünen yüzüne götürecek.
          Sayfa ilk bakışta sıradan görünebilir. Asıl iz, ekranda değil;
          kaynak kodunun içinde saklı.
        </p>
        <a
          className="source-open-button"
          href={task.sourceUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          KAYNAK KATMANI SAYFASINI AÇ
        </a>
      </section>

      <section className="source-method" aria-label="Kaynak kodunu görüntüleme yöntemi">
        <span>Nasıl bakılır?</span>
        <div className="method-grid">
          <div>
            <strong>Windows / Linux</strong>
            <kbd>Ctrl</kbd>
            <b>+</b>
            <kbd>U</kbd>
          </div>
          <div>
            <strong>Mac</strong>
            <kbd>⌘</kbd>
            <b>+</b>
            <kbd>Option</kbd>
            <b>+</b>
            <kbd>U</kbd>
          </div>
        </div>
        <p>
          Alternatif: Sağ tık yap, <strong>Sayfa Kaynağını Görüntüle</strong>
          seçeneğini aç. Ardından kaynak kodda gizli bırakılmış dedektif notunu ara.
        </p>
      </section>
    </div>
  );
}
