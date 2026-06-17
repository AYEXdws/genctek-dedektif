import React from "react";
import MissionFile from "./MissionFile";
import { missionFiles } from "../data/chain";

export default function GateTraceScreen({ onBack }) {
  return (
    <section className="chain-home trace-only">
      <div className="chain-card trace-card">
        <div className="chain-card-heading">
          <span>İLK İZ / DOĞRULANDI</span>
          <h1>Kapı adını buldun.</h1>
        </div>

        <MissionFile file={missionFiles.source} />

        <div className="trace-copy">
          <p>
            Harflerin arasından çıkan kelime artık sadece bir cevap değil,
            Dedektif. O kelime, bu sitenin görünür yüzünde henüz açılmamış
            sessiz bir oda gibi duruyor.
          </p>
          <p>
            Bazı kapılar butonla açılmaz. Adres satırı, doğru iz bırakıldığında
            yeni bir yüz gösterir. Bulduğun kelimeyi yanında tut; onu yolun
            sonuna taşımanın zamanı geldi.
          </p>
          <p className="subtle-clue">
            Sıradaki yüz bilgisayarda daha rahat okunur. Çünkü orada ekranda
            görünen değil, ekranı oluşturan satırlar konuşur.
          </p>
        </div>

        <button className="secondary-button" onClick={onBack} type="button">
          Şifreye Geri Dön
        </button>
      </div>
    </section>
  );
}
