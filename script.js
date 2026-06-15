    import { db, auth } from "./firebase.js"
    import { doc, getDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
    import { signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

    const countries = [
    //Legend
        { name: "Brazil", tickets: 1, image: "Assets/Countries/BRAZIL.png", rarity: "legend" },
        { name: "Argentina", tickets: 3, image: "Assets/Countries/ARGENTINA.png", rarity: "legend" },
        { name: "France", tickets: 8, image: "Assets/Countries/FRANCE.png", rarity: "legend"},
    //Epic    
        { name: "Spain", tickets: 20, image:"Assets/Countries/SPAIN.png", rarity: "epic"},
        { name: "Morocco", tickets: 40, image: "Assets/Countries/MOROCCO.png", rarity: "epic"},
        { name: "Portugal", tickets: 80, image: "Assets/Countries/PORTUGAL.png", rarity: "epic"},
    //Rare    
        { name: "England", tickets: 150, image: "Assets/Countries/ENGLAND.png", rarity: "rare"},
        { name: "Germany", tickets: 200, image: "Assets/Countries/GERMANY.png", rarity: "rare"},
        { name: "Netherlands", tickets: 300, image: "Assets/Countries/NETHERLANDS.png", rarity: "rare" },
    //Common
        { name: "Belgium" ,tickets: 500, image: "Assets/Countries/BELGIUM.png", rarity: "common"},
        { name: "Australia", tickets: 1000, image: "Assets/Countries/AUSTRALIA.png", rarity: "common" },

        { name: "USA", tickets: 1000, image: "Assets/Countries/USA.png", rarity: "common"},
        { name: "Canada", tickets: 1000, image: "Assets/Countries/CANADA.png", rarity: "common"},
        { name: "Mexico", tickets: 1000, image: "Assets/Countries/MEXICO.png", rarity: "common"},
        
        { name: "Iraq", tickets: 1200, image: "Assets/Countries/IRAQ.png", rarity: "common" },
        { name: "Iran", tickets: 1200, image: "Assets/Countries/IRAN.png", rarity: "common" },
        { name: "Japan", tickets: 1200, image: "Assets/Countries/JAPAN.png", rarity: "common" },
        { name: "Jordan", tickets: 1200, image: "Assets/Countries/JORDAN.png", rarity: "common" },
        { name: "Korea Republic", tickets: 1200, image: "Assets/Countries/KOREA.png", rarity: "common" },
        { name: "Qatar", tickets: 1200, image: "Assets/Countries/QATAR.png", rarity: "common" },
        { name: "Saudi Arabia", tickets: 1200, image: "Assets/Countries/SAUDIARABIA.png", rarity: "common" },
        { name: "Uzbekistan", tickets: 1200, image: "Assets/Countries/UZBEKISTAN.png", rarity: "common" },
        
        { name: "Algeria", tickets: 1500, image: "Assets/Countries/ALGERIA.png", rarity: "common" },
        { name: "Cabo Verde", tickets: 1500, image: "Assets/Countries/CAPEVERDE.png", rarity: "common"},
        { name: "Congo DR", tickets: 1500, image: "Assets/Countries/CONGODR.png", rarity: "common" },
        { name: "Côte d'Ivoire", tickets: 1500, image:"Assets/Countries/COTEDIVOIRE.png", rarity: "common" },
        { name: "Egypt", tickets: 1500, image: "Assets/Countries/EGYPT.png", rarity: "common" },
        { name: "Ghana", tickets: 1500, image: "Assets/Countries/GHANA.png", rarity: "common" },
        { name: "Senegal", tickets: 1500, image: "Assets/Countries/SENEGAL.png", rarity: "common" },
        { name: "South Africa", tickets: 1500, image: "Assets/Countries/SOUTHAFRICA.png", rarity: "common" },
        { name: "Tunisia", tickets: 1500, image: "Assets/Countries/TUNISIA.png", rarity: "common" },

        { name: "Curacao", tickets: 1700, image: "Assets/Countries/CURACAO.png", rarity: "common" },
        { name: "Haiti", tickets: 1700, image: "Assets/Countries/HAITI.png", rarity: "common" },
        { name: "Panama", tickets: 1700, image: "Assets/Countries/PANAMA.png", rarity: "common" },

        { name: "Colombia", tickets: 1700, image: "Assets/Countries/COLOMBIA.png", rarity: "common" },
        { name: "Ecuador", tickets: 1700, image: "Assets/Countries/ECUADOR.png", rarity: "common" },
        { name: "Paraguay", tickets: 1700, image: "Assets/Countries/PARAGUAY.png", rarity: "common" },
        { name: "Uruguay", tickets: 1700, image: "Assets/Countries/URUGUAY.png", rarity: "common" },

        { name: "New Zealand", tickets: 2000, image: "Assets/Countries/NEWZEALAND.png", rarity: "common" },

        { name: "Austria", tickets: 2000, image: "Assets/Countries/AUSTRIA.png", rarity: "common" },
        { name: "Bosnia& Herzegovina", tickets: 2000, image: "Assets/Countries/BOSNA.png", rarity: "common" },
        { name: "Croatia", tickets: 2000, image: "Assets/Countries/CROITIA.png", rarity: "common" },
        { name: "Czechia", tickets: 2000, image: "Assets/Countries/CZECH.png", rarity: "common" },
        { name: "Norway", tickets: 2000, image: "Assets/Countries/NORWAY.png", rarity: "common" },
        { name: "Scotland", tickets: 2000, image: "Assets/Countries/SCOTLAND.png", rarity: "common" },
        { name: "Sweden", tickets: 2000, image: "Assets/Countries/SWEDEN.png", rarity: "common" },
        { name: "Switzerland", tickets: 2000, image:"Assets/Countries/SWITZERLAND.png", rarity: "common" },
        { name: "Türkiye", tickets: 2000, image: "Assets/Countries/TURKEY.png", rarity: "common" }

    ];

    const countryClassMap = {
        "Canada": "Canada",
        "Mexico": "Mexico",
        "USA": "USA",
        "Japan": "Japan",
        "New Zealand": "Newzealand",
        "Iran": "Iran",
        "Argentina": "Argentina",
        "Uzbekistan": "Uzbekistan",
        "Korea Republic": "Korea",
        "Jordan": "Jordan",
        "Australia": "Australia",
        "Brazil": "Brazil",
        "Ecuador": "Ecuador",
        "Uruguay": "Uruguay",
        "Paraguay":"Paraguay",
        "Colombia":"Colombia",
        "Morocco": "Morocco",
        "Tunisia": "Tunisia",
        "Egypt": "Egypt",
        "Algeria": "Algeria",
        "Ghana": "Ghana",
        "Cabo Verde": "Capeverde",
        "South Africa": "Southafrica",
        "Qatar":"Qatar",
        "Saudi Arabia": "Saudiarabia",
        "England": "England",
        "Côte d'Ivoire": "Cotedivoire",
        "Senegal": "Senegal",
        "France": "France",
        "Croatia": "Croatia",
        "Portugal": "Portugal",
        "Norway": "Norway",
        "Germany": "Germany",
        "Netherlands": "Netherlands",
        "Austria": "Austria",
        "Belgium": "Belgium",
        "Scotland": "Scotland",
        "Spain": "Spain",
        "Switzerland": "Switzerland",
        "Curacao": "Curacao",
        "Haiti": "Haiti",
        "Panama": "Panama",
        "Sweden": "Sweden",
        "Türkiye": "Turkey",
        "Czechia": "Czech",
        "Bosnia& Herzegovina": "Bosna",
        "Congo DR": "Congodr",
        "Iraq": "Iraq"
    };

    const username = localStorage.getItem("username");

    if (!username) {
        window.location.href = "Login.html";
    }

    const userDoc = await getDoc(doc(db, "users", username));
    const userData = userDoc.data();
    const ownedCountries = userData?.countries || [];

    function unlockInventory(owned) {
        for (const countryName of owned) {
            const cssClass = countryClassMap[countryName];
            if (!cssClass) continue;
            const lockImg = document.querySelector(`.${cssClass}`);
            if (!lockImg) continue;
            lockImg.src = "Assets/Buttons/Owned.png"
        }
    }

    unlockInventory(ownedCountries);

    async function openPack() {

        music.pause();

        const walkout = new Audio("Assets/Audio/walkout.mp3");
        walkout.play();

        const totalTickets = countries.reduce((sum, country) => sum + country.tickets, 0);
        const luckyTicket = Math.floor(Math.random() * totalTickets) + 1;
        let current = 0;

        for (const country of countries) {
            current += country.tickets;

            if(luckyTicket <= current) {
                const flash = document.createElement("div");
                flash.classList.add("flash-overlay");
                document.body.appendChild(flash);

                setTimeout(async () => {
                    const rarityCards = {
                        legend: "Assets/Cards/legend.png",
                        epic: "Assets/Cards/epic.png",
                        rare: "Assets/Cards/rare.png",
                        common: "Assets/Cards/common.png"
                    };

                    const CardImg = document.getElementById("cardImage");
                    if (CardImg) {
                        CardImg.src = rarityCards[country.rarity];
                    }

                    const img = document.getElementById("resultImage");
                    if (img) {
                        img.src = country.image;
                        img.style.display = "block";
                    }

                    document.getElementById("result").innerHTML = country.name.replace(' ','<br>');

                    const rarityEl = document.getElementById("resultRarity");
                    rarityEl.textContent = country.rarity.toUpperCase();
                    rarityEl.className = country.rarity;
                    rarityEl.style.color = "";

                    document.getElementById("popup").style.display="flex";
                    flash.remove();

                    try{
                        await updateDoc(doc(db, "users", username),{
                            countries: arrayUnion(country.name)
                        });
                        unlockInventory([country.name]);
                    } catch (err) {
                        console.error("Failed to save country:", err);
                    }

                },1000);

                return country;
            }
        }
    }

    function closePopup() {
        document.getElementById("popup").style.display="none";
        music.play()
    }

    function openQuestion(){
        document.getElementById("questionup").style.display="flex";
    }

    function closeQuestion(){
        document.getElementById("questionup").style.display="none";
    }

    function openBag(){
        document.getElementById("bagup").style.display="flex";
    }

    function closeBag(){
        document.getElementById("bagup").style.display="none";
    }

    window.openPack = openPack;
    window.closePopup = closePopup;
    window.openQuestion = openQuestion;
    window.closeQuestion = closeQuestion;
    window.openBag = openBag;
    window.closeBag = closeBag;

    const music = document.getElementById("bgMusic");

    document.addEventListener("click", () => {
        music.play().catch(err => console.log(err));
    }, { once:true});

    document.getElementById("logoutBtn").addEventListener("click", async () => {
        await signOut(auth);
        localStorage.removeItem("username");
        window.location.href = "./Login.html";
    });
