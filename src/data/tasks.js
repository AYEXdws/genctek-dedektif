import { caesarEncrypt } from "../utils/crypto";

export const taskAreas = [
  "Kriptografi",
  "Kaynak Katmanı",
  "Dijital İz Analizi",
  "Algoritma ve Yazılım"
];

export const sourceFiles = {
  "system.log": [
    "[09:14] Sistem başlatıldı",
    "[09:16] Arşiv bağlantısı kontrol edildi",
    "[09:18] Veri parçası bulunamadı"
  ],
  "archive.cache": [
    "[10:02] Önbellek tarandı",
    "[10:04] Eski kayıtlar temizlendi",
    "[10:05] Veri parçası bulunamadı"
  ],
  "users.tmp": [
    "[11:20] Geçici kullanıcı oturumu",
    "[11:23] Yetki seviyesi: ziyaretçi",
    "[11:24] Veri parçası bulunamadı"
  ],
  "source.layer": [
    "[12:40] Görünmeyen katman açıldı",
    "[12:41] Kanıt doğrulandı",
    "[12:42] Bayrak: GençTek{Kaynak_Katmani}"
  ]
};

export const tasks = [
  {
    id: "crypto-trace",
    title: "Görev 1 — Kripto İz",
    area: "Kriptografi",
    panelTitle: "Kripto Çözümleme Paneli",
    description:
      "İlk veri parçası şifrelenmiş durumda. Türk alfabesine göre uygulanan şifreleme yöntemini çözerek orijinal mesajı bul.",
    guide: {
      purpose: "Şifreli veriyi çöz.",
      why: "İlk veri parçası kripto katmanında korunuyor.",
      how: "Sezar şifrelemesi yöntemini incele.",
      result: "Veri Parçası 1 kurtarılacak."
    },
    encryptedLabel: "Şifrelenmiş veri",
    encryptedText: caesarEncrypt("GENÇTEK", 3),
    shiftText: "Sezar şifrelemesi",
    placeholder: "Orijinal mesaj",
    answerType: "crypto",
    flag: "GençTek{Kripto_Iz}",
    recoveredText: "VERİ PARÇASI 1 KURTARILDI",
    hint: "Türk alfabesinde her harf 3 adım ileri alınmış. Aynı yolu geriye doğru takip et."
  },
  {
    id: "source-layer",
    title: "Görev 2 — Kaynak Katmanı",
    area: "Kaynak Katmanı",
    panelTitle: "Kaynak Katmanı Tarayıcısı",
    description:
      "İkinci veri parçası görünür ekranda bulunamadı. Sistem kayıtlarını inceleyerek veri parçasının izini sür.",
    guide: {
      purpose: "Sistem kayıtları arasında gizli veri parçasını bul.",
      why: "İkinci veri parçası görünür ekranda değil, kaynak katmanında saklı.",
      how: "Kayıt dosyalarını aç, 'Bayrak:' satırındaki değeri cevap alanına aynen yaz. Örn: GençTek{Ornek_Bayrak}.",
      result: "Veri Parçası 2 kurtarılacak."
    },
    placeholder: "Örn: GençTek{Ornek_Bayrak}",
    answerType: "source",
    flag: "GençTek{Kaynak_Katmani}",
    recoveredText: "VERİ PARÇASI 2 KURTARILDI",
    hint: "Doğru kayıtta 'Bayrak:' satırını bul. Cevap olarak sadece süslü parantezli bayrak değerini aynen yazmalısın."
  },
  {
    id: "digital-trace",
    title: "Görev 3 — Dijital İz Analizi",
    area: "Dijital İz Analizi",
    panelTitle: "Kanıt Panosu",
    description:
      "Üçüncü veri parçası küçük dijital izlerin birleşiminde saklı. Bilgileri dikkatle incele ve doğru sonuca ulaş.",
    guide: {
      purpose: "Küçük dijital izlerden doğru anahtarı oluştur.",
      why: "Üçüncü veri parçası profil kayıtlarının içinde saklı.",
      how: "Favori gezegen ve proje numarası bilgisini birleştir.",
      result: "Veri Parçası 3 kurtarılacak."
    },
    placeholder: "Gezegen_87",
    exampleFormat: "Gezegen_87",
    answerType: "trace",
    flag: "GençTek{Saturn_42}",
    recoveredText: "VERİ PARÇASI 3 KURTARILDI",
    hint: "Favori gezegeni İngilizce düşün, alt çizgi kullan ve proje ID'sindeki sayıyı ekle.",
    profile: {
      "Personel": "Eren Yılmaz",
      "Proje ID": "GT-42",
      "Favori Gezegen": "Satürn",
      "Son Giriş": "19:06"
    }
  },
  {
    id: "algorithm-path",
    title: "Görev 4 — Hatalı Kodun Peşinde",
    area: "Algoritma ve Yazılım",
    panelTitle: "Algoritma Simülasyonu",
    description:
      "Son veri parçası bozuk bir algoritma nedeniyle kilitlenmiş. Komutları sırayla takip et, hatalı adımı bul ve cevap alanına sadece adım numarasını yaz.",
    guide: {
      purpose: "Algoritma akışındaki hatalı komutu bul.",
      why: "Son veri parçası bozuk komut akışı nedeniyle kilitli.",
      how: "Simülasyonu başlat, robotun baktığı yön okunu takip et ve yanlış yöne döndüğü adımı tespit et.",
      result: "Veri Parçası 4 kurtarılacak."
    },
    placeholder: "Örn: 4",
    answerType: "algorithm",
    flag: "GençTek{Algoritma_Cozuldu}",
    recoveredText: "VERİ PARÇASI 4 KURTARILDI",
    hint: "Robot 4. komutta yanlış yöne dönüyor.",
    commands: ["İLERİ", "İLERİ", "SAĞA DÖN", "SOLA DÖN", "İLERİ"]
  }
];
