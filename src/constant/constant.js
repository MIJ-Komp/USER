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
    ],
    componentTypeCode:{
       processor: 'cpu',
       motherboard: 'motherboard',
       ram: 'ram',
       gpu: 'gpu',
       storage: 'storage',
       psu: 'psu',
       case: 'case',
       cpuCooler: 'cpucooler',
       caseFan: 'casefan',
       monitor: 'monitor',
    },
   
  specKeys: [
    // 🔹 PROCESSOR
    { label: 'CPU Brand', value: 'processor_brand', groupId: 'CPU' },
    { label: 'CPU Model', value: 'processor_model', groupId: 'CPU' },
    { label: 'CPU Socket', value: 'processor_socket', groupId: 'CPU' },
    { label: 'CPU Generation', value: 'processor_generation', groupId: 'CPU' },
    { label: 'CPU Cores', value: 'processor_cores', groupId: 'CPU' },
    { label: 'CPU Threads', value: 'processor_threads', groupId: 'CPU' },
    { label: 'Base Clock Speed (GHz)', value: 'processor_base_clock', groupId: 'CPU' },
    { label: 'Boost Clock Speed (GHz)', value: 'processor_boost_clock', groupId: 'CPU' },
    { label: 'TDP (Watt)', value: 'processor_tdp_watt', groupId: 'CPU' },
    { label: 'Supported RAM Type', value: 'processor_supported_ram_type', groupId: 'CPU' },
    { label: 'Max Memory Supported (GB)', value: 'processor_max_memory', groupId: 'CPU' },
    { label: 'PCIe Version Supported', value: 'processor_pcie_version', groupId: 'CPU' },
    { label: 'Integrated Graphics', value: 'processor_integrated_graphics', groupId: 'CPU' },
    { label: 'Supported Chipsets', value: 'processor_supported_chipsets', groupId: 'CPU' },

    // 🔹 MOTHERBOARD
    { label: 'Motherboard Socket', value: 'motherboard_socket', groupId: 'MOTHERBOARD' },
    { label: 'Motherboard Chipset', value: 'motherboard_chipset', groupId: 'MOTHERBOARD' },
    { label: 'Form Factor', value: 'motherboard_form_factor', groupId: 'MOTHERBOARD' },
    { label: 'RAM Type Supported', value: 'motherboard_supported_ram_type', groupId: 'MOTHERBOARD' },
    { label: 'Number of RAM Slots', value: 'motherboard_ram_slots', groupId: 'MOTHERBOARD' },
    { label: 'Max RAM per Slot (GB)', value: 'motherboard_max_ram_per_slot', groupId: 'MOTHERBOARD' },
    { label: 'Total Max RAM (GB)', value: 'motherboard_total_max_ram', groupId: 'MOTHERBOARD' },
    { label: 'Max RAM Speed (MHz)', value: 'motherboard_max_ram_speed', groupId: 'MOTHERBOARD' },
    { label: 'PCIe Version', value: 'motherboard_pci_version', groupId: 'MOTHERBOARD' },
    { label: 'Storage Interfaces', value: 'motherboard_storage_interfaces', groupId: 'MOTHERBOARD' },
    { label: 'Supported CPU Generations', value: 'motherboard_supported_generations', groupId: 'MOTHERBOARD' },
    { label: 'Motherboard Ram Voltage', value: 'motherboard_ram_voltage', groupId: 'MOTHERBOARD' },

    // 🔹 RAM
    { label: 'RAM Type', value: 'ram_ram_type', groupId: 'RAM' },
    { label: 'RAM Capacity (GB)', value: 'ram_capacity', groupId: 'RAM' },
    { label: 'RAM Speed (MHz)', value: 'ram_ram_speed', groupId: 'RAM' },
    { label: 'RAM Voltage (V)', value: 'ram_ram_voltage', groupId: 'RAM' },
    { label: 'RAM Module Count', value: 'ram_module_count', groupId: 'RAM' },
    { label: 'RAM Module Type', value: 'ram_module_type', groupId: 'RAM' },

    // 🔹 GPU
    { label: 'GPU Model', value: 'gpu_model', groupId: 'GPU' },
    { label: 'GPU PCIe Version', value: 'gpu_pci_version', groupId: 'GPU' },
    { label: 'GPU Length (mm)', value: 'gpu_length_mm', groupId: 'GPU' },
    { label: 'Recommended PSU Wattage', value: 'gpu_recommended_psu_watt', groupId: 'GPU' },
    { label: 'VRAM (GB)', value: 'gpu_vram', groupId: 'GPU' },

    // 🔹 PSU
    { label: 'PSU Wattage', value: 'psu_wattage', groupId: 'PSU' },
    { label: 'PSU Form Factor', value: 'psu_form_factor', groupId: 'PSU' },
    { label: 'PSU Efficiency Rating', value: 'psu_efficiency', groupId: 'PSU' },

    // 🔹 STORAGE
    { label: 'Storage Interface', value: 'storage_interface', groupId: 'STORAGE' },
    { label: 'Storage Form Factor', value: 'storage_form_factor', groupId: 'STORAGE' },
    { label: 'Storage Capacity (GB)', value: 'storage_capacity', groupId: 'STORAGE' },
    { label: 'NVMe Version', value: 'storage_nvme_version', groupId: 'STORAGE' },

    // 🔹CPU Cooler
    { label: 'Supported Sockets', value: 'CpuCooler_supported_sockets', groupId: 'CpuCooler' },
    { label: 'CpuCooler Height (mm)', value: 'CpuCooler_height_mm', groupId: 'CpuCooler' },
    { label: 'Max TDP Supported (W)', value: 'CpuCooler_max_tdp_supported', groupId: 'CpuCooler' },

    // 🔹 CASE FAN
    { label: 'Fan Size (mm)', value: 'casefan_size_mm', groupId: 'CASEFAN' },
    { label: 'Fan Speed (RPM)', value: 'casefan_speed_rpm', groupId: 'CASEFAN' },
    { label: 'Airflow (CFM)', value: 'casefan_airflow_cfm', groupId: 'CASEFAN' },
    { label: 'Noise Level (dBA)', value: 'casefan_noise_dba', groupId: 'CASEFAN' },
    { label: 'Connector Type', value: 'casefan_connector', groupId: 'CASEFAN' },
    { label: 'RGB Lighting', value: 'casefan_rgb', groupId: 'CASEFAN' },
    { label: 'Bearing Type', value: 'casefan_bearing_type', groupId: 'CASEFAN' },
    { label: 'Rated Voltage (V)', value: 'casefan_voltage_v', groupId: 'CASEFAN' },
    { label: 'Static Pressure (mmH₂O)', value: 'casefan_static_pressure', groupId: 'CASEFAN' },

    // 🔹 CASE
    { label: 'Supported Mobo Sizes', value: 'case_supported_form_factors', groupId: 'CASE' },
    { label: 'Max GPU Length (mm)', value: 'case_max_gpu_length', groupId: 'CASE' },
    { label: 'Max CpuCooler Height (mm)', value: 'case_max_CpuCooler_height', groupId: 'CASE' },
    { label: 'PSU Form Factor', value: 'case_psu_form_factor', groupId: 'CASE' },
    { label: 'Drive Bay Sizes Supported', value: 'case_drive_bay_support', groupId: 'CASE' },

    // 🔹 SYSTEM (Virtual)
    { label: 'Total Power Requirement (W)', value: 'system_total_power_requirement', groupId: 'SYSTEM' }
   ],
   label:{
    error:{
        required: "Tidak boleh kosong",
        email: "Email tidak valid",
        minLength: "Harus minimal {value} karakter",
        maxLength: "Maksimal hanya {value} karakter",
        min: "Harus lebih besar atau sama dengan {value}",
        max: "Harus lebih kecil atau sama dengan {value}",
    }
   },
   productType:{
    group: 'group',
    single: 'single'
   }
}
export default constant