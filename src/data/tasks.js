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
      "Elimize ilk bakışta anlamsız görünen kısa bir veri ulaştı. Bu veri açık gönderilmedi; harflerin düzeni değiştirilerek korunmuş bir mesajın içine saklandı.",
      "İlk mühür parçasına ulaşmak için metne bir kelime gibi değil, iz bırakan bir alfabe düzeni gibi bakman gerekecek.",
      "Yanındaki çözümleme panelinde verilen alfabeyi incele. Harflerin nerede durduğunu, nereden gelmiş olabileceğini ve hangi düzenin mesajı okunur hale getirdiğini düşün.",
      "Bu görev sana şunu gösterir: Bilgi herkesin önünde olabilir, ama doğru anahtar olmadan anlam kazanmaz."
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
      "Bir web sayfasının asıl hikayesi, bazen ekranda değil onu oluşturan satırlarda saklıdır Dedektif.",
      "Karşına çıkacak sayfa ilk bakışta sıradan bir tanıtım yüzü gibi görünecek. Fakat görünen katman, bu görevin yalnızca başlangıcı.",
      "İkinci mühür parçası tasarımın üstünde değil, sayfayı oluşturan kaynak katmanında bırakılmış bir notun içinde bekliyor.",
      "Görevin, kaynak kodunu açıp satırların arasındaki veri izini bulmak ve doğrulama alanına taşımak.",
      "Bu görev sana şunu gösterir: Web dünyasında görünen ekran kadar, ekranı oluşturan yapı da bilgi taşır."
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
      "Bazı kapılar güçlü yazılımlarla değil, insanların geride bıraktığı küçük izlerle aralanır Dedektif.",
      "Önünde GençTek siber güvenlik biriminden bir kişiye ait simüle edilmiş görev kimliği bulunuyor. Bir isim, bir tarih, bir alan adı ve kişisel notlar tek başına masum görünebilir.",
      "Fakat bu bilgiler yan yana geldiğinde bir görev oturumunu doğrulayacak şifreye dönüşebilir. Burada önemli olan her bilgiyi kullanmak değil, işe yarayan izleri ayırt etmek.",
      "Görevin, kimlik kartını ve kişisel notları inceleyerek doğru e-posta bilgisini ve görev şifresini oluşturmak.",
      "Bu görev sana şunu gösterir: Masum görünen kişisel bilgiler birleştiğinde gerçek hayatta güvenlik riski oluşturabilir."
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
      "Her veri ekranda kalmaz Dedektif; bazı bilgiler doğru teknolojiyle fiziksel dünyada iz bırakır.",
      "Son mühür parçası artık yalnızca bu cihazın içinde değil. Dijital ortamdan çıkarıldı ve stanttaki gerçek bir objenin detaylarına taşındı.",
      "Bu görevde ekrana bakmayı bırakıp üretim masasındaki Amasya temalı 3D objeyi incelemen gerekecek.",
      "Yüzeyi, kenarları, açıları ve ışığın objeyle kurduğu ilişki sana son kodun nerede saklandığını düşündürebilir.",
      "Bu görev sana şunu gösterir: Dijital tasarım, üretim teknolojileriyle fiziksel dünyada okunabilir bir veriye dönüşebilir."
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
