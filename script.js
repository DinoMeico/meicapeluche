const audioFiles = [];

async function loadAudioFiles() {
    try {
        const response = await fetch('sounds/');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = doc.querySelectorAll('a[href$=".wav"], a[href$=".mp3"], a[href$=".ogg"]');
        
        if (links.length > 0) {
            audioFiles.length = 0;
            links.forEach(link => {
                const filename = link.getAttribute('href');
                if (filename && !filename.includes('../')) {
                    audioFiles.push(filename);
                }
            });
        }
    } catch (error) {
        console.log('No se pudo cargar la lista de archivos de audio');
    }
}

function playSound() {
    if (audioFiles.length === 0) {
        console.log('No hay archivos de audio disponibles');
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    const selectedAudio = audioFiles[randomIndex];
    
    const audio = new Audio(`sounds/${selectedAudio}`);
    audio.currentTime = 0;
    audio.play().catch(error => {
        console.log('Error al reproducir el sonido:', error);
    });
}

loadAudioFiles();