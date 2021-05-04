
const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedhelpers");
const Starport = require("../models/starport");

mongoose.connect("mongodb://localhost:27017/astralis", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const sample = array => array[Math.floor(Math.random() * array.length)];
const seedImages = [
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620109747/Astralis/night-skies3_buqjcd.jpg",
        filename: "Astralis/night-skies3_buqjcd"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620109755/Astralis/night-skies2_lxw4sh.jpg",
        filename: "Astralis/night-skies2_lxw4sh"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620109756/Astralis/night-skies1_dprorb.jpg",
        filename: "Astralis/night-skies1_dprorb"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620109757/Astralis/night-skies7_hlj8ek.jpg",
        filename: "Astralis/night-skies7_hlj8ek"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620109766/Astralis/night-skies6_kqv0mt.jpg",
        filename: "Astralis/night-skies6_kqv0mt"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620109768/Astralis/night-skies4_ndmkkf.jpg",
        filename: "Astralis/night-skies4_ndmkkf"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620109775/Astralis/night-skies10_hywhao.jpg",
        filename: "Astralis/night-skies10_hywhao"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620109779/Astralis/night-skies15_ouh46h.jpg",
        filename: "Astralis/night-skies15_ouh46h"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620109783/Astralis/night-skies9_c8xtt3.jpg",
        filename: "Astralis/night-skies9_c8xtt3"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620109791/Astralis/night-skies14_bekyyn.jpg",
        filename: "Astralis/night-skies14_bekyyn"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620109795/Astralis/night-skies12_zzgirj.jpg",
        filename: "Astralis/night-skies12_zzgirj"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620109797/Astralis/night-skies16_pgg7vd.jpg",
        filename: "Astralis/night-skies16_pgg7vd"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620109804/Astralis/night-skies8_zd78hd.jpg",
        filename: "Astralis/night-skies8_zd78hd"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620109806/Astralis/night-skies11_udvr0m.jpg",
        filename: "Astralis/night-skies11_udvr0m"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620111330/Astralis/night-skies17_yizuhy.jpg",
        filename: "Astralis/night-skies17_yizuhy"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620155864/Astralis/night-skies18_rkkodn.jpg",
        filename: "Astralis/night-skies18_rkkodn"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620155900/Astralis/night-skies19_rsb5cw.jpg",
        filename: "Astralis/night-skies19_rsb5cw"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620155854/Astralis/night-skies20_e6fl6q.jpg",
        filename: "Astralis/night-skies20_e6fl6q"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620155853/Astralis/night-skies21_mra4fz.jpg",
        filename: "Astralis/night-skies21_mra4fz"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620155866/Astralis/night-skies22_m4gwla.jpg",
        filename: "Astralis/night-skies22_m4gwla"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620155880/Astralis/night-skies23_qvc4td.jpg",
        filename: "Astralis/night-skies23_qvc4td"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620155861/Astralis/night-skies24_wftlvf.jpg",
        filename: "Astralis/night-skies24_wftlvf"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620155899/Astralis/night-skies25_ap004s.jpg",
        filename: "Astralis/night-skies25_ap004s"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620155877/Astralis/night-skies26_nsuclj.jpg",
        filename: "Astralis/night-skies26_nsuclj"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620155870/Astralis/night-skies27_ykoqmu.jpg",
        filename: "Astralis/night-skies27_ykoqmu"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620155905/Astralis/night-skies28_hurlzy.jpg",
        filename: "Astralis/night-skies28_hurlzy"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620155884/Astralis/night-skies29_whlp90.jpg",
        filename: "Astralis/night-skies29_whlp90"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620155900/Astralis/night-skies30_ww8d5r.jpg",
        filename: "Astralis/night-skies30_ww8d5r"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620155883/Astralis/night-skies32_apdhbp.jpg",
        filename: "Astralis/night-skies32_apdhbp"
    },
    {
        url: "https://res.cloudinary.com/saguarosmart/image/upload/v1620155898/Astralis/night-skies33_jolpes.jpg",
        filename: "Astralis/night-skies33_jolpes"
    }
];


const seedDB = async () => {
    await Starport.deleteMany({});

    for (let i = 0; i < 100; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const starport = new Starport({
            author: "6087a5827da4bf65aeab8773",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: { 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ], 
                type: 'Point' 
            },
            images: [
                sample(seedImages)
            ],
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae sequi fugit cumque necessitatibus! Quod, fuga?",
            price
        });
        await starport.save();
    }
};


seedDB().then(() => mongoose.connection.close());
