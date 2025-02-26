const loadingSpinner = document.getElementById("loadingSpinner") || document.createElement("div");
loadingSpinner.id = "loadingSpinner";
loadingSpinner.style.position = "fixed";
loadingSpinner.style.top = "50%";
loadingSpinner.style.left = "50%";
loadingSpinner.style.transform = "translate(-50%, -50%)";
loadingSpinner.style.zIndex = "1000";
loadingSpinner.style.display = "none"; // Initially hidden
loadingSpinner.innerHTML = "<div>Loading...</div>"; // Placeholder content
document.body.appendChild(loadingSpinner);

// Show loading spinner
loadingSpinner.style.display = "block";

// Ensure GSAP is loaded before using it
if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
    });
    
    gsap.utils.toArray(".slide").forEach((slide, index) => {
        gsap.from(slide, {
            scrollTrigger: {
                trigger: slide,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
            },
            opacity: 0,
            y: 50,
            duration: 1.5,
        });
    });
} else {
    console.error("GSAP is not loaded properly.");
}

// Hide loading spinner after animations are ready
loadingSpinner.style.display = "none";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("heroCanvas") });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(20, 20, 20);
scene.add(light);

camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
}

loadingSpinner.style.display = "block"; // Show loading spinner
animate();
loadingSpinner.style.display = "none"; // Hide loading spinner after animations are ready

const leaderboardContainer = document.getElementById("leaderboardContainer");
// Placeholder data for leaderboard
const leaderboardData = [
    { name: "Player1", score: 100 },
    { name: "Player2", score: 90 },
    { name: "Player3", score: 80 },
];

// Function to render leaderboard
function renderLeaderboard() {
    leaderboardContainer.innerHTML = "";
    leaderboardData.forEach(player => {
        const playerElement = document.createElement("div");
        playerElement.textContent = `${player.name}: ${player.score}`;
        leaderboardContainer.appendChild(playerElement);
    });
}

// Call renderLeaderboard to display initial data
renderLeaderboard();

// Chatbox functionality
const chatContainer = document.getElementById("chatContainer");
const chatInput = document.getElementById("chatInput");
const sendChatButton = document.getElementById("sendChat");

sendChatButton.addEventListener('click', function() {
    const message = chatInput.value;
    if (message) {
        const messageElement = document.createElement("div");
        messageElement.textContent = message;
        chatContainer.appendChild(messageElement);
        chatInput.value = ""; // Clear input
    }
});
