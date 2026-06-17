export const CHAIN_STORAGE_KEY = "genctek-zincirleme-ctf";

export const CHAIN_STATE_VERSION = 5;

export const GATE_WORD = "gorunmeyenyuz";

export const MAIL_ROUTE = "/mail";

export const FINAL_ROUTE = "/usta-dedektif";

export const PRODUCTION_FINAL_URL =
  "https://genctek-dedektif.vercel.app/usta-dedektif";

export const SOURCE_TRACE_PHRASE = "Kırmızı ip doğru dosyayı işaret eder";

export const MAIL_TRACE_PHRASE = "son mühür parçası artık dijitalde değil";

export const missionFiles = {
  crypto: {
    code: "GÖREV DOSYASI 01",
    title: "Antik Şifre",
    field: "Kriptografi",
    lines: [
      "Kırmızı Mühür'den kopan ilk iz, harflerin arasına saklanmış sessiz bir kapı adıdır.",
      "Bu dosyada amaç bayrak toplamak değil; kelimenin arkasındaki yolu fark etmektir."
    ]
  },
  source: {
    code: "GÖREV DOSYASI 02",
    title: "Görünmeyen Yüz",
    field: "Kaynak Kodu",
    lines: [
      "İlk iz seni ekranda görünen yüzün sınırına kadar getirir.",
      "Sayfanın anlattığı kadarına güvenme; bazen gerçek işaret, satırların içinde sessiz kalır."
    ]
  },
  identity: {
    code: "GÖREV DOSYASI 03",
    title: "Kimlik İzleri",
    field: "Kırmızı İpli Kart",
    lines: [
      "Görünmeyen yüz, dedektifi ekrandan ayırıp standa taşır.",
      "Doğru kart, iç posta kapısına yaklaşmak için gereken izleri üzerinde taşır."
    ]
  },
  physical: {
    code: "GÖREV DOSYASI 04",
    title: "Dijitalin Cismi",
    field: "Üç Boyutlu İz",
    lines: [
      "İç postadaki son kayıt, verinin artık ekranda kalmadığını söyler.",
      "Son kapı, dijital olanın cisme dönüştüğü yerde saklıdır."
    ]
  }
};

export const identityClues = {
  email: "ahmet.kurulay@genctek.gov.tr",
  key: "GCT202417AHK"
};

export const mailboxMessage = {
  id: "muhur-final-aktarim",
  from: "kirmizi.muhur@genctek.gov.tr",
  subject: "Son Veri Aktarıldı",
  time: "10:52",
  tag: "Kırmızı Mühür",
  status: "Okunmamış",
  preview: "Kırmızı Mühür dosyasından kısa bir kayıt.",
  body: [`${MAIL_TRACE_PHRASE}.`],
  note: ""
};

