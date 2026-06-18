import React from "react";

export default function PhysicalTraceScreen({ onBack }) {
  return (
    <section className="chain-home task-chain-stage">
      <div className="chain-card physical-trace-card">
        <div className="chain-card-heading">
          <span>GÖREV 4 / Üç Boyutlu İz</span>
          <h1>DİJİTALİN CİSMİ</h1>
        </div>

        <div className="trace-copy physical-final-copy">
          <p>Tebrikler Dedektif!</p>
          <p>
            Sistem yöneticisinin hesabına erişerek son mesaja ulaştın. Ancak
            aradığın veri artık dijital ortamda değil...
          </p>
          <p>
            Son veri parçasını ağdan kaldırdım. Onu ekranlarda değil, gerçek
            dünyada ara.
          </p>
          <p>
            Araştırmanın bundan sonraki kısmında çevrendeki ipuçlarına dikkat
            etmelisin.
          </p>
          <p>Teknolojinin üretime dönüştüğü alanları incele.</p>
          <p>Bazı bilgiler yalnızca dikkatli gözlerden saklanamaz.</p>
          <p>Bazen bir nesne, göründüğünden fazlasını barındırır.</p>
          <p>
            Son veri parçasını bulduğunda görevin tamamlanacak ve kurtarılan
            büyük veriye erişeceksin.
          </p>
          <p>Veri kaybolmadı sadece yer değiştirdi</p>
        </div>

        <button className="secondary-button" onClick={onBack} type="button">
          Kimlik İzlerine Dön
        </button>
      </div>
    </section>
  );
}
