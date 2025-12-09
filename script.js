// --- 1. DATAKÄLLOR (Simulerade) ---

const dailyNews = {
    date: "Tisdag 9 December 2025",
    headline: "Bina Räddade: Ny Global Samarbetsinsats Återställer Populationer!",
    summary: "I ett fantastiskt exempel på internationellt samarbete har forskare och bönder från sex kontinenter lyckats implementera nya, hållbara jordbruksmetoder. Detta har lett till en oväntat snabb återhämtning av binas populationer i flera kritiska regioner. Experter hyllar insatsen som ett bevis på vad global enighet kan åstadkomma.",
    link: "https://example.com/bina-raddade" // Byt ut till en riktig länk
};

const quotes = [
    "Det är bättre att tända ett litet ljus än att förbanna mörkret.",
    "Framtiden tillhör dem som tror på skönheten i sina drömmar. – Eleanor Roosevelt",
    "Var förändringen du vill se i världen. – Mahatma Gandhi",
    "Lycka är inte något färdigt. Det kommer från dina egna handlingar. – Dalai Lama",
    "Vi kan inte hjälpa alla, men alla kan hjälpa någon. – Ronald Reagan"
];

let currentQuoteIndex = 0; // För att veta vilket citat som visas

// --- 2. HUVUDFUNKTIONER ---

document.addEventListener('DOMContentLoaded', () => {
    // A. Ladda Dagens Nyhet
    loadDailyNews();

    // B. Lyssna på Händelser
    document.getElementById('new-quote-btn').addEventListener('click', handleNewQuote);
    document.querySelectorAll('.feeling-btn').forEach(button => {
        button.addEventListener('click', handleFeelingVote);
    });
    document.querySelectorAll('.share-btn').forEach(button => {
        button.addEventListener('click', handleShare);
    });
    document.getElementById('signup-form').addEventListener('submit', handleEmailSignup);
});


// Ladda nyheter i DOM
function loadDailyNews() {
    document.getElementById('news-date').textContent = dailyNews.date;
    document.getElementById('news-headline').textContent = dailyNews.headline;
    document.getElementById('news-summary').textContent = dailyNews.summary;
    document.getElementById('news-link').setAttribute('href', dailyNews.link);

    // Sätt initialt citat
    document.getElementById('daily-quote').textContent = quotes[currentQuoteIndex];
}


// --- 3. INTERAKTIVITETSHANTERARE ---

// Citat-Funktionalitet
function handleNewQuote() {
    // Gå till nästa citat, eller börja om
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    document.getElementById('daily-quote').textContent = quotes[currentQuoteIndex];
    
    // Testa: Logga ett Custom Event för analysverktyg
    console.log(`Analytics Event: New_Quote_Click - Citat ID: ${currentQuoteIndex}`); 
}

// Känsla/Rösta-Funktionalitet
function handleFeelingVote(event) {
    const selectedFeeling = event.target.getAttribute('data-feeling');
    const feedbackEl = document.getElementById('vote-feedback');

    // Återställ alla knappar (för att tillåta endast en röst)
    document.querySelectorAll('.feeling-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    feedbackEl.textContent = `Tack! Din känsla (${selectedFeeling}) har registrerats.`;
    
    // Testa: Logga ett Custom Event för analysverktyg
    console.log(`Analytics Event: Feeling_Vote - Känslaval: ${selectedFeeling}`);
}

// Dela-Funktionalitet
function handleShare(event) {
    const platform = event.target.getAttribute('data-platform');
    const shareText = `Läs dagens goda nyhet: ${dailyNews.headline} - ${window.location.href}`;
    let shareUrl = '';

    if (platform === 'twitter') {
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    } else if (platform === 'email') {
        shareUrl = `mailto:?subject=${encodeURIComponent('Dagens Goda Nyhet')} &body=${encodeURIComponent(shareText)}`;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank');
        // Testa: Logga ett Custom Event för analysverktyg
        console.log(`Analytics Event: Share_Click - Plattform: ${platform}`); 
    }
}

// E-postregistrering (Simulerad)
function handleEmailSignup(event) {
    event.preventDefault(); // Förhindra sidladdning
    const emailInput = event.target.querySelector('input[type="email"]');
    const feedbackEl = document.getElementById('signup-feedback');
    const email = emailInput.value;

    if (email) {
        // I en riktig app skulle du skicka 'email' till din server här
        console.log(`Simulerad Server: Mottog registrering för ${email}`);
        
        feedbackEl.textContent = `Tack! ${email} är nu registrerad för dagliga nyheter.`;
        emailInput.value = ''; // Rensa fältet
        
        // Testa: Logga ett Custom Event för analysverktyg (konvertering)
        console.log("Analytics Event: Email_Signup_Conversion"); 
    }
}
