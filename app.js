function loadImage(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const res = event.target.result;
                resolve(res);
            }
            const file = this.response;
            reader.readAsDataURL(file);
        }
        xhr.send();
    });
}

let signaturePad = null;

window.addEventListener('load', async () => {

    const canvas = document.querySelector("canvas");
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;

    signaturePad = new SignaturePad(canvas, {});

    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let jefe = document.getElementById('jefe').value;
        let nombres = document.getElementById('nombre').value;
        let area = document.getElementById('area').value;
        let dg = document.getElementById('dg').value;
        let fecha_i = document.getElementById('fecha_i').value;
        let fecha_t = document.getElementById('fecha_t').value;
        let n_hrs = document.getElementById('n_hrs').value;
        let n_hrs_p = document.getElementById('n_hrs_p').value;
        let n_dias_p = document.getElementById('n_dias_p').value;
        let observ1 = document.getElementById('observ1').value;
        let observ2 = document.getElementById('observ2').value;
        
        let xduelo = document.querySelector('input[name="xduelo"]:checked').value;
        let enfermedad = document.querySelector('input[name="enfermedad"]:checked').value;
        let gsueldo = document.querySelector('input[name="gsueldo"]:checked').value;
        let xhoras = document.querySelector('input[name="xhoras"]:checked').value;
        let personal = document.querySelector('input[name="personal"]:checked').value;
        let otros = document.querySelector('input[name="otros"]:checked').value;
        let sgsueldo = document.querySelector('input[name="sgsueldo"]:checked').value;
        let xdias = document.querySelector('input[name="xdias"]:checked').value;
        let ef_horario = document.querySelector('input[name="ef_horario"]:checked').value;
        let sf_horario = document.querySelector('input[name="sf_horario"]:checked').value;
        



        

        generatePDF(jefe, nombres, area, dg, fecha_i, fecha_t, n_hrs, xduelo, enfermedad, gsueldo, xhoras, personal, otros, sgsueldo, xdias, n_hrs_p, n_dias_p, ef_horario, observ1, sf_horario, observ2);
    })

});

async function generatePDF(jefe, nombres, area, dg, fecha_i, fecha_t, n_hrs, xduelo, enfermedad, gsueldo, xhoras, personal, otros, sgsueldo, xdias, n_hrs_p, n_dias_p, ef_horario, observ1, sf_horario, observ2) {
    const image = await loadImage("pase_salida.png");
    const signatureImage = signaturePad.toDataURL();

    const pdf = new jsPDF('p', 'pt', 'letter');

    pdf.addImage(image, 'PNG', 0, 0, 630, 460);
    pdf.addImage(signatureImage, 'PNG', 50, 389, 200, 60); 

    pdf.setFontSize(12);
    pdf.text(jefe, 165, 115);

    const date = new Date();
    pdf.text(date.getUTCDate().toString(), 445, 100);
    pdf.text((date.getUTCMonth() + 1).toString(), 465, 100);
    pdf.text(date.getUTCFullYear().toString(), 475, 100);

    pdf.setFontSize(11);
    pdf.text(nombres, 165, 100);
    pdf.text(area, 165, 130);
    pdf.text(fecha_i, 445, 115);
    pdf.text(fecha_t, 445, 130);
    pdf.text(dg, 170, 143);
    pdf.text(n_hrs, 465, 143);
    pdf.text(n_hrs_p, 525, 292);
    pdf.text(n_dias_p, 525, 320);
    pdf.text(observ1, 255, 341);
    pdf.text(observ2, 255, 359);

    pdf.setFillColor(0,0,0);

    if (parseInt(xduelo) === 0) {
        
    } else {
        pdf.circle(142, 288, 4, 'FD');
        
    }
     if (parseInt(enfermedad) === 0) {
        
    } else {
        pdf.circle(245, 288, 4, 'FD');
        
    }

     if (parseInt(gsueldo) === 0) {
        
    } else {
        pdf.circle(348, 288, 4, 'FD');
        
    }

      if (parseInt(xhoras) === 0) {
        
    } else {
        pdf.circle(445, 288, 4, 'FD');
        
    }

     if (parseInt(personal) === 0) {
        
    } else {
        pdf.circle(142, 315, 4, 'FD');
        
    }

      if (parseInt(otros) === 0) {
        
    } else {
        pdf.circle(245, 315, 4, 'FD');
        
    }

      if (parseInt(sgsueldo) === 0) {
        
    } else {
        pdf.circle(348, 315, 4, 'FD');
        
    }

    if (parseInt(xdias) === 0) {
        
    } else {
        pdf.circle(445, 315, 4, 'FD');
        
    }

     if (parseInt(ef_horario) === 0) {
        
    } else {
        pdf.circle(182, 341, 4, 'FD');
        
    }
    if (parseInt(sf_horario) === 0) {
        
    } else {
        pdf.circle(182, 358, 4, 'FD');
        
    }





    pdf.save("example.pdf");

}