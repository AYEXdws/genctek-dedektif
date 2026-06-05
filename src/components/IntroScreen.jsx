import React from "react";
import heroImage from "../assets/hero.png";

export default function IntroScreen({ onStart }) {
  return (
    <section className="intro-screen">
      <div className="archive-orbit" aria-hidden="true">
        <img src={heroImage} alt="" />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="intro-copy">
        <p className="eyebrow">GENÇTEK ARŞİVİ</p>
        <h1>Kritik Durum Tespit Edildi</h1>
        <div className="status-lines">
          <p>Özel Teknoloji Paketi Parçalandı</p>
          <p>4 Veri Parçası Kayıp</p>
          <p>Arşiv Bütünlüğü: %25</p>
          <p>Dijital Dedektif Protokolü Başlatılıyor...</p>
        </div>
        <button className="primary-button" onClick={onStart} type="button">
          GÖREVİ BAŞLAT
        </button>
      </div>
    </section>
  );
}
