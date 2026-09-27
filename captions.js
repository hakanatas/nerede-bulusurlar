/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 6. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.0, tr: 'Biri 4, diğeri 6 dakikada bir kalkıyor', en: 'One leaves every 4 minutes, the other every 6',
      note: 'Aynı duraktan iki otobüs kalkıyor: mavi otobüs 4 dakikada bir, turuncu otobüs 6 dakikada bir. Saat 09.00’da birlikte kalktılar. Yine ne zaman birlikte kalkarlar?' },
    { scene: 2, start: 10.8, end: 16.2, tr: 'Sayı doğrusunda 4’er 4’er atlayalım', en: 'Jump by 4 on the number line',
      note: 'Sayı doğrusunda 4’er 4’er atlayalım: 4, 8, 12, 16… Bunlar 4’ün katları.' },
    { scene: 2, start: 16.4, end: 21.6, tr: 'Şimdi de 6’şar 6’şar', en: 'Now by 6',
      note: 'Şimdi de 6’şar 6’şar atlayalım: 6, 12, 18, 24… Bunlar 6’nın katları.' },
    { scene: 2, start: 21.8, end: 25.6, tr: '12, 24, 36: ikisinin de katı', en: '12, 24, 36: multiples of both',
      note: 'İki atlama 12’de, 24’te ve 36’da buluşuyor. Bu sayılar hem 4’ün hem 6’nın katı: ortak katlar.' },
    { scene: 2, start: 25.8, end: 31.8, tr: 'En küçük ortak kat: 12', en: 'The smallest common multiple: 12',
      note: 'Ortak katların en küçüğü 12.' },
    { scene: 3, start: 32.4, end: 37.0, tr: 'Otobüsler 12 dakika sonra, 09.12’de buluşur', en: 'The buses meet again after 12 minutes, at 09.12',
      note: 'Sayı doğrusunu dakika gibi düşünelim. Otobüsler ilk kez 12 dakika sonra, yani 09.12’de yine birlikte kalkar.' },
    { scene: 3, start: 37.2, end: 43.6, tr: 'Ortak kat: iki sayının da katı olan sayı', en: 'A common multiple is a multiple of both numbers',
      note: 'Sonra 09.24’te, 09.36’da… Ortak katlar hiç bitmez. Ortak kat, iki sayının da katı olan sayıdır.' },
    { scene: 4, start: 44.6, end: 49.8, tr: '12 cm ve 18 cm’lik kurdeleleri eşit parçalara keselim', en: 'Cut ribbons of 12 cm and 18 cm into equal pieces',
      note: '12 cm ve 18 cm’lik iki kurdeleyi, hiç artık kalmadan aynı uzunlukta parçalara kesmek istiyoruz. 2’şer cm olur: 6 parça ve 9 parça.' },
    { scene: 4, start: 50.0, end: 53.4, tr: '4’er cm olmaz: 18 cm’den 2 cm artar', en: 'Not 4 cm: 2 cm are left from 18 cm',
      note: '4’er cm keselim: 12 cm tam 3 parça olur ama 18 cm’den 2 cm artar. 4, 18’i tam bölmez.' },
    { scene: 4, start: 53.6, end: 56.8, tr: '6’şar cm olur: 2 ve 3 parça', en: '6 cm works: 2 and 3 pieces',
      note: '6’şar cm keselim: 2 parça ve 3 parça, hiç artık yok.' },
    { scene: 4, start: 57.0, end: 61.2, tr: 'Tabloda iki sayının bölenleri', en: 'The divisors of both numbers in a table',
      note: 'Tabloda 12’nin ve 18’in bölenlerini yazalım. İkisinde de olanları işaretleyelim.' },
    { scene: 4, start: 61.4, end: 65.8, tr: 'Ortak bölenler: 1, 2, 3, 6', en: 'Common divisors: 1, 2, 3, 6',
      note: '12’nin ve 18’in ortak bölenleri 1, 2, 3 ve 6. Ortak bölen, iki sayıyı da tam bölen sayıdır. En büyüğü 6: kurdeleleri en uzun 6’şar cm kesebiliriz.' },
    { scene: 5, start: 66.6, end: 72.4, tr: '24 kalem ve 36 silgi eşit paketlere', en: '24 pens and 36 erasers into equal packs',
      note: '24 kalem ve 36 silgi artmadan eşit paketlere ayrılacak. Paket sayısı iki sayıyı da bölmeli.' },
    { scene: 5, start: 72.6, end: 75.4, tr: 'En çok 12 paket: her pakette 2 kalem, 3 silgi', en: 'At most 12 packs: 2 pens and 3 erasers in each',
      note: 'Ortak bölenler 1, 2, 3, 4, 6 ve 12. En çok 12 paket yapılır; her pakette 2 kalem ve 3 silgi olur.' },
    { scene: 5, start: 75.6, end: 79.8, tr: 'Ortak katlar sonsuz, ortak bölenler sınırlı', en: 'Common multiples go on, common divisors are few',
      note: 'Ortak katlar sonsuza kadar sürer; ortak bölenler ise sayılardan büyük olamaz, sınırlıdır.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Ortak kat: ikisinin de katı · ortak bölen: ikisini de böler', en: 'Common multiple: a multiple of both · common divisor: divides both',
      note: 'Aklında kalsın: ortak kat iki sayının da katıdır; ortak bölen iki sayıyı da tam böler.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Buluşma noktalarını bulabilirsin!', en: 'You can find where numbers meet!',
      note: 'Artık sayıların nerede buluştuğunu bulabilirsin!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
