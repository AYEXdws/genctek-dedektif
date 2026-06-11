import { caesarEncrypt } from "../utils/crypto";

export const PHYSICAL_TASK_CODE = "GT-MUHUR-04";

export const taskAreas = [
  "Kriptografi",
  "Kaynak Katmanı",
  "Kimlik İzleri",
  "Fiziksel Veri"
];

export const sourceFiles = {
  "system.log": [
    "[09:14] Sistem başlatıldı",
    "[09:16] Arşiv bağlantısı kontrol edildi",
    "[09:18] Mühür parçası bulunamadı"
  ],
  "archive.cache": [
    "[10:02] Önbellek tarandı",
    "[10:04] Eski kayıtlar temizlendi",
    "[10:05] Mühür parçası bulunamadı"
  ],
  "users.tmp": [
    "[11:20] Geçici kullanıcı oturumu",
    "[11:23] Yetki seviyesi: ziyaretçi",
    "[11:24] Mühür parçası bulunamadı"
  ],
  "source.layer": [
    "[12:40] Görünmeyen katman açıldı",
    "[12:41] Veri doğrulandı",
    "[12:42] Bayrak: GençTek{Gorunmeyen_Katman}"
  ]
};

export const tasks = [
  {
    id: "antik-sifre",
    number: "01",
    type: "crypto",
    title: "ANTİK ŞİFRE",
    area: "Kriptografi",
    panelTitle: "Kripto Çözümleme Paneli",
    briefTitle: "GÖREV DOSYASI 01",
    briefSubtitle: "ANTİK ŞİFRE",
    briefText: [
      "Güvenli iletişim, bilginin en büyük kalkanıdır Dedektif.",
      "İlk mühür parçası açık şekilde gönderilmedi. Harflerin yeri değiştirilerek korunmuş bir mesajın içine saklandı.",
      "Bu yöntem eski zamanlardan beri bilinir: Sezar Şifrelemesi.",
      "Bir harf, alfabedeki gerçek yerinden birkaç adım öteye taşınır. Mesajı okuyabilmek için harflerin hangi yöne kaydığını anlaman gerekir.",
      "Şifre bazen karmaşık görünür ama doğru alfabe doğru kapıyı açar."
    ],
    lesson:
      "Bilgi herkesin önünde olabilir. Ama doğru anahtar olmadan okunamaz.",
    objective: "Şifreli veriyi çöz ve ilk mühür parçasını kurtar.",
    encryptedLabel: "Şifreli veri",
    encryptedText: caesarEncrypt("GENÇTEK", 3),
    shiftText: "Sezar şifrelemesi",
    placeholder: "Orijinal mesaj",
    flag: "GençTek{Antik_Sifre}",
    recoveredText: "MÜHÜR PARÇASI 1 KURTARILDI",
    hint:
      "Harfler kaybolmadı Dedektif. Sadece sandığından üç adım daha geride duruyorlar."
  },
  {
    id: "gorunmeyen-katman",
    number: "02",
    type: "source",
    title: "GÖRÜNMEYEN KATMAN",
    area: "Kaynak Katmanı",
    panelTitle: "Kaynak Katmanı Tarayıcısı",
    briefTitle: "GÖREV DOSYASI 02",
    briefSubtitle: "GÖRÜNMEYEN KATMAN",
    briefText: [
      "Bir sistemin görünen yüzü her zaman hikayenin tamamı değildir.",
      "Ekranda gördüğün şey yalnızca vitrindir. Gerçek izler bazen kayıtların, dosya adlarının ve satır aralarının içinde saklanır.",
      "İkinci mühür parçası görünür alanda bulunamadı.",
      "Bu görevde kaynak katmanlarını incelemen, hangi kayıtların sıradan olduğunu ve hangi kaydın bir iz taşıdığını ayırt etmen gerekecek.",
      "Dedektiflik bazen hızlı bakmak değil, doğru yere bakmaktır."
    ],
    lesson:
      "Web dünyasında sadece görünen ekran yoktur. Arka planda kayıtlar, kaynaklar ve izler bulunur.",
    objective: "Kaynak katmanlarını incele ve ikinci mühür parçasını bul.",
    placeholder: "Örn: GençTek{Ornek_Bayrak}",
    flag: "GençTek{Gorunmeyen_Katman}",
    recoveredText: "MÜHÜR PARÇASI 2 KURTARILDI",
    hint:
      "Her kayıt aynı şeyi anlatmaz Dedektif. Sistemin sesi yüzeyde duyulur, ama izler çoğu zaman en derin katmanda kalır."
  },
  {
    id: "kimlik-izleri",
    number: "03",
    type: "identity",
    title: "KİMLİK İZLERİ",
    area: "Kimlik İzleri",
    panelTitle: "Kimlik Dosyası",
    briefTitle: "GÖREV DOSYASI 03",
    briefSubtitle: "KİMLİK İZLERİ",
    briefText: [
      "Bazı kapılar kodla değil, izlerle açılır Dedektif.",
      "Bir isim, bir tarih, sevilen bir gezegen, kullanılan bir görev kartı... Tek başına masum görünen bilgiler, yan yana geldiğinde bir anahtara dönüşebilir.",
      "Üçüncü mühür parçası, GençTek siber güvenlik sorumlusuna ait simüle edilmiş bir görev kimliğinin içinde saklı.",
      "Bu görevde sana doğrudan bir görev anahtarı verilmeyecek. Bilgileri okuyacak, gereksiz olanları eleyecek ve anlamlı izleri birleştirerek görev oturumunu doğrulayacaksın.",
      "Her bilgi ipucu değildir. Bazıları sadece dikkatini dağıtmak için oradadır."
    ],
    lesson:
      "Masum görünen kişisel bilgiler birleştiğinde güvenlik riski oluşturabilir. Gerçek hayatta isim, doğum günü veya sevilen şeylerden oluşan şifreler güvenli değildir.",
    objective: "Simüle kimlik izlerini incele ve görev oturumunu doğrula.",
    flag: "GençTek{Kimlik_Izleri}",
    recoveredText: "MÜHÜR PARÇASI 3 KURTARILDI",
    hint:
      "Anahtar, sahibinin izini taşır. Önce kim olduğunu düşün. Sonra zamanı bul. Son olarak gökyüzünde en çok merak ettiği yere bak. Ama dikkat et: Her görünen iz kapıyı açmaz.",
    securityNote:
      "Bu görev tamamen simülasyon amaçlıdır. Gerçek hayatta isim, doğum tarihi ve sevilen şeylerden oluşan şifreler güvenli değildir.",
    identityCards: [
      {
        title: "GENÇTEK GÖREV KARTI",
        lines: [
          ["Ad", "Ahmet Cemal Kurulay"],
          ["Rol", "Siber Güvenlik Sorumlusu"],
          ["Birim", "Dijital Güvenlik"],
          ["Personel Kodu", "GT-42"]
        ]
      },
      {
        title: "KİŞİSEL NOTLAR",
        lines: [
          ["Doğum Günü", "04 Haziran"],
          ["En Sevdiği Gezegen", "Merkür"],
          ["Favori Şehir", "Amasya"],
          ["Görev Rengi", "Kırmızı"]
        ]
      },
      {
        title: "İÇ AĞ NOTU",
        text:
          "Görev oturumlarında kullanılan adresler genellikle kişinin adından ve soyadından türetilir. Alan adı: gorev.genctek"
      },
      {
        title: "GÜVENLİK UYARISI",
        text:
          "Kişisel izlerden oluşturulan anahtarlar tahmin edilebilir. Bir isim. Bir zaman. Bir gökyüzü izi. Bunlar yan yana geldiğinde bir kapı aralanabilir."
      }
    ]
  },
  {
    id: "dijitalin-cismi",
    number: "04",
    type: "physical",
    title: "DİJİTALİN CİSMİ",
    area: "Fiziksel Veri",
    panelTitle: "Fiziksel Veri Doğrulama",
    briefTitle: "GÖREV DOSYASI 04",
    briefSubtitle: "DİJİTALİN CİSMİ",
    briefText: [
      "Her veri ekranda kalmaz Dedektif.",
      "Bazı bilgiler, doğru teknolojiyle fiziksel dünyaya taşınır.",
      "Son mühür parçası artık yalnızca bu cihazda değil. Dijital ortamdan çıkarıldı ve gerçek bir objenin içine saklandı.",
      "Bu görevde ekrandan uzaklaşman gerekecek.",
      "3D üretim masasına git. Amasya temalı objeyi eline al. Yüzeyini, kenarlarını ve detaylarını incele.",
      "Bazen bir sır, ışığın doğru düştüğü yerde görünür."
    ],
    lesson: "Dijital veri, üretim teknolojileriyle fiziksel dünyada iz bırakabilir.",
    objective: "3D üretim masasındaki Amasya temalı objeyi incele ve son kodu gir.",
    placeholder: "Son kodu yaz",
    expectedCode: PHYSICAL_TASK_CODE,
    flag: "GençTek{Dijitalin_Cismi}",
    recoveredText: "KIRMIZI MÜHÜR TAMAMLANDI",
    hint:
      "Bazı sırlar yüzeyde bağırmaz Dedektif. Onları görmek için objeye değil, ışığın objeyle kurduğu ilişkiye bak."
  }
];
