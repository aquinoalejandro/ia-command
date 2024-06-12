

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

            // Muestra una imagen por cada uno de los comandos detectados.

            scoresArray.sort((a, b) => b.probability - a.probability);

            const command = scoresArray[0].word;
            
            const imageUrls = {
              up: "https://www.pngall.com/wp-content/uploads/15/Up-Arrow-PNG-Free-Image.png",
              down: "https://clipground.com/images/purple-arrow-clipart-6.png",
              left: "https://www.pngmart.com/files/16/Black-Left-Arrow-PNG-Image.png",
              right: "https://cdn1.iconfinder.com/data/icons/main-ui-elements-with-colour-bg/512/arrow_right-1024.png",
              zero: "https://i.pinimg.com/originals/b0/39/86/b03986133da5d7d862297a179755198a.jpg",
              one: "https://www.pngall.com/wp-content/uploads/2016/04/1-Number-PNG.png",
              two: "https://static.vecteezy.com/system/resources/previews/024/340/618/original/black-and-gold-of-number-2-3d-render-png.png",
              three: "https://www.pngall.com/wp-content/uploads/2/3-Number-PNG-Image-File.png",
              four: "https://i.pinimg.com/originals/a8/18/61/a818610887ca17809a9bd4a1916374ea.png",
              five: "https://th.bing.com/th/id/R.e2a43ebc14cf2e1a141b72fb95288255?rik=6jxHBPqIkaAbnw&pid=ImgRaw&r=0",
              six: "https://www.pngall.com/wp-content/uploads/2016/04/6-Number-PNG.png",
              seven: "https://png.pngtree.com/png-clipart/20200401/original/pngtree-gold-number-7-png-image_5330848.jpg",
              eight: "https://www.pngall.com/wp-content/uploads/2016/04/8-Number-PNG.png",
              nine: "https://th.bing.com/th/id/OIP.EoaPgVZmTw0liwuh-fjH4wHaHa?rs=1&pid=ImgDetMain",
              no: "https://th.bing.com/th/id/OIP.GTnkbagAvDbTwnHmKjpCYgAAAA?rs=1&pid=ImgDetMain",
              yes: "https://static.vecteezy.com/system/resources/previews/017/177/738/original/yes-lettering-on-transparent-background-free-png.png",
              stop: "https://static.vecteezy.com/system/resources/previews/012/042/299/original/stop-sign-icon-transparent-background-png.png",
            };
            
            if (command in imageUrls) {
              const imageUrl = imageUrls[command];
              const image = new Image();
              image.src = imageUrl;
            
              const listeningDiv = document.querySelector('.listening');
              listeningDiv.innerHTML = ''; // Borra cualquier contenido previo en el div
              listeningDiv.appendChild(image); // Agrega la nueva imagen al div "listening"
            } else {
              console.log("Command not recognized");
            }

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