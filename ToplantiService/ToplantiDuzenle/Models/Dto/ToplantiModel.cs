using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToplantiDuzenle.Models.Dto
{
    public class ToplantiModel
    {
        public int ID { get; set; }
        public string Konu { get; set; }
        public DateTime Tarih { get; set; }
        public TimeSpan BaslangicSaati { get; set; }
        public TimeSpan BitisSaati { get; set; }
        public string Katilimcilar { get; set; }
             
    }
}