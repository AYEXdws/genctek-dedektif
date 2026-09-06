# GençTek Dijital Dedektifler

**Kırmızı Mühür Operasyonu**, GençTek etkinlik standında QR kodla başlayan, mobil kullanım için hazırlanmış bir dijital görev deneyimidir. Katılımcı dijital ipuçlarını takip eder, görev zincirini tamamlar ve adına düzenlenen belgeyi indirir.

## Deneyim

Görev akışı dört alanı birleştirir:

1. **Antik Şifre:** şifre çözme ve kriptografi.
2. **Görünmeyen Katman:** sayfa ve kaynak katmanındaki ipuçlarını keşfetme.
3. **Kimlik İzleri:** kurgu kimlikler ve simüle posta kutusu üzerinden iz sürme.
4. **Dijitalin Cismi:** etkinlik alanındaki fiziksel veri / 3D baskı görevi.

Uygulama görev ilerlemesini, ipucu kullanımını ve puanı yönetir. Son aşamada Usta Dijital Dedektif belgesi oluşturulur. Belge, tarayıcı Canvas API'si ile PNG olarak üretilir; indirme ve görseli açarak kaydetme akışları bulunur.

Kimlik ve posta akışı eğitim senaryosunun parçasıdır. Gerçek bir e-posta hizmetine giriş yapmaz ve e-posta göndermez.

## Teknoloji ve yapı

React 19, JavaScript ve Vite 7 kullanılır. Mevcut sürüm ayrı bir backend veya veritabanı gerektirmez.

| Yol | İçerik |
| --- | --- |
| `src/App.jsx` | Görev akışı, sayfa seçimi ve ilerleme |
| `src/data/chain.js` | Görev verileri, rota ve belge ayarları |
| `src/components/` | Şifre, kimlik, posta, fiziksel görev ve belge ekranları |
| `src/utils/certificate.js` | Canvas ile belge oluşturma |
| `src/utils/badge.js` | Yerel belge kimliği ve belge verisi |
| `public/assets/` | Belge şablonu ve ortak medya |
| `vercel.json` | Doğrudan sayfa erişimi için yönlendirmeler |

## Yerel kurulum

Node.js ve npm ile:

```bash
npm ci
npm run dev
```

Vite'ın terminalde gösterdiği yerel adresi açın. Standart geliştirme adresi [localhost:5173](http://localhost:5173) olur.

İlerleme tarayıcının `localStorage` alanında tutulur. Deneyimi yeniden başlatmak uygulamanın yerel görev kaydını sıfırlar. Ortak kullanılan stand cihazında katılımcı değişiminden önce bu akışı kullanın.

## Derleme ve kontrol

```bash
npm run build
npm run preview
```

Üretim çıktısı `dist/` dizinindedir. Paket içinde otomatik test komutu tanımlı değildir. Görev zinciri, puan/ipuçları, yenileme sonrası devam, Türkçe karakterli ve uzun isimle belge oluşturma, PNG indirme ve mobil kaydetme akışı tarayıcıda kontrol edilmelidir.

## Etkinlik ve yayın ayarları

- Metinleri, görev rotalarını ve belge bilgilerini `src/data/chain.js` üzerinden düzenleyin.
- Son belge bağlantısında kullanılan `PRODUCTION_FINAL_URL` değerini yayın adresiyle eşleştirin.
- `/mail`, `/gorev-postasi` ve `/usta-dedektif` yolları doğrudan açıldığında uygulamaya dönmelidir. Vercel dışındaki sunucuda da aynı yönlendirmeleri kurun.
- Fiziksel görev materyalini ve QR kod hedeflerini etkinlikten önce birlikte kontrol edin.

Mevcut belgeler tarayıcıda üretilen etkinlik çıktılarıdır; merkezi bir sertifika sicili veya sunucuda doğrulama hizmeti bu depoda bulunmaz.
