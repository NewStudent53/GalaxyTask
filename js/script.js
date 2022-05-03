var scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000),
    a = new THREE.PointLight(0xffffff, 2),
    renderer = new THREE.WebGLRenderer({alpha: true}),
    tierra, luna, sol;

function renderScene() {
    tierra.animate();
    luna.animate();
    sol.animate();
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
}

function main() {
    renderer.setClearColor(0x000000, 0.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap
    
    // Eventos del raton
    MOUSE.initialize("#canvas");

    // Añadir cámara
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 20;
    camera.lookAt(scene.position);

    //

    // Adding Lights
    const light = new THREE.AmbientLight()
    scene.add(light)

    const color = {
        color: 0xffffff
    }
    const intensity = 1;

    const gui = new dat.GUI()

    const light2 = new THREE.PointLight(0x0, 0)
    light2.intensity = 0
    light2.angle = Math.PI / 3;
    scene.add(light2)

    const light3 = new THREE.HemisphereLight()
    scene.add(light3)

    const light4 = new THREE.DirectionalLight(0x0);
    scene.add(light4);

    const light5 = new THREE.PointLight()
    scene.add(light5)

    const light6 = new THREE.SpotLight()
    scene.add(light6)

    const data = {
        color: light.color.getHex(),
        groundColor: light3.groundColor.getHex(),
        switch: false,
        mapsEnabled: true,
        shadowMapSizeWidth: 512,
        shadowMapSizeHeight: 512
    }  

    //AMBIENT-BEGIN
    const lightFolder = gui.addFolder('THREE.AmbientLight')

    const lightColor = {
        color: 0xffffff
    }

    lightFolder.addColor(lightColor, 'color')
        .onChange(() => {
            light.color.set(lightColor.color)
        })
    lightFolder.add(light2, 'intensity').min(0).max(10).step(0.01)

    //AMBIENT-END   

    //
    //

    //DIRECTION-BEGIN 
    //const DirectionalLightFolder = gui.addFolder('THREE.DirectionalLight')
    //DirectionalLightFolder.add(light4.shadow.camera, 'left', -10, -1, 0.1)

    //DIRECTION-END

    //HEMISPHERE-BEGIN
    const HemisphereLightFolder = gui.addFolder('THREE.HemisphereLight')
    HemisphereLightFolder.addColor(data, 'groundColor').onChange(() => {
        light3.groundColor.setHex(Number(data.groundColor.toString().replace('#', '0x'))) });

   HemisphereLightFolder.add(light3.position, "x", -100, 100, 0.01)
   HemisphereLightFolder.add(light3.position, "y", -100, 100, 0.01)
   HemisphereLightFolder.add(light3.position, "z", -100, 100, 0.01)
   HemisphereLightFolder.open()
    //HEMISPHERE-END

    //POINT-BEGIN
    const PointLightFolder = gui.addFolder('THREE.PointLight')
    PointLightFolder.add(light5, 'distance', 0, 100, 0.01)
    PointLightFolder.add(light5, 'decay', 0, 4, 0.1)
    PointLightFolder.add(light5.position, 'x', -50, 50, 0.01)
    PointLightFolder.add(light5.position, 'y', -50, 50, 0.01)
    PointLightFolder.add(light5.position, 'z', -50, 50, 0.01)
    
        const light9 = {
            color: 0xffffff
        }

        PointLightFolder.addColor(light9, 'color')
            .onChange(() => {
                light5.color.set(light9.color)
            })

    //POINT-END
    
    //SPOT-BEGIN
    const SpotLightFolder = gui.addFolder('THREE.SpotLight')
    SpotLightFolder.add(light6, 'distance', 0, 100, 0.01)
    SpotLightFolder.add(light6, 'decay', 0, 4, 0.1)
    SpotLightFolder.add(light6.position, 'x', -50, 50, 0.01)
    SpotLightFolder.add(light6.position, 'y', -50, 50, 0.01)
    SpotLightFolder.add(light6.position, 'z', -50, 50, 0.01)
    //SPOT-END

    const PointLightHelper = new THREE.PointLightHelper(light5, 2)
    scene.add(PointLightHelper)

    // Modelo
    tierra = new Astro(2, "res/tierra.jpg", 8, 0.005, 0.0035, false, true);
    tierra.model();
    
    luna = new Astro(1, "res/luna.jpg", 4, 0.025, 0.005, false, false);
    luna.model();
    
    sol = new Astro(3, "res/sol.jpg", 0, 0, 0.002, true, false);
    sol.model();
    
    scene.add(sol.get());
    sol.addSatelite(tierra.get());
    tierra.addSatelite(luna.get());
    
    $("#canvas").append(renderer.domElement);

    renderScene();
}

main();

spotLight = new THREE.SpotLight;
    lightHelper = new THREE.lightHelper;
    shadowCameraHelper = new THREE.shadowCameraHelper;