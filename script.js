const audioFiles = [
    'dinomeico.wav',
    'clic.mp3'
];

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

checkAudioFiles();