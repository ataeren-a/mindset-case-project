**GİRİŞ**

Merhaba Mindset. Bu repository, durum çalışması için oluşturulmuştur.

Dokümantasyona başlamadan önce projenin geliştirme süreciyle ilgili açıklamak istediğim birkaç konu var:

- Projeyi, tam zamanlı olarak çalıştığım işimde yoğun olduğum bir dönemde geliştirmek durumunda kaldım. Bu da maalesef, normal şartlarda göstereceğim özenin altında kalmama neden oldu.

- Yukarıda belirttiğim durumdan dolayı, birim testler ve swagger dokümantasyonu yazmadım. Ancak hem test hem de dokümantasyon görevi görecek olan, geliştirme sürecinde benim de üzerinden testlerimi yaptığım ve API gateway'deki çağrıları yeniden yazarken dokümantasyon niyetine kullandığım bir Postman koleksiyonu paylaşıyorum.

- Yine yukarıda belirttiğim sebeplerden ötürü, durum çalışmasının açıklandığı metinde belirtilenlerin üzerine bir ekleme yapmadım / yapmamaya çalıştım.

- API Gateway'de hem zaman kısıtlarından dolayı, mikroservislere eklediğim ve böyle bir projede olmasını mantıklı gördüğüm birkaç isteği eklemedim; yalnızca direktif metninde özellikle belirtilen hususları içeren bir API Gateway hazırladım.

- Hem böylesine çok katmanlı projelerde süreci yavaşlatabilmesinden hem de kişisel tercihimden dolayı kodu yazarken yapay zekadan destek almadım.

Yukarıda belirttiğim hususlara gösterdiğiniz anlayış için teşekkür ederim.

**TEKNİK GÖRÜŞLER**

Bu kısımda yazdıklarım *kesinlikle* bir eleştiri değildir, yalnızca projeye benim teknik bakış açımı açıklamaktadır. Projenin yapısının mikroservis mimarileri ile çalışabirliği ölçmek üzerine olduğunu anlıyor ve saygı duyuyorum.

Ancak böyle bir projeyi kendim geliştiriyor olsam, yalnızca bu üç sistemi barındıracak olan veya yalnızca müşteri yönetimi servisi ile satış yönetimi servisini içeren bir sistemi *tek katmanlı (monolithic)* tasarlardım. Sebebi genel olarak veritabanı ilişkilendirmeleri ile alakalı. Farklı veritabanları kullanmak, SQL içerisinde kolaylıkla çözülebilecek bazı problemlerin çözümünü imkansız kılmasa da, bu çözümleri JavaScript'e çekmek zorunda bıraktığından dolayı hem daha karmaşık ve maintain etmesi daha zor, hem de daha düşük performanslı bir hale getiriyor.

SQL bazlı veritabanlarında, farklı veritabanlarındaki tablolar arasında "Foreign Key Constraint" koyulamıyor. Bu da, hiç var olmayan bir müşteri için satış oluşturabileceğimiz anlamına geliyor. En azından veritabanı seviyesinde. Mantıken API Gateway üzerinden öncelikle müşteri servisine ulaşarak, satışın yapıldığı müşteriyi doğrulayabiliriz. Ancak bu yukarıda bahsettiğim gibi; SQL üzerinden basit bir "kısıtlama" koymaktan daha yavaş çalışacaktır ve daha kompleks olacaktır.

Bunun gibi bir çok soruyu veritabanına sorabiliriz: Oluşturulan bir müşteriyi hangi kullanıcı yarattı? Bu kullanıcı gerçekten var mı? Bir satışın, pipeline'daki durumunu kim değiştirdi? Müşteriyi veritabanından kim sildi? Bunun gibi birçok sorunun cevabını basitleştirdiği için, böyle bir sistemi "monolithic" tasarlardım.

**PROJEYİ ÇALIŞTIRMAK**

- ```git clone https://github.com/ataerena/mindset-case-project.git```
- ```cd mindset-case-project```
- Servislere ait her bir Docker Container'ının terminal dökümlerini görmek için -> ```docker-compose-up --build```
- Servislere ait Docker Container'larını arka planda çalıştırmak için -> ```docker-compose-up --build -d```

**POSTMAN DOKÜMANTASYONU**

- Postman uygulamasını tarayıcı üzerinden (https://www.postman.com/) veya Postman Desktop App üzerinden açın ve giriş yapın (kayıtlı değilseniz kayıt olun).
- "Workspaces" kısmına tıklayın.
- Workspaces sayfasına geldiğinizde, sol üstteki "Import" tuşuna basın ve projenin root folder'ındaki "Mindset.postman_collection.json" dosyasını seçin.
- Workspaces'i açtığınız gibi, aynı yerden "Environments" sayfasını açın.
- Sol üstten "Import" tuşuna basın ve bu sefer de "mindset.postman_environment.json" dosyasını seçin. Bunu yaparak, gerekli URL ortam değişkenlerini import etmiş oluyorsunuz.
- Ekranın sağ üstündeki "No environment" (eğer halihazırda seçili bir environment seçili ise ismi farklı olabilir) yazan yere tıklayarak "mindset" isimli (eğer aynı isimde başka bir environment varsa ismini "Environments" sayfasından kontrol ederek) environment'ı seçin.
- Koleksiyon ve environment import edildikten sonra koleksiyon içerisindeki "/Gateway/User Service" dizinindeki "Login" POST requestini, { "username": "admin", "pwd": "admin123" } şeklindeki request body (otomatik olarak böyle geliyor) ile çalıştırın.
- Bu istek size 24 saat geçerli bir Json Web Token döndürecek. Bu token'ı, sol taraftan koleksiyona tıklayıp gelen ekrandaki "Authorization" sekmesindeki "Token" kısmına kopyala / yapıştır yaparak ekleyin.
- Artık koleksiyon içerisindeki diğer istekleri atabilirsiniz.