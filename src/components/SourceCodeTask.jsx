import React from "react";

export default function SourceCodeTask({ task }) {
  return (
    <div className="source-code-task">
      <section className="source-brief">
        <span>Kaynak katmanını incele</span>
        <p>
          Aşağıdaki bağlantı GençTek'in görünen yüzünü açar. Asıl iz bu
          yüzeyde değil, sayfayı oluşturan kaynak satırlarının arasında
          saklıdır. Bu işlem PC ekranında daha rahat yapılır; stant cihazını
          kullanarak kaynak katmanını daha net inceleyebilirsin.
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
        <span>Kaynak katmanı nasıl açılır?</span>
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
          Alternatif: Tarayıcı menüsünden veya sağ tık menüsünden{" "}
          <strong>Sayfa Kaynağını Görüntüle</strong> seçeneğini aç. Ardından
          kaynak kodda gizli bırakılmış veri izini ara.
        </p>
      </section>
    </div>
  );
}
