const constant={
    DEFAULT_PRODUCT_IMAGE : "/images/image-dummy.png",
    menus: [
        {
            name: "SPECIAL SERIES",
            path: '/special-series',
            items: [
                {name: "ASUS TUF BTF", path: 'asus-tuf-btf'},
                {name: "BON BON SERIES", path: 'bon-bon-series', items:[{name: "MIJ Rose", path: 'mij-rose',}]},
                {name: "MIJ TIKK", path: 'mij-tikk'},

            ]
        },
        {
            name: "DESKTOP PC", 
            path: 'desktop-pc',
            items: [
                {name: "PC GAMING/ EDITING/ DESAIN", path: 'pc-gaming-editing-desain',
                    items:[
                        {name: "MIJ BASIC", path: 'mij-basic',},
                        {name: "MIJ PRIME", path: 'mij-prime',},
                        {name: "MIJ CORE", path: 'mij-core',},
                        {name: "MIJ VEIL", path: 'mij-veil',},
                        {name: "MIJ ESSENCE", path: 'mij-essence',},
                        {name: "MIJ CRUX", path: 'mij-crux',},
                        {name: "MIJ MIST", path: 'mij-mist',},
                        {name: "MIJ SLEEK", path: 'mij-sleek',},
                    ]
                },
                {name: "PC GAMING MINI-ITX", path: 'pc-gaming-mini-itx', items:[{name: "MIJ PYGMY", path: 'mij-pygmy',}, {name: "MIJ WEE", path: 'mij-wee',}]},
                {name: "PC GAMING MURAH", path: 'pc-gaming-murah', items:[{name: "MIJ REDUC", path: 'mij-reduc',}]},
                {name: "PC OFFICE/ KANTOR", path: 'pc-office-atau-kantor', items:[{name: "MIJ ECO", path: 'mij-eco',}]},
                
            ]
        },
        {
            name: "KOMPONEN PC",
            path:'komponen-pc',
            items: [
                {name: "CPU", path: 'cpu'},
                {name: "MOTHERBOARD", path: 'motherboard'},
                {name: "RAM", path: 'ram'},
                {name: "VGA", path: 'vga'},
                {name: "SSD", path: 'ssd'},
                {name: "HDD", path: 'hdd'},
                {name: "PSU", path: 'psu'},
                {name: "HSF HEATSINK FAN", path: 'hsf-heatsink-fan'},
                {name: "AIO LIQUID COOLER", path: 'aio-liquid-cooler'},
                {name: "FAN CASING", path: 'fan-casing'},
                {name: "CASE", path: 'case'},
                {name: "OS", path: 'os'},
                {name: "PERIPHERAL", path: 'peripheral'},
                {name: "UPS", path: 'ups'},
            ]
        },
        {
            name: "MONITOR",
            path:'komponen-pc',
        },
        {
            name: "RAKIT PC",
            path:'rakit-pc',
        },
        {
            name: "PORTOFOLIO",
            path:'portofolio',
        },
        {
            name: "CONTACT US",
            path:'contact-us',
        }
    ]
}
export default constant