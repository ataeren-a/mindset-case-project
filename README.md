**GİRİŞ**

Merhaba Mindset. Bu repository, durum çalışması için oluşturulmuştur.

Dokümantasyona başlamadan önce projenin geliştirme süreciyle ilgili açıklamak istediğim birkaç konu var:

- Projeyi, tam zamanlı olarak çalıştığım işimde yoğun olduğum bir dönemde geliştirmek durumunda kaldım. Durum çalışması yapmadan önce kısa bir görüşme yapmak suretiyle vakti iki taraf için de daha uygun bir vakitte yapmış olmayı dilerdim. 

- Yukarıda belirttiğim durumdan dolayı, birim testler ve swagger dokümantasyonu yazmadım. Ancak hem test hem de dokümantasyon görevi görecek olan, geliştirme sürecinde benim de üzerinden testlerimi yaptığım ve API gateway'deki çağrıları yeniden yazarken dokümantasyon niyetine kullandığım bir Postman koleksiyonu paylaşıyorum.

- Yine yukarıda belirttiğim sebeplerden ötürü, durum çalışmasının açıklandığı metinde belirtilenlerin üzerine bir ekleme yapmadım / yapmamaya çalıştım.

- Hem böylesine çok katmanlı projelerde süreci yavaşlatabilmesinden hem de kişisel tercihimden dolayı kodu yazarken yapay zekadan destek almadım.

Yukarıda belirttiğim hususlara gösterdiğiniz anlayış için teşekkür ederim.

**PROJEYİ ÇALIŞTIRMAK**

- ```git clone https://github.com/ataerena/mindset-case-project.git```
- ```cd mindset-case-project```
- Servislere ait her bir Docker Container'ının terminal dökümlerini görmek için -> ```docker-compose-up --build```
- Servislere ait Docker Container'larını arka planda çalıştırmak için -> ```docker-compose-up --build -d```

**POSTMAN DOKÜMANTASYONU**

- Postman uygulamasını tarayıcı üzerinden (https://www.postman.com/) veya Postman Desktop App üzerinden açın ve giriş yapın (kayıtlı değilseniz kayıt olun).
- "Workspaces" kısmına tıklayın.
- Workspaces sayfasına geldiğinizde, sol üstteki "Import" tuşuna basın ve projenin root folder'ındaki "Mindset.postman_collection.json" dosyasını seçin.
- Koleksiyon import edildikten sonra koleksiyon içerisindeki "/Gateway/User Service" dizinindeki "Login" POST requestini, { "username": "admin", "pwd": "admin123" } şeklindeki request body (otomatik olarak böyle geliyor) ile çalıştırın.
- Bu istek size 24 saat geçerli bir Json Web Token döndürecek. Bu token'ı, sol taraftan koleksiyona tıklayıp gelen ekrandaki "Authorization" sekmesindeki "Token" kısmına kopyala / yapıştır yaparak ekleyin.
- Artık koleksiyon içerisindeki diğer istekleri atabilirsiniz.