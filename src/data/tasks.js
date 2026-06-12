import { caesarEncrypt } from "../utils/crypto";

export const PHYSICAL_TASK_CODE = "GT-MUHUR-04";

export const taskAreas = [
  "Kriptografi",
  "Kaynak Kod Analizi",
  "Kimlik İzleri",
  "Fiziksel Veri"
];

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
      "Bu eski yöntem, harflerin alfabedeki konumunu değiştirerek mesajı korur.",
      "Bir harf, gerçek yerinden birkaç adım öteye taşınır. Mesajı okuyabilmek için harflerin hangi yöne kaydığını anlaman gerekir.",
      "Şifre bazen karmaşık görünür ama doğru alfabe doğru kapıyı açar."
    ],
    lesson:
      "Bilgi herkesin önünde olabilir. Ama doğru anahtar olmadan okunamaz.",
    objective: "Şifreli veriyi çöz ve ilk mühür parçasını kurtar.",
    encryptedLabel: "Şifreli veri",
    encryptedText: caesarEncrypt("GENÇTEK", 3),
    placeholder: "Orijinal mesaj",
    flag: "GençTek{Antik_Sifre}",
    recoveredText: "MÜHÜR PARÇASI 1 KURTARILDI",
    hint:
      "Harfler kaybolmadı Dedektif. Sadece sandığından üç adım daha geride duruyorlar."
  },
  {
    id: "gorunmeyen-yuz",
    number: "02",
    type: "source",
    title: "GÖRÜNMEYEN YÜZ",
    area: "Web Bilişimi / Kaynak Kod Analizi",
    panelTitle: "Kaynak Kodu Deneyimi",
    briefTitle: "GÖREV DOSYASI 02",
    briefSubtitle: "GÖRÜNMEYEN YÜZ",
    briefText: [
      "Bir web sayfasının görünen yüzü, hikayenin yalnızca başlangıcıdır Dedektif.",
      "Ekranda gördüğün tasarım, yazı ve butonlar vitrindir.",
      "Ama her vitrinin arkasında onu ayakta tutan satırlar vardır.",
      "İkinci mühür parçası bu uygulamanın içinde değil; bizim sitemizin görünmeyen katmanında saklı.",
      "Bu görevde farklı bir sayfaya gidecek, kaynak kodunu inceleyecek ve kodların arasına bırakılmış gizli notu bulacaksın.",
      "Bir dedektif sadece görüneni okumaz. Görüneni oluşturan yapıya da bakar."
    ],
    lesson:
      "Web dünyasında gördüğün ekranın arkasında HTML, kaynak kodu ve görünmeyen yorum satırları bulunur.",
    objective:
      "Kaynak katmanı sayfasını aç, sayfa kaynağını incele ve gizli mühür parçasını bul.",
    answerLabel: "Bulduğun mühür parçasını yaz:",
    placeholder: "GençTek{...}",
    sourceUrl: "/kaynak-katmani.html",
    flag: "GençTek{Gorunmeyen_Yuz}",
    recoveredText: "MÜHÜR PARÇASI 2 KURTARILDI",
    hint:
      "Her sayfa iki yüz taşır Dedektif. Biri herkesin gördüğü yüzdür. Diğeri ise onu var eden satırların arasında bekler. Cevabı ekranda değil, ekranı oluşturan izlerde ara."
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
      "Bir isim, bir tarih, sevilen bir gezegen, kullanılan bir görev kartı... Tek başına masum görünen bilgiler, yan yana geldiğinde bir görev şifresine dönüşebilir.",
      "Üçüncü mühür parçası, GençTek siber güvenlik biriminden bir kişiye ait simüle edilmiş bir görev kimliğinin içinde saklı.",
      "Bu görevde sana doğrudan bir görev şifresi verilmeyecek. Bilgileri okuyacak, gereksiz olanları eleyecek ve anlamlı izleri birleştirerek görev oturumunu doğrulayacaksın.",
      "Her bilgi ipucu değildir. Bazıları sadece dikkatini dağıtmak için oradadır."
    ],
    lesson:
      "Masum görünen kişisel bilgiler birleştiğinde güvenlik riski oluşturabilir. Gerçek hayatta isim, doğum günü veya sevilen şeylerden oluşan şifreler güvenli değildir.",
    objective: "Simüle kimlik izlerini incele ve görev oturumunu doğrula.",
    flag: "GençTek{Kimlik_Izleri}",
    recoveredText: "MÜHÜR PARÇASI 3 KURTARILDI",
    hint:
      "Görev şifresi, sahibinin izini taşır. Önce kim olduğunu düşün. Sonra zamanı bul. Son olarak gökyüzünde en çok merak ettiği yere bak. Ama dikkat et: Her görünen iz kapıyı açmaz.",
    securityNote:
      "Bu görev tamamen simülasyon amaçlıdır. Gerçek hayatta isim, doğum tarihi ve sevilen şeylerden oluşan şifreler güvenli değildir.",
    identityCards: [
      {
        title: "GENÇTEK GÖREV KARTI",
        lines: [
          ["Ad", "Ahmet Cemal Kurulay"],
          ["Birim", "Siber Güvenlik Birimi"],
          ["Görev", "Dijital Güvenlik Ekibi"],
          ["Personel Kodu", "GT-42"],
          ["E-posta Alanı", "gorev.genctek"]
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