export const inboxMessages = [
  {
    id: "vardiya-notu",
    from: "operasyon.masasi@genctek.gov.tr",
    subject: "Stand Açılış Kontrol Listesi",
    time: "08:42",
    tag: "Operasyon",
    status: "Okundu",
    preview: "Kırmızı ipli kartlar, üretim masası ve görev ekranları kontrol edildi.",
    body: [
      "Sabah kontrolü tamamlandı.",
      "Kart askıları, yönlendirme panosu ve üretim masası hazır görünüyor.",
      "Bu mesajda aktif mühür izi yok."
    ],
    note: "Operasyon notu."
  },
  {
    id: "logo-paketi",
    from: "tasarim@genctek.gov.tr",
    subject: "GençTek Görsel Kimlik Dosyaları",
    time: "09:03",
    tag: "Tasarım",
    status: "Okundu",
    preview: "Kırmızı-beyaz kullanım ve logo yerleşimleri güncellendi.",
    body: [
      "Logo alanları onaylandı.",
      "Dijital Dedektifler işareti belge ve görev ekranlarında kullanılabilir."
    ],
    note: "Görsel kimlik kaydı."
  },
  {
    id: "muhur-arsiv",
    from: "arsiv@genctek.gov.tr",
    subject: "Kırmızı Mühür Arşiv Kaydı",
    time: "09:27",
    tag: "Arşiv",
    status: "Okundu",
    preview: "Mühür kayıtları dört iz halinde ayrılmış görünüyor.",
    body: [
      "Arşiv bütünlüğü kaydı incelendi.",
      "İlk iki iz dijital yüzeylerde, diğer izler fiziksel alanla bağlantılı olabilir."
    ],
    note: "Arşiv kaydı."
  },
  {
    id: "kart-dizilimi",
    from: "stand.ekibi@genctek.gov.tr",
    subject: "Yaka Kartı Dizilimi",
    time: "09:58",
    tag: "Stand",
    status: "Okundu",
    preview: "Kırmızı ipli görev kartları standa yerleştirildi.",
    body: [
      "Görev kartları aynı panoda duracak.",
      "Doğru kartın arka yüzü, iç iletişim paneli için gerekli izleri taşır."
    ],
    note: "Kart düzeni notu."
  },
  {
    id: "ziyaretci-akisi",
    from: "koordinasyon@genctek.gov.tr",
    subject: "Ziyaretçi Akışı",
    time: "10:14",
    tag: "Koordinasyon",
    status: "Okundu",
    preview: "Katılımcılar sırayla dijitalden fiziksel alana yönlendirilecek.",
    body: [
      "Akış kısa tutulmalı.",
      "Katılımcı her ekranda yalnızca o anki izi görmeli."
    ],
    note: "Deneyim notu."
  },
  {
    id: "eski-kayit",
    from: "sistem@genctek.gov.tr",
    subject: "Eski Oturum Kaydı",
    time: "10:31",
    tag: "Sistem",
    status: "Okundu",
    preview: "Önceki test oturumu kapatıldı.",
    body: [
      "Test oturumu temizlendi.",
      "Bu kayıt yalnızca sistem günlüğüdür."
    ],
    note: "Sistem kaydı."
  },
  mailboxMessage,
  {
    id: "uretim-masasi",
    from: "uretim@genctek.gov.tr",
    subject: "3D Baskı Masası Hazırlığı",
    time: "11:08",
    tag: "Üretim",
    status: "Okundu",
    preview: "Amasya temalı parçalar kontrol edildi.",
    body: [
      "Üretim masası hazır.",
      "Bazı detaylar yalnızca doğru açıdan bakıldığında seçilebilir."
    ],
    note: "Üretim kaydı."
  },
  {
    id: "gorev-notlari",
    from: "dedektif.notlari@genctek.gov.tr",
    subject: "Dedektif Notları",
    time: "11:26",
    tag: "Not",
    status: "Okundu",
    preview: "İzler her zaman en parlak yerde durmaz.",
    body: [
      "Hızlı bakan göz, sessiz kalan izi kaçırabilir.",
      "Bu mesaj bir yön değil, yalnızca hatırlatmadır."
    ],
    note: "Dedektif notu."
  },
  {
    id: "qr-test",
    from: "test@genctek.gov.tr",
    subject: "QR Okuma Testi",
    time: "11:47",
    tag: "Test",
    status: "Okundu",
    preview: "Final yönlendirmesi fiziksel nesne üzerinden denenmelidir.",
    body: [
      "QR testleri tamamlandı.",
      "Final adresi uygulama içinde açıkça gösterilmeyecek."
    ],
    note: "Test kaydı."
  },
  {
    id: "guvenlik-dili",
    from: "egitim@genctek.gov.tr",
    subject: "Dil ve Anlatım Notu",
    time: "12:05",
    tag: "Eğitim",
    status: "Okundu",
    preview: "Deneyim dili güvenli, merak uyandıran ve dedektifvari kalmalı.",
    body: [
      "Katılımcı suçlayıcı ya da korkutucu bir dille karşılaşmamalı.",
      "Merak, doğru yönlendirme kadar değerlidir."
    ],
    note: "Eğitim notu."
  },
  {
    id: "saha-notu",
    from: "amasya.saha@genctek.gov.tr",
    subject: "Amasya Saha Notu",
    time: "12:22",
    tag: "Saha",
    status: "Okundu",
    preview: "Stand çevresindeki fiziksel işaretler kontrol edildi.",
    body: [
      "Fiziksel işaretler masaların üzerinde belirgin ama doğrudan açıklayıcı değil.",
      "Katılımcı son izi ararken çevreyi incelemeli."
    ],
    note: "Saha kaydı."
  },
  {
    id: "muhur-golge",
    from: "muhur.kaydi@genctek.gov.tr",
    subject: "Gölge Katmanı",
    time: "12:38",
    tag: "Arşiv",
    status: "Okundu",
    preview: "Gölge katmanı incelendi; aktif iz bulunamadı.",
    body: [
      "Gölge katmanı eski bir kayıt taşıyor.",
      "Aktif son iz bu mesajda değildir."
    ],
    note: "Arşiv notu."
  },
  {
    id: "kapanis-hazirligi",
    from: "protokol@genctek.gov.tr",
    subject: "Belge Hazırlığı",
    time: "13:10",
    tag: "Protokol",
    status: "Okundu",
    preview: "Usta Dedektif belgesi final QR sonrası oluşturulacak.",
    body: [
      "Belge yalnızca final sayfasında oluşturulmalıdır.",
      "Finale ulaşım fiziksel iz üzerinden gerçekleşir."
    ],
    note: "Protokol kaydı."
  }
];

export const certificateDetails = {
  title: "USTA DİJİTAL DEDEKTİF BELGESİ",
  event: "GençTek Dijital Dedektifler",
  operation: "Kırmızı Mühür Operasyonu",
  location: "Amasya",
  date: "19 Haziran 2026",
  completedTracks: [
    "Antik Şifre",
    "Görünmeyen Yüz",
    "Kimlik İzleri",
    "Dijitalin Cismi"
  ],
  footer:
    "Bu belge GençTek Dijital Dedektifler etkinliği kapsamında oluşturulmuş dijital görev belgesidir."
};
