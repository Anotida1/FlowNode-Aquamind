export const topicData: Record<
    string,
    {
        title: string
        description: string
        level: string
        sections: {
            title: string
            text: string
        }[]
    }
> = {
    "water-basics": {
        title: "Water Basics",
        description:
            "Build a strong foundation for understanding water, why it is essential for life, and why usable freshwater is a limited resource.",
        level: "Beginner",
        sections: [
            {
                title: "Why does water matter?",
                text: "Water is essential for every known form of life. Humans need water for drinking, digestion, temperature regulation, hygiene and sanitation. Plants need water for photosynthesis, nutrient transport and growth, while animals depend on it for drinking and maintaining body functions. Water is also important for agriculture, industry, energy production and ecosystems.",
            },
            {
                title: "How much water is on Earth?",
                text: "Earth has a large amount of water, but most of it is saltwater found in oceans and seas. Only a small fraction is freshwater, and much of that freshwater is frozen in glaciers and ice sheets or stored underground. The amount of freshwater that is easily accessible in rivers, lakes and shallow groundwater is therefore relatively small.",
            },
            {
                title: "Freshwater vs saltwater",
                text: "Saltwater contains significant amounts of dissolved salts and is found mainly in oceans and seas. Freshwater contains much less dissolved salt and occurs in rivers, lakes, glaciers, soil moisture and groundwater. Freshwater is the main source used by people, agriculture and many land-based ecosystems.",
            },
            {
                title: "Is water renewable?",
                text: "Water is continuously recycled through the water cycle, making it a renewable resource. However, freshwater is not unlimited in every location. A community can experience water scarcity when water is being used faster than it is naturally replenished, when pollution makes water unsafe, or when rainfall patterns change.",
            },
            {
                title: "Water and everyday life",
                text: "Water is involved in almost everything people do. Beyond drinking and washing, it is used to grow food, produce electricity, manufacture products and support ecosystems. This means that conserving water can help protect both human communities and the natural environment.",
            },
        ],
    },

    "water-cycle": {
        title: "The Water Cycle",
        description:
            "Discover how water continuously moves between Earth's surface, atmosphere, soil and underground.",
        level: "Beginner",
        sections: [
            {
                title: "What is the water cycle?",
                text: "The water cycle describes the continuous movement of water through Earth's atmosphere, surface and underground. Water changes between liquid, solid and gas as it moves through processes such as evaporation, condensation, precipitation, infiltration, runoff and transpiration.",
            },
            {
                title: "Evaporation",
                text: "Energy from the Sun heats water on surfaces such as oceans, rivers, lakes and wet soil. Some water molecules gain enough energy to escape from the liquid and enter the atmosphere as water vapour. Evaporation is one of the main ways water enters the atmosphere.",
            },
            {
                title: "Condensation",
                text: "When water vapour rises into cooler parts of the atmosphere, it loses energy and can change back into tiny liquid droplets. These droplets can gather around microscopic particles in the air and contribute to the formation of clouds.",
            },
            {
                title: "Precipitation",
                text: "When water droplets or ice crystals in clouds become large and heavy enough, they fall toward Earth's surface. Precipitation can occur as rain, snow, sleet or hail depending on atmospheric conditions.",
            },
            {
                title: "Runoff",
                text: "Some precipitation flows across the land instead of soaking into the ground. This surface movement is called runoff. Runoff can enter streams, rivers and lakes, eventually carrying water toward larger bodies of water.",
            },
            {
                title: "Infiltration",
                text: "Some water from rainfall or surface water enters the soil. This process is called infiltration. Water that moves deeper underground can contribute to groundwater and may eventually recharge aquifers.",
            },
            {
                title: "Transpiration",
                text: "Plants absorb water through their roots and transport it throughout their tissues. Some of this water eventually leaves the plant as water vapour through tiny openings called stomata in the leaves. The release of water vapour by plants is called transpiration.",
            },
            {
                title: "Why the cycle matters",
                text: "The water cycle naturally redistributes water around the planet. However, human activities such as deforestation, urbanisation, pollution and excessive groundwater pumping can affect how much water infiltrates, runs off, evaporates or remains available for use.",
            },
        ],
    },

    groundwater: {
        title: "Groundwater",
        description:
            "Explore the water stored beneath Earth's surface, how it moves underground and why it matters to people and ecosystems.",
        level: "Intermediate",
        sections: [
            {
                title: "What is groundwater?",
                text: "Groundwater is water found beneath Earth's surface in spaces and cracks within soil, sediment and rock. It usually comes from precipitation or surface water that infiltrates into the ground. Groundwater can remain underground for days, years or even much longer depending on local geological conditions.",
            },
            {
                title: "Aquifers",
                text: "An aquifer is a body of rock, sediment or other geological material that can store and transmit groundwater. Some aquifers are shallow and can be replenished relatively quickly, while deeper aquifers may contain water that has accumulated over much longer periods.",
            },
            {
                title: "Groundwater recharge",
                text: "Recharge occurs when water moves from the surface into underground water stores. Rainfall, rivers and lakes can contribute to recharge when water infiltrates through soil and reaches the groundwater system.",
            },
            {
                title: "Wells and groundwater use",
                text: "People can access groundwater using wells and boreholes. Groundwater is often used for drinking, irrigation and livestock. However, pumping water faster than an aquifer can naturally recharge can cause groundwater levels to fall.",
            },
            {
                title: "Groundwater and pollution",
                text: "Pollutants on the surface can sometimes enter groundwater through infiltration. Chemicals, poorly managed waste, sewage and agricultural pollutants can contaminate underground water. Groundwater contamination can be difficult to detect and clean because pollutants may move slowly through underground materials.",
            },
        ],
    },

    "water-conservation": {
        title: "Water Conservation",
        description:
            "Learn how responsible water use can reduce waste, protect freshwater supplies and improve water security.",
        level: "Beginner",
        sections: [
            {
                title: "What is water conservation?",
                text: "Water conservation means using water efficiently and avoiding unnecessary waste. Conservation does not mean avoiding water completely; it means making sure that water is used for necessary purposes and that avoidable losses are reduced.",
            },
            {
                title: "Conserving water at home",
                text: "Simple actions can reduce household water waste. Fixing leaking taps and pipes, taking shorter showers, turning off taps while brushing teeth and using washing machines efficiently can all reduce unnecessary water use.",
            },
            {
                title: "Rainwater harvesting",
                text: "Rainwater harvesting involves collecting and storing rainwater for appropriate uses. Depending on local conditions and treatment requirements, harvested rainwater can be useful for activities such as watering gardens, cleaning or other non-drinking purposes.",
            },
            {
                title: "Why leaks matter",
                text: "A leaking pipe or tap can waste water continuously, even when nobody is actively using it. Regularly checking plumbing systems and repairing leaks can therefore be an effective way to reduce water loss.",
            },
            {
                title: "Conservation in agriculture",
                text: "Agriculture uses large amounts of freshwater in many regions. Efficient irrigation methods, appropriate watering schedules, soil moisture monitoring, mulching and selecting crops suited to local conditions can help reduce unnecessary water use.",
            },
            {
                title: "Water conservation and communities",
                text: "Conservation becomes especially important during droughts or periods of low rainfall. When households, farms, businesses and public institutions reduce unnecessary water use, more water can remain available for essential needs and ecosystems.",
            },
        ],
    },

    "water-agriculture": {
        title: "Water & Agriculture",
        description:
            "Understand how water interacts with soil, crops, irrigation and food production.",
        level: "Intermediate",
        sections: [
            {
                title: "Why do crops need water?",
                text: "Plants require water for photosynthesis, transporting dissolved nutrients, maintaining cell structure and controlling temperature. Water is absorbed mainly through the roots and transported through the plant's vascular tissues.",
            },
            {
                title: "Water and photosynthesis",
                text: "Water is one of the raw materials used during photosynthesis. Plants combine water and carbon dioxide using light energy to produce glucose and release oxygen. Without sufficient water, photosynthesis and plant growth can be reduced.",
            },
            {
                title: "Soil moisture",
                text: "Soil moisture is the water stored within soil pores. Plants can access some of this water through their roots. If soil becomes too dry, plants may experience water stress. If soil remains waterlogged, roots may struggle to obtain enough oxygen.",
            },
            {
                title: "Irrigation",
                text: "Irrigation supplies water to crops when rainfall does not provide enough moisture. Common methods include surface irrigation, sprinklers and drip irrigation. The appropriate method depends on factors such as soil type, crop requirements, available water and cost.",
            },
            {
                title: "Water stress in crops",
                text: "When a plant loses water faster than it can replace it, it can experience water stress. Signs may include wilting, reduced growth, leaf curling and, in severe cases, crop failure. Water stress can occur during drought or when irrigation is insufficient.",
            },
            {
                title: "Using water efficiently",
                text: "Farmers can improve water efficiency by watering crops when they need it, monitoring soil moisture, reducing evaporation and maintaining irrigation equipment. Mulching can also help reduce evaporation from the soil surface.",
            },
        ],
    },

    "water-quality": {
        title: "Water Quality",
        description:
            "Learn how physical, chemical and biological properties help us understand whether water is suitable for different uses.",
        level: "Intermediate",
        sections: [
            {
                title: "What is water quality?",
                text: "Water quality describes the physical, chemical and biological characteristics of water. The quality required depends on how the water will be used. Water suitable for irrigation may not meet the requirements for drinking, and water that supports one ecosystem may not be suitable for another.",
            },
            {
                title: "pH",
                text: "pH indicates how acidic or alkaline a water sample is. The pH scale commonly ranges from 0 to 14, with 7 being neutral at standard conditions. Natural water can have different pH values depending on the surrounding rocks, soil, biological activity and dissolved substances.",
            },
            {
                title: "Turbidity",
                text: "Turbidity describes how cloudy or unclear water appears because of suspended particles. High turbidity can be caused by soil, sediment, microorganisms or other particles. It can reduce light penetration in water and may indicate problems with erosion or contamination.",
            },
            {
                title: "Dissolved oxygen",
                text: "Dissolved oxygen is the amount of oxygen available in water. Aquatic organisms such as fish and many microorganisms depend on it for respiration. Low dissolved oxygen can occur when organic matter is decomposed by microorganisms or when water becomes excessively warm.",
            },
            {
                title: "Contamination",
                text: "Water can become contaminated by microorganisms, chemicals, heavy metals, sewage, agricultural runoff and industrial pollutants. Some contaminants can cause disease, while others can harm ecosystems or make water unsuitable for particular uses.",
            },
            {
                title: "Testing water",
                text: "Water quality can be investigated using measurements such as pH, turbidity, temperature, dissolved oxygen and electrical conductivity. Specific tests can also detect microorganisms or chemical contaminants. A single measurement cannot describe every aspect of water quality.",
            },
        ],
    },

    "rivers-watersheds": {
        title: "Rivers & Watersheds",
        description:
            "Understand how water moves across landscapes and how watersheds connect rainfall, streams, rivers, soil and communities.",
        level: "Intermediate",
        sections: [
            {
                title: "What is a river?",
                text: "A river is a natural flowing body of water that moves through a channel toward a lower elevation. Rivers can begin from springs, rainfall, melting snow or other sources and may eventually flow into lakes, wetlands, seas or oceans.",
            },
            {
                title: "The river system",
                text: "Rivers are connected systems rather than isolated channels. Small streams can join together to form larger rivers. These smaller streams are often called tributaries. Water and materials such as sediment can therefore move from small parts of a landscape into larger waterways.",
            },
            {
                title: "Runoff",
                text: "Runoff occurs when water flows across the land surface instead of infiltrating into the soil. The amount of runoff depends on rainfall intensity, soil type, vegetation, slope and how much of the ground surface is covered by buildings or other impermeable materials.",
            },
            {
                title: "Watersheds",
                text: "A watershed is an area of land where water drains toward a common outlet. Hills and higher areas often form boundaries between watersheds. Rain falling on different sides of a watershed boundary can eventually flow into completely different rivers or lakes.",
            },
            {
                title: "Human impacts on rivers",
                text: "Human activities can change river systems through pollution, dam construction, water extraction, land clearing and urban development. Removing vegetation can increase erosion and runoff, while pollution can reduce water quality downstream.",
            },
            {
                title: "Why watersheds matter",
                text: "Watersheds connect communities, farms, forests, wetlands and rivers. Activities upstream can affect water availability and quality downstream, which is why protecting water often requires cooperation across an entire watershed.",
            },
        ],
    },

    "climate-water": {
        title: "Climate & Water",
        description:
            "Explore how weather, climate, rainfall, drought and flooding influence the availability and movement of water.",
        level: "Advanced",
        sections: [
            {
                title: "Weather vs climate",
                text: "Weather describes atmospheric conditions over relatively short periods, such as today's rainfall or temperature. Climate describes long-term patterns and averages over many years. Both influence how water moves through the environment.",
            },
            {
                title: "Rainfall",
                text: "Rainfall is one of the major ways water returns from the atmosphere to Earth's surface. The amount, timing and intensity of rainfall influence rivers, groundwater recharge, soil moisture, agriculture and water supplies.",
            },
            {
                title: "Drought",
                text: "Drought occurs when an area experiences an extended period of unusually low water availability. Drought can affect crops, livestock, ecosystems, reservoirs and groundwater. Its effects depend on the severity, duration and characteristics of the affected region.",
            },
            {
                title: "Floods",
                text: "Flooding occurs when water covers land that is normally dry. Heavy rainfall, overflowing rivers, storm surges, blocked drainage and rapid snowmelt can contribute to flooding. Urban areas can experience increased runoff because roads and buildings prevent water from infiltrating into the ground.",
            },
            {
                title: "Climate and the water cycle",
                text: "Changes in temperature can influence evaporation, atmospheric moisture and precipitation patterns. A warmer atmosphere can hold more water vapour, which can affect rainfall patterns. The exact effects vary between regions and depend on local geography and atmospheric conditions.",
            },
            {
                title: "Water security",
                text: "Water security means having reliable access to sufficient quantities of safe water for people, ecosystems and important activities. Climate variability, population growth, pollution, infrastructure and changing rainfall patterns can all influence water security.",
            },
            {
                title: "Adapting to water challenges",
                text: "Communities can prepare for changing water conditions through measures such as improving water storage, protecting watersheds, using water efficiently, maintaining drainage systems, monitoring groundwater and developing plans for droughts and floods.",
            },
        ],
    },
}
