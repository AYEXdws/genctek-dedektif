import React from "react";
import BadgeCreator from "./BadgeCreator";

export default function MasterDetectivePage({
  badge,
  onCreateBadge,
  onReset,
  savedName
}) {
  return (
    <main className="app-shell chain-shell">
      <button className="reset-button" onClick={onReset} type="button">
        Baştan Başla
      </button>

      <section className="chain-page master-page">
        <div className="chain-card final-arrival">
          <span>SON KAPI / Usta Dedektif</span>
          <h1>TEBRİKLER</h1>
          <h2>Kırmızı Mühür Operasyonu tamamlandı.</h2>
          <div className="chain-copy">
            <p>Tüm izleri takip ettin.</p>
            <p>Şifreli kapıyı açtın.</p>
            <p>Görünmeyen yüzü okudun.</p>
            <p>Kırmızı ipli karttaki kimlik izlerini çözdün.</p>
            <p>Son verinin üç boyutluya dönüştüğü yere ulaştın.</p>
            <p>Artık Usta Dedektif Belgeni oluşturabilirsin.</p>
          </div>
        </div>

        <BadgeCreator
          badge={badge}
          onCreateBadge={onCreateBadge}
          savedName={savedName}
        />
      </section>
    </main>
  );
}
