const fs = require('fs');

const dir1 = './car1';
const dir2 = './car2';
const dir3 = './car1/stream';
const dir4 = './car2/stream';
const folder = './merged'

function sleep(e) {
    return new Promise(resolve => setTimeout(resolve, e));
  }

if(!fs.existsSync(dir1)) {
    return console.log('Please ensure both folders are named car1 and car2. Car1 not detected!')
}
if(!fs.existsSync(dir2)) {
    return console.log('Please ensure both folders are named car1 and car2. Car1 not detected!')
}
if(!fs.existsSync(dir3)) {
    return console.log('Car1 does not have a stream folder! Ensure it is named "stream"')
}
if(!fs.existsSync(dir4)) {
    return console.log('Car1 does not have a stream folder! Ensure it is named "stream"')
}
if(fs.existsSync(folder)) {
    return console.log('There is already a merged folder! Please delete it or rename it before running the script again')
}

fs.mkdir('./merged', (err) => {
    if(err) console.log(err);
});
const car1Names = fs.readdirSync(dir3);

fs.mkdir('./merged/stream', (err) => {
    if(err) console.log(err);
});
const f2 = './merged/stream'

var i;
for (i=0; i < car1Names.length; i++) {
    const fileExtension = car1Names[i].split('.')[1];
    if(fileExtension === 'ytd' || fileExtension === 'yft') {
        fs.copyFileSync(`${dir3}/${car1Names[i]}`, `${f2}/${car1Names[i]}`, (err) => {
            if(err) console.log(err);
        })
    }
    else {
        console.log(`Skipped file ${car1Names[i]}`)
    }
    
}

const car2Names = fs.readdirSync(dir4);

var e;

for (e=0; e < car2Names.length; e++) {
    const fileExtension = car2Names[e].split('.')[1];
    if(fileExtension === 'ytd' || fileExtension === 'yft') {
        fs.copyFileSync(`${dir4}/${car2Names[e]}`, `${f2}/${car2Names[e]}`, (err) => {
            if(err) console.log(err);
        })
    }
    else {
        console.log(`Skipped file ${car2Names[e]}`)
    }
    
}

const veh1 = `${__dirname}/car1/vehicles.meta`;
const veh2 = `${__dirname}/car2/vehicles.meta`;
const han1 = `${__dirname}/car1/handling.meta`;
const han2 = `${__dirname}/car2/handling.meta`;
const carc1 = `${__dirname}/car1/carcols.meta`;
const carc2 = `${__dirname}/car2/carcols.meta`;
const carv1 = `${__dirname}/car1/carvariations.meta`;
const carv2 = `${__dirname}/car2/carvariations.meta`;

if (veh1 && veh2) {
    try {

    fs.mkdir('./cache', (err) => {
        if(err) console.log(err);
    });

    fs.copyFileSync(`${veh1}`, `${folder}/vehicles.meta`, (err) => {
        if(err) console.log(`${err} 1`);
    })

    fs.copyFileSync(`${veh1}`, `./cache/vehicle1.txt`, (err) => {
        if(err) console.log(`${err} 2`);
    })

    const contents = fs.readFileSync(`./cache/vehicle1.txt`).toString();
    let a = contents;
    const b = a.split('</InitDatas>')[1];
    a = a.split('</InitDatas>')[0];

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const contents2 = fs.readFileSync(`${veh2}`).toString();
    let e = contents2;
    e = e.split('<InitDatas>')[1];
    let txt = e.split('<txdRelationships>')[1];
    txt = txt.split('</txdRelationships>')[0];
    e = e.split('</InitDatas>')[0];
    fs.writeFileSync('./cache/vehicle1.txt', a + e + '</InitDatas>'+ b, (err) => {
        if(err) console.log(`${err} writing vehicle1`);
    })

    const ye = fs.readFileSync('./cache/vehicle1.txt').toString();
    let f = ye.split('</txdRelationships>')[0];

    fs.writeFileSync('./cache/vehicle1.txt', f + txt + '</txdRelationships>'+ '\n\n' + '</CVehicleModelInfo__InitDataList>', (err) => {
        if(err) console.log(`${err} writing txdRelationships`);
    })

    fs.writeFileSync('./merged/vehicles.meta', fs.readFileSync('./cache/vehicle1.txt'), (err) => {
        if(err) console.log(`${err} writing vehicle1.txt`);
    })
}
catch {
    console.log('missing vehicle.meta proceeding without')
}

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



}

