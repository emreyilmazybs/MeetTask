var apiUrl = "http://localhost:63942/api/Toplanti";

function tableWrite(data) {
    function tableAdd(data) {
        var actionBtnTemplate = "<div class='delete btn btn-danger' onclick='meetDelete(" + data.ID + ")'><span class='glyphicon glyphicon-trash'></span></div><div class='update btn btn-primary' onclick='meetGetUpdate("+data.ID+")'><span class='glyphicon glyphicon-edit'></span></div>";
        var htmlTemplate = "<tr data-id='" + data.ID + "'><td>" + data.Konu + "</td><td>" + data.Tarih + "</td><td>" + data.BaslangicSaati + "</td><td>" + data.BitisSaati + "</td><td>" + data.Katilimcilar + "</td><td>" + actionBtnTemplate + "</td></tr>";
        $("#meetList tbody").append(htmlTemplate);
    }

    if (data.ID) {
        if (data) tableAdd(data);
    }else{
        data.forEach(function (data, index) {
            if(data.ID) tableAdd(data);
        })
    }
}

function tableReplace(data) {
    var targetMeet = $("#meetList tbody tr[data-id='" + data.ID + "']");
    var actionBtnTemplate = "<div class='delete btn btn-danger' onclick='meetDelete(" + data.ID + ")'><span class='glyphicon glyphicon-trash'></span></div><div class='update btn btn-primary' onclick='meetGetUpdate(" + data.ID + ")'><span class='glyphicon glyphicon-edit'></span></div>";
    var htmlTemplate = "<td>" + data.Konu + "</td><td>" + data.Tarih + "</td><td>" + data.BaslangicSaati + "</td><td>" + data.BitisSaati + "</td><td>" + data.Katilimcilar + "</td><td>" + actionBtnTemplate + "</td>";

    targetMeet.html("");
    targetMeet.html(htmlTemplate)
}

function tableDelete(id) {
    $("#meetList tbody tr[data-id='" + id + "']").remove();
}

var meetDelete = function (id) {
    var modal = confirm("Bu toplantıyı silmek istiyor musun?")
    if (modal) {
        $.ajax({
            dataType: "json",
            type: "get",
            url: apiUrl + "/ToplantiSil/" + id,
            success: function (resp) {
                if (resp.Success) {
                    tableDelete(resp.Data.ID)
                } else {
                    alert(resp.Message);
                }
            },
            error: function (err) {
                alert("hata oluştu" + err);
            }
        });
    }
};

var meetGetUpdate = function (id) {
    function createUpdateForm(data) {
        $("#idG").val(data.ID);
        $("#txtKonuG").val(data.Konu);
        $("#txtKatG").val(data.Katilimcilar);
        $("#datetimeG").val(data.Tarih);
        $("#timestartG").val(data.BaslangicSaati);
        $("#timeendG").val(data.BitisSaati);

        $("#formContainer").addClass("update");
    }

    $.ajax({
        dataType: "json",
        type: "get",
        url: apiUrl + "/Toplanti/"+id,
        success: function (resp) {
            if (resp.Success) {
                createUpdateForm(resp.Data)
            } else {
                alert(resp.Message);
            }
        },
        error: function (err) {
            alert("hata oluştu" + err);
        }
    });
}

var getList = function () {
    $.ajax({
        dataType: "json",
        type: "get",
        url: apiUrl + "/TumToplantilar",
        success: function (resp) {
            if (resp.Success) {
                tableWrite(resp.Data)
            } else {
                alert(resp.Message);
            }
        },
        error: function (err) {
            alert("hata oluştu" + err);
        }
    });
}();

$("#btnEkle").click(function () {
    var top = new Object();
  
    top.Konu = $("#txtKonu").val();
    top.Katilimcilar = $("#txtKat").val();
    top.Tarih = $("#datetime").val();
    top.BaslangicSaati = $("#timestart").val();
    top.BitisSaati = $("#timeend").val();

    function clearInput() {
        $("#txtKonu").val("");
        $("#txtKat").val("");
        $("#datetime").val("");
        $("#timestart").val("");
        $("#timeend").val("");
    }

    $.ajax({
        type: "post",
        dataType: "json",
        data: top,
        url: apiUrl + "/ToplantiEkle",
        success: function (res) {
            if (res.Success) {
                tableWrite(res.Data);
                clearInput();
            }
        },
        error: function (err) {
            alert("Hata oluştu" + err);
        }

    });
});

$("#btnGuncelle").click(function () {
    var top = new Object();

    top.ID = $("#idG").val();
    top.Konu = $("#txtKonuG").val();
    top.Katilimcilar = $("#txtKatG").val();
    top.Tarih = $("#datetimeG").val();
    top.BaslangicSaati = $("#timestartG").val();
    top.BitisSaati = $("#timeendG").val();

    function clearInput() {
        $("#idG").val("");
        $("#txtKonu").val("");
        $("#txtKat").val("");
        $("#datetime").val("");
        $("#timestart").val("");
        $("#timeend").val("");

        $("#formContainer").removeClass("update");
    }

    $.ajax({
        type: "post",
        dataType: "json",
        data: top,
        url: apiUrl + "/ToplantiGuncelle/"+top.ID,
        success: function (res) {
            if (res.Success) {
                tableReplace(res.Data);
                clearInput();
            }
        },
        error: function (err) {
            alert("Hata oluştu" + err);
        }

    });
});