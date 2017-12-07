# MeetTask
MVC Web Service and Ajax Call

Servis Klasörü :ToplantiService, 
Arayüz Klasörü:ToplantiWeb,


Get Servisleri :
--TumToplantilar  =>Toplantıların Listelenmesi,                       api/Toplanti/TumToplantilar
--ToplantiSil     =>Toplantının Silinmesi ,     Parametreler: id ,    api/Toplanti/ToplantiSil/id
--Toplanti        =>Seçilen Toplantının Yakalanması,  Parametreler:id,api/Toplanti/Toplanti/id

Post Servisleri:
--ToplantiEkle    =>Toplantı Eklenmesi,   Parametreler: ToplantiModel Tipinde _model nesnesi,     api/Toplanti/ToplantiEkle/ToplantiModel _model
--ToplantiGuncelle=>Toplantı Güncellenmesi, Parametreler:id,ToplantiModel Tipinde _model nesnesi, api/Toplanti/ToplantiGuncelle/id/ToplantiModel _model
