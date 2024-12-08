// Bölümleri gösterme işlevi
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Kayıt tipi değişiminde ilgili formu gösterme
document.getElementById('kayit-tipi').addEventListener('change', function() {
    document.getElementById('ogrenci-kayit').style.display = this.value === 'ogrenci' ? 'block' : 'none';
    document.getElementById('okul-kayit').style.display = this.value === 'okul' ? 'block' : 'none';
});

// Kayıt formu gönderildiğinde kayıt işlemleri
document.getElementById('kayitForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let kayitTipi = document.getElementById('kayit-tipi').value;
    
    if (kayitTipi === 'ogrenci') {
        let ogrenciler = JSON.parse(localStorage.getItem('ogrenciler')) || [];
        let yeniOgrenci = {
            isim: document.getElementById('isim').value,
            soyisim: document.getElementById('soyisim').value,
            il: document.getElementById('il').value,
            ilce: document.getElementById('ilce').value,
            okul: document.getElementById('okul').value,
            okul_numarasi: document.getElementById('okul_numarasi').value,
            email: document.getElementById('email').value,
            puan: 0
        };
        ogrenciler.push(yeniOgrenci);
        localStorage.setItem('ogrenciler', JSON.stringify(ogrenciler));
        showSection('onay-mesaji'); // Onay mesajı göster
    } else if (kayitTipi === 'okul') {
        let okullar = JSON.parse(localStorage.getItem('okullar')) || [];
        let yeniOkul = {
            okul: document.getElementById('okul').value,
            il: document.getElementById('il').value,
            ilce: document.getElementById('ilce').value,
            sifre: document.getElementById('okul_sifre').value
        };
        okullar.push(yeniOkul);
        localStorage.setItem('okullar', JSON.stringify(okullar));
        showSection('onay-mesaji'); // Onay mesajı göster
    }
});

// Veri girişi formu gönderildiğinde veri ekleme işlemleri
document.getElementById('veriGirisiForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let atiklar = JSON.parse(localStorage.getItem('atiklar')) || [];
    let yeniAtik = {
        ogrenci_id: document.getElementById('ogrenci_id').value,
        atik_turu: document.getElementById('atik_turu').value,
        miktar: document.getElementById('miktar').value,
        dogru_ayristirma: document.getElementById('dogru_ayristirma').value,
        teslim_alan: document.getElementById('teslim_alan').value
    };
    atiklar.push(yeniAtik);
    localStorage.setItem('atiklar', JSON.stringify(atiklar));
    let toplamAtikKilogrami = atiklar.reduce((total, atik) => total + parseFloat(atik.miktar), 0);
    document.getElementById('toplam-atik-kilogrami').textContent = toplamAtikKilogrami;
    showSection('onay-mesaji'); // Onay mesajı göster
});

// Veri görüntüleme formu gönderildiğinde verileri gösterme işlemleri
document.getElementById('veriGoruntulemeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let sifre = document.getElementById('sifre').value;
    let ogrenciler = JSON.parse(localStorage.getItem('ogrenciler')) || [];
    let atiklar = JSON.parse(localStorage.getItem('atiklar')) || [];
    
    let ogrenci = ogrenciler.find(o => o.email === email);
    if (ogrenci) {
        let veriGormeHtml = `<h3>${ogrenci.isim} ${ogrenci.soyisim}</h3>`;
        veriGormeHtml += `<p>Email: ${ogrenci.email}</p>`;
        veriGormeHtml += `<p>İl: ${ogrenci.il}</p>`;
        veriGormeHtml += `<p>İlçe: ${ogrenci.ilce}</p>`;
        veriGormeHtml += `<p>Okul: ${ogrenci.okul}</p>`;
        veriGormeHtml += `<p>Okul Numarası: ${ogrenci.okul_numarasi}</p>`;
        veriGormeHtml += `<p>Puan: ${ogrenci.puan}</p>`;
        
        veriGormeHtml += '<h3>Atıklar:</h3><ul>';
        atiklar.forEach((atik) => {
            if (atik.ogrenci_id == ogrenci.okul_numarasi) {
                veriGormeHtml += `<li>Atık Türü: ${atik.atik_turu}, Miktar: ${atik.miktar} kg, Doğru Ayrıştırma: ${atik.dogru_ayristirma ? 'Evet' : 'Hayır'}, Teslim Alan: ${atik.teslim_alan}</li>`;
            }
        });
        veriGormeHtml += '</ul>';
        
        document.getElementById('veriGoruntulemeContent').innerHTML = veriGormeHtml;
        showSection('veri-goruntuleme');
    } else {
        alert('Bu email ile kayıtlı bir öğrenci bulunamadı.');
    }
});
