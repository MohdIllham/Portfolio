// Check if Three.js is loaded
console.log('Three.js loaded:', THREE);

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);
console.log('Scene, camera, and renderer set up');

// Create the globe
const geometry = new THREE.SphereGeometry(5, 64, 64);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./assets/earth.jpg',
    () => { console.log('Texture loaded successfully'); },
    undefined,
    (error) => { console.error('Error loading texture:', error); }
);

// Ensure the texture wraps around the globe properly
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(1, 1);

const material = new THREE.MeshBasicMaterial({ map: texture });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);
console.log('Globe created and added to scene');

// Set the camera position
camera.position.z = 10;
console.log('Camera position set');

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);
console.log('Lighting added');

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.008;  // Rotate the globe
    renderer.render(scene, camera);
}
animate();
console.log('Animation loop started');

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    console.log('Window resized');
});

// Function to toggle play/pause of the song
let audio = new Audio('./assets/background-music.mp3');
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        audio.loop = true; // Loop the song
        isPlaying = true;
    }
}

// Function to navigate to a section
function navigateToSection(index) {
    console.log(`Navigating to Section ${index + 1}`);
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, i) => {
        if (i === index) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}
