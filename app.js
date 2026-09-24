async function caricaDashboard(){

    try{

        const res = await fetch("/api/dashboard");
        const dati = await res.json();

        document.getElementById("lavori").textContent = dati.lavori;
        document.getElementById("revisioni").textContent = dati.revisioni;
        document.getElementById("solleciti").textContent = dati.solleciti;
        document.getElementById("agenda").textContent = dati.agenda;

    }catch(err){

        console.log(err);

    }

}

document.getElementById("checkin").onclick = () => {
    alert("OCR targa in sviluppo");
};

document.getElementById("checkout").onclick = () => {
    alert("Lista veicoli aperti");
};

caricaDashboard();

document.getElementById("cardLavori").onclick = () =>{
    alert("Qui comparirà il popup dei lavori aperti");
};

document.getElementById("cardRevisioni").onclick = () =>{
    alert("Lista revisioni");
};

document.getElementById("cardSolleciti").onclick = () =>{
    alert("Importi da saldare");
};

document.getElementById("cardAgenda").onclick = () =>{
    alert("Appuntamenti di oggi");
};