# Ouzhann Group Web Sitesi

İstanbul'da inşaat ve dekorasyon hizmetleri sunan Ouzhann Group için statik tanıtım sitesi.

## Sayfalar

- `index.html`: Ana sayfa, hizmet özetleri, portfolio özeti, hakkımızda, referanslar ve iletişim formu
- `services.html`: Hizmet detayları ve galeriler
- `portfolio.html`: Proje detayları ve galeriler

## Yerelde Açma

Node.js ile yerel sunucu:

```bash
node local-server.cjs
```

Sonra tarayıcıda:

```text
http://127.0.0.1:8000
```

## Canlıya Çıkmadan Önce

- Canlı domain: `https://ouzhanngroup.com`
- Eksik proje/hizmet görsellerini `images/` klasörüne ekleyin veya ilgili HTML yollarını güncelleyin.
- Google Search Console'a domain ekleyip `sitemap.xml` gönderin.
- İletişim formu şu anda WhatsApp yönlendirmesiyle çalışır.

## Yapı

```text
assets/
images/
index.html
services.html
portfolio.html
styles.css
script.js
robots.txt
sitemap.xml
site.webmanifest
local-server.cjs
```
