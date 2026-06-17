import React from "react";
import MissionFile from "./MissionFile";
import { missionFiles } from "../data/chain";

export default function PhysicalTraceScreen({ onBack }) {
  return (
    <section className="chain-home task-chain-stage">
      <div className="chain-card physical-trace-card">
        <div className="chain-card-heading">
          <span>GÖREV 4 / Üç Boyutlu İz</span>
          <h1>DİJİTALİN CİSMİ</h1>
        </div>

        <MissionFile file={missionFiles.physical} />

        <div className="trace-copy physical-final-copy">
          <p>Tebrikler Dedektif!</p>
          <p>
            Sistem yöneticisinin hesabına erişerek son mesaja ulaştın. Ancak
            aradığın veri artık dijital ortamda değil...
          </p>
          <blockquote>
            Son veri parçasını ağdan kaldırdım. Onu ekranlarda değil, gerçek
            dünyada ara.
          </blockquote>
          <p>
            Araştırmanın bundan sonraki kısmında çevrendeki ipuçlarına dikkat
            etmelisin.
          </p>
          <ul className="trace-clue-list">
            <li>Teknolojinin üretime dönüştüğü alanları incele.</li>
            <li>Bazı bilgiler yalnızca dikkatli gözlerden saklanamaz.</li>
            <li>Bazen bir nesne, göründüğünden fazlasını barındırır.</li>
          </ul>
          <p>
            Son veri parçasını bulduğunda görevin tamamlanacak ve kurtarılan
            büyük veriye erişeceksin.
          </p>
          <p className="subtle-clue">Veri kaybolmadı, sadece yer değiştirdi.</p>
        </div>

        <div className="success-panel">
          <span>SON DOSYA AÇILDI</span>
          <h2>Kırmızı Mühür artık ekrandan çıkıp üretim masasına taşındı.</h2>
          <p>
            Bundan sonrası cevap alanında değil; doğru nesneye, doğru açıya ve
            dikkatli bakışa emanet.
          </p>
        </div>

        <button className="secondary-button" onClick={onBack} type="button">
          Kimlik İzlerine Dön
        </button>
      </div>
    </section>
  );
}
