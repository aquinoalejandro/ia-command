

// Función para crear el modelo de reconocimiento de comandos de voz.
async function createModel() {
    // Crea un objeto reconocedor de comandos de voz utilizando el modelo 'BROWSER_FFT'.
    const recognizer = await speechCommands.create('BROWSER_FFT');
    
    // Asegura que el modelo esté cargado antes de continuar.
    await recognizer.ensureModelLoaded();

    // Devuelve el objeto reconocedor creado.
    return recognizer;
}

// Define una función asincrónica para inicializar el reconocimiento de comandos de voz.
async function init() {
    // Crea el modelo de reconocimiento de comandos de voz.
    const recognizer = await createModel();

    // Obtiene las etiquetas de clases del modelo.
    const classLabels = recognizer.wordLabels();

    // para ver en consola las palabras que tiene el modelo
    console.log(classLabels)

    // Obtiene el botón de inicio desde el documento HTML.
    const startButton = document.getElementById('start-button');

    // Obtiene el div donde se mostrarán los resultados desde el documento HTML.
    const resultDiv = document.getElementById('result');

    // Define una función para iniciar la escucha de comandos de voz.
    function listen() {

        // Empieza a escuchar y ejecuta una función de devolución de llamada cuando se detecta un comando.
        recognizer.listen(result => {

            // Extrae los puntajes de probabilidad de cada palabra reconocida.
            const {scores} = result;

            // Convierte los puntajes de probabilidad en un array de objetos con la palabra y el puntaje.
            const scoresArray = Array.from(scores).map((s, i) => ({score: s, word: classLabels[i]}));

            // Ordena el array de acuerdo al puntaje de probabilidad en orden descendente.
            scoresArray.sort((a, b) => b.score - a.score);

            // Muestra el comando con mayor probabilidad y su puntaje en el div de resultados.
            resultDiv.innerHTML = `Command: ${scoresArray[0].word} (${(scoresArray[0].score * 100).toFixed(2)}%)`;
        }, {
            // Establece un umbral de probabilidad para considerar un comando como válido.
            probabilityThreshold: 0.75
        });

        // Cambia el texto del botón a 'Detener Escucha' y cambia la función de clic para detener la escucha.
        startButton.innerText = 'Stop Listening';
        startButton.onclick = () => {
            recognizer.stopListening();
            startButton.innerText = 'Start Listening';
            startButton.onclick = listen;
        };
    }
    // Establece la función de clic del botón de inicio para iniciar la escucha.
    startButton.onclick = listen;
}
// Inicia el proceso de inicialización del reconocimiento de comandos de voz.
init();



// 2:"down"
// 3:"eight"
// 4:"five"
// 5:"four"
// 6:"go"
// 7:"left"
// 8:"nine"
// 9:"no"
// 10:"one"
// 11:"right"
// 12:"seven"
// 13:"six"
// 14:"stop"
// 15:"three"
// 16:"two"
// 17:"up"
// 18:"yes"
// 19:"zero"