$(function() {
    // henter alle billetter
    hentAlle();
});
function kjopBillett() {
    // variabel for feilmeldinger
    let feilmelding = false;


    const enBillett = {
        film: $("#film").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefon: $("#telefon").val(),
        epost: $("#epost").val()
    };

    // Valider film
    if (!enBillett.film) {
        $("#ikkeValgtFilm").html("Vennligst velg en film");
        feilmelding = true;
    } else {
        $("#ikkeValgtFilm").html("");
    }

    // Valider antall
    if (isNaN(enBillett.antall) || enBillett.antall <= 0) {
        $("#ikkeTall").html("Vennligst skriv inn et gyldig antall");
        feilmelding = true;
    } else {
        $("#ikkeTall").html("");
    }

    // Valider fornavn
    if (!enBillett.fornavn) {
        $("#fornavnFeil").html("Vennligst skriv inn et gyldig navn");
        feilmelding = true;
    } else {
        $("#fornavnFeil").html("");
    }

    // Valider etternavn
    if (!enBillett.etternavn) {
        $("#etternavnFeil").html("Vennligst skriv inn et gyldig navn");
        feilmelding = true;
    } else {
        $("#etternavnFeil").html("");
    }

    // Valider telefonnummer
    if (isNaN(enBillett.telefon) || enBillett.telefon.length !== 8) {
        $("#telefonFeil").html("Vennligst skriv inn et gyldig telefonnummer på 8 siffer");
        feilmelding = true;
    } else {
        $("#telefonFeil").html("");
    }

    // Valider e-post
    if (!enBillett.epost || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enBillett.epost)) {
        $("#epostFeil").html("Vennligst skriv inn en gyldig e-postadresse");
        feilmelding = true;
    } else {
        $("#epostFeil").html("");
    }

    // Nullstill skjema
    if (feilmelding === false) {
        $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefon").val("");
        $("#epost").val("");
    } else {
        return;
    }

    // Avbryt eller send inn og hent alle billetter på nytt
    if (Object.values(enBillett).every(val => val === "")) {
        return;
    } else {
        $.post("/lagBillett", enBillett, function () {
            hentAlle();
        });
    }
}

// lager tabellen
function skrivUt(alleBillettene) {
    let utBillett =
        "<table class='table table-striped'><tr>" +
        "<th>Film</th>" +
        "<th>Antall</th>" +
        "<th>Fornavn</th>" +
        "<th>Etternavn</th>" +
        "<th>Telefonnummer</th>" +
        "<th>E-post</th>" +
        "</tr>";

    for (let enBillett of alleBillettene) {
        utBillett += "<tr>" +
            "<td>" + enBillett.film + "</td>" +
            "<td>" + enBillett.antall + "</td>" +
            "<td>" + enBillett.fornavn + "</td>" +
            "<td>" + enBillett.etternavn + "</td>" +
            "<td>" + enBillett.telefon + "</td>" +
            "<td>" + enBillett.epost + "</td>" +
            "</tr>";
    }
    utBillett += "</table>";
    $("#billetter").html(utBillett);
}

// skriver ut alle billettene
function hentAlle() {
    $.get("/hentAlle", function (data) {
        skrivUt(data);
    });
}

// Hent alle billetter på nytt etter sletting
function slettAlleBilletter() {
    $.post("/slettAlle", function () {
        hentAlle();
    });
}
