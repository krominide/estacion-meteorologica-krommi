const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt');
const topikrommi = "uc/iee1100/fadua";

client.on('connect', () => {
    client.subscribe(`${topikrommi}/temperatura`);
    client.subscribe(`${topikrommi}/humedad`);
    client.subscribe(`${topikrommi}/luz`);
});

client.on('message', (topic, message) => {
    let dato = message.toString();
    
    if (topic === "uc/iee1100/fadua/temperatura"){
        document.getElementById("temperatura").innerHTML = dato;
        const alertatemu = document.getElementById("alertatem");

        if (parseFloat(dato) > 25.0 || parseFloat(dato) < 15.0){
            alertatemu.innerHTML = "¡temperatura extrema!"
        }
        else {
            alertatemu.innerHTML = "";
        }
    }

    else if (topic === "uc/iee1100/fadua/humedad"){
        document.getElementById("humedad").innerHTML = dato;
    }
    else if (topic === "uc/iee1100/fadua/luz"){
        document.getElementById("luz").innerHTML = dato;
        const alertaluzu = document.getElementById("alertaluz");

        if (parseFloat(dato) > 3000.0 || parseFloat(dato) < 1000.0){
            alertaluzu.innerHTML = "¡nivel de luz extremo!"
        }
        else {
            alertaluzu.innerHTML = "";
        }
    }
    });