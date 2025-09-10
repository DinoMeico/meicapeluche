const audioFiles = ['clic.mp3', 'a1.wav', 'a2.wav', 'a3.wav' ];
let currentAudio = null;

function checkAudioFiles() {
    audioFiles.forEach((file, index) => {
        const audio = new Audio(`sounds/${file}`);
        audio.addEventListener('error', () => {
            console.log(`Archivo no encontrado: ${file}`);
            audioFiles.splice(index, 1);
        });
    });
}

function playSound() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    // Siempre reproducir clic.mp3 primero
    const clickAudio = new Audio('sounds/clic.mp3');
    currentAudio = clickAudio;
    
    clickAudio.play().catch(error => {
        console.log('Error al reproducir clic.mp3:', error);
    });
    
    clickAudio.addEventListener('ended', () => {
        // Filtrar los audios que no sean clic.mp3
        const otherAudios = audioFiles.filter(file => file !== 'clic.mp3');
        
        if (otherAudios.length > 0) {
            const randomIndex = Math.floor(Math.random() * otherAudios.length);
            const selectedAudio = otherAudios[randomIndex];
            
            const randomAudio = new Audio(`sounds/${selectedAudio}`);
            currentAudio = randomAudio;
            
            randomAudio.play().catch(error => {
                console.log('Error al reproducir el sonido aleatorio:', error);
            });
        }
    });
}

checkAudioFiles();