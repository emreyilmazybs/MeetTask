using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ToplantiDuzenle.Models;
using ToplantiDuzenle.Models.Dto;
using ToplantiDuzenle.Models.Orm;

namespace ToplantiDuzenle.Controllers
{
    public class ToplantiController : ApiController
    {
        MeetingOrganizerDataBase db = new MeetingOrganizerDataBase();

        [HttpGet]
        public ResponseModel<List<ToplantiModel>> TumToplantilar()
        {
            List<ToplantiModel> ToplantiList = db.Toplanti.Select(x => new ToplantiModel(){
                ID = x.ID,
                Konu = x.Konu,
                Katilimcilar = x.Katilimcilar,
                Tarih = (DateTime)x.Tarih,
                BaslangicSaati = (TimeSpan)x.BaslangicSaati,
                BitisSaati = (TimeSpan)x.BitisSaati
            }).ToList();
            var res = new ResponseModel<List<ToplantiModel>>();

            if (true){
                res.Success = true;
                res.Data = ToplantiList;
            }else{
                res.Success = false;
                res.Message = "Bir Hata Oluştu!";
            }
   
            return res;
        }

        [HttpGet]
        public ResponseModel<object> ToplantiSil(int id)
        {
            Toplanti top = db.Toplanti.Find(id);
            
            var res = new ResponseModel<object> ();

            if (top != null && top.ID == id){
                 db.Toplanti.Remove(top);
                 db.SaveChanges();

                res.Success = true;
                res.Data = top;
            }
            else{
                res.Success = false;
                res.Message = "Bir Hata Oluştu!";
            }

            return res;

        }

        [HttpPost]
        public ResponseModel<object> ToplantiEkle(ToplantiModel _model)
        {
            Toplanti top = new Toplanti();

            top.Konu = _model.Konu;
            top.Tarih = _model.Tarih;
            top.Katilimcilar = _model.Katilimcilar;
            top.BaslangicSaati = _model.BaslangicSaati;
            top.BitisSaati = _model.BitisSaati;

            db.Toplanti.Add(top);
            db.SaveChanges();

            var res = new ResponseModel<object>();
            if (true){
                res.Success = true;
                res.Data = top;
            }else{
                res.Success = false;
                res.Message = "Bir Hata Oluştu!";
            }

            return res;
        }

        [HttpPost]
        public ResponseModel<object> ToplantiGuncelle(int id, ToplantiModel _model)
        {
            Toplanti top = db.Toplanti.Find(id);
            if (top.ID==id)
            {
                top.Konu = _model.Konu;
                top.Tarih = _model.Tarih;
                top.Katilimcilar = _model.Katilimcilar;
                top.BaslangicSaati = _model.BaslangicSaati;
                top.BitisSaati = _model.BitisSaati;

                db.SaveChanges();
            }

            var res = new ResponseModel<object>();
            if (true)
            {
                res.Success = true;
                res.Data = top;
            }
            else
            {
                res.Success = false;
                res.Message = "Bir Hata Oluştu!";
            }

            return res;

        }

        [HttpGet]
        public ResponseModel<object> Toplanti(int id)
        {
            Toplanti top = db.Toplanti.Find(id);
            var res = new ResponseModel<object> ();

            if (top != null){
                res.Success = true;
                res.Data = top;
            }else{
                res.Success = false;
                res.Message = "Böyle bir toplantı bulunamadı!";
            }

            return res;
            
        }
       
    }
}