if (han1 && han2) {
    try{ 
        fs.mkdir('./cache', (err) => {
            if(err);
        });
    
        fs.copyFileSync(`${han1}`, `${folder}/handling.meta`, (err) => {
            if(err) console.log(`${err} copying handling meta`);
        })
    
        fs.copyFileSync(`${han1}`, `./cache/handle1.txt`, (err) => {
            if(err) console.log(`${err} handle1`);
        })
    
        const contents = fs.readFileSync(`./cache/handle1.txt`).toString();
        let a = contents;
        const b = a.split('</HandlingData>')[1];
        a = a.split('</HandlingData>')[0];
    
        // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
        const contents2 = fs.readFileSync(`${han2}`).toString();
        let e = contents2;
        e = e.split('<HandlingData>')[1];
        e = e.split('</HandlingData>')[0];
        fs.writeFileSync('./cache/handle1.txt', a + e + '</HandlingData>'+ b, (err) => {
            if(err) console.log(`${err} writing handle1`);
        })
        const ye = fs.readFileSync('./cache/handle1.txt').toString();
        fs.writeFileSync('./merged/handling.meta', fs.readFileSync('./cache/handle1.txt'), (err) => {
            if(err) console.log(`${err} writing handle1.txt`);
        })
    }
    catch {
        console.log('no handling files');
    }

    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

if (carv1 && carv2) {
    try{
        fs.mkdir('./cache', (err) => {
            if(err);
        });
    
        fs.copyFileSync(`${carv1}`, `${folder}/carvariations.meta`, (err) => {
            if(err) console.log(`${err} carvariations`);
        })
    
        fs.copyFileSync(`${carv1}`, `./cache/carv1.txt`, (err) => {
            if(err) console.log(`${err} carv1`);
        })
    
        const contents = fs.readFileSync(`./cache/carv1.txt`).toString();
        let a = contents;
        const b = a.split('</variationData>')[1];
        a = a.split('</variationData>')[0];
    
        // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
        const contents2 = fs.readFileSync(`${carv2}`).toString();
        let e = contents2;
        e = e.split('<variationData>')[1];
        e = e.split('</variationData>')[0];
        fs.writeFileSync('./cache/carv1.txt', a + e + '</variationData>'+ b, (err) => {
            if(err) console.log(`${err} writing carv1`);
        })
        const ye = fs.readFileSync('./cache/carv1.txt').toString();
        fs.writeFileSync('./merged/carvariations.meta', fs.readFileSync('./cache/carv1.txt'), (err) => {
            if(err) console.log(`${err} writing carv1`);
        })
    }
    catch {
        try{
            fs.readFileSync(carv1)
            console.log('carv 1 good')
        }
        catch {
            console.log('carv 1 fail')
        }
        try{
            fs.readFileSync(carv2)
            console.log('carv 2 good')
        }
        catch {
            console.log('carv 2 fail')
        }
    }


    // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



}

if (carc1 && carc2) {
    try{
    fs.mkdir('./cache', (err) => {
        if(err);
    });

    fs.copyFileSync(`${carc1}`, `${folder}/carcols.meta`, (err) => {
        if(err) console.log(`${err} carcols`);
    })

    fs.copyFileSync(`${carc1}`, `./cache/carc1.txt`, (err) => {
        if(err) console.log(`${err} carc`);
    })

    const contents = fs.readFileSync(`./cache/carc1.txt`).toString();
    let sirens = contents;
    let kits = contents;
    let lights = contents;
    try {
        let pre = kits.split('<Kits>')[0];
        kits = kits.split('<Kits>')[1];  
        kits = kits.split('</Kits>')[0];
    }
    catch {
        kits = ' '
    }
    try {
        lights = lights.split('<Lights>')[1];
        lights = lights.split('</Lights>')[0];
    }
    catch {
        lights = ' '
    }
    try{ 
        sirens = sirens.split('<Sirens>')[1];
        sirens = sirens.split('</Sirens>')[0];
    }
    catch {
        sirens = ' '
    }
      

    const contents2 = fs.readFileSync(`${carc2}`).toString();
    let k = contents2;
    let e = contents2;
    let p = contents2;
    try {
        e = e.split('<Kits>')[1];
        e = e.split('</Kits>')[0];
    }
    catch {
        e = ' '
    }
    try {
        k = k.split('<Lights>')[1];
        k = k.split('</Lights>')[0];
    }
    catch {
        k = ' '
    }
    try {
        p = p.split('<Sirens>')[1];
        p = p.split('</Sirens>')[0];
    }
    catch {
       p = ' '
    }
    const pre = '<?xml version="1.0" encoding="UTF-8"?>\n<CVehicleModelInfoVarGlobal>'

    fs.writeFileSync('./cache/carc1.txt', pre + '<Kits>' + kits + e + '</Kits>'+ '\n\n' + '<Lights>' + lights + k + '</Lights>' + '\n\n' + '<Sirens>' + sirens + p + '</Sirens>' + '\n\n' + '</CVehicleModelInfoVarGlobal>', (err) => {
        if(err) console.log(`${err} writing carc1`);
    })
    fs.writeFileSync(`${folder}/carcols.meta`, fs.readFileSync('./cache/carc1.txt'), (err) => {
        if(err) console.log(`${err} writing carc1.txt`);
    })
    }
    catch {
        console.log('missing carcols proceeding without')
    }

}

fs.copyFileSync(`./assets/fxmanifest.lua`, `${folder}/fxmanifest.lua`, (err) => {
    if(err) console.log(err);
})

const del = fs.readdirSync('./cache')
var i;
for (i=0; i < del.length; i++) {
    fs.unlink(`./cache/${del[i]}`, (err) => {
        if(err) console.log(`${err} unlinking`);
    })
    
}
sleep(1000);

fs.rmdir('./cache', (err) => {
    if(err) console.log(`${err} deleting cache folder`);
})

console.log('Finished')
