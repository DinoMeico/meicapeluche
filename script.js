const audioFiles = ['dinomeico.wav', 'clic.mp3'];
const otherAudioFiles = ['dinomeico.wav'];
let currentAudio = null;

function checkAudioFiles() {
    audioFiles.forEach((file, index) => {
        const audio = new Audio(`sounds/${file}`);
        audio.addEventListener('error', () => {
            console.log(`Archivo no encontrado: ${file}`);
            audioFiles.splice(index, 1);
            if (file !== 'clic.mp3') {
                const otherIndex = otherAudioFiles.indexOf(file);
                if (otherIndex > -1) {
                    otherAudioFiles.splice(otherIndex, 1);
                }
            }
        });
    });
}

function playSound() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    
    const clickAudio = new Audio('sounds/clic.mp3');
    currentAudio = clickAudio;
    
    clickAudio.play().catch(error => {
        console.log('Error al reproducir clic.mp3:', error);
    });
    
    clickAudio.addEventListener('ended', () => {
        if (otherAudioFiles.length > 0) {
            const randomIndex = Math.floor(Math.random() * otherAudioFiles.length);
            const selectedAudio = otherAudioFiles[randomIndex];
            
            const randomAudio = new Audio(`sounds/${selectedAudio}`);
            currentAudio = randomAudio;
            
            randomAudio.play().catch(error => {
                console.log('Error al reproducir el sonido aleatorio:', error);
            });
        }
    });
}

checkAudioFiles();