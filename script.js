let vantaEffect = false;
let color1 = 0xff7878;
let color2 = 0xffffff;
let bgcolor = 0x121212;

function showEmployee (name) {
	const mainContent = document.getElementById('main-content');
	const employeePage = document.getElementById('employee-page');
	const employeeName = document.getElementById('employee-name');
	const footer = document.querySelector('footer');
	const slicerUI = document.getElementById('slicer-ui');

	mainContent.style.display = 'none';
	employeePage.style.display = 'flex';
	footer.style.display = 'none';

	if (name === 'Zijie Wu') {
		// Initialize VANTA Globe if not already running
		if (!vantaEffect) {
			vantaEffect = VANTA.GLOBE({
				el: "#employee-page",
				mouseControls: true,
				touchControls: true,
				gyroControls: false,
				minHeight: 830.00,
				minWidth: 900.00,
				scale: 1.0,
				scaleMobile: 1.0,
				color: color1,
				color2: color2,
				backgroundColor: bgcolor
			});
		}
		employeeName.style.display = 'none'; // Hide the name
		slicerUI.style.display = 'flex'; // Show slicer UI
	} else {
		// Destroy VANTA Globe if it exists
		if (vantaEffect) {
			vantaEffect.destroy();
			vantaEffect = null;
		}

		employeeName.style.display = 'block';
		employeeName.textContent = name;
		slicerUI.style.display = 'none';
		}
}

function goBack () {
	const employeePage = document.getElementById('employee-page');
	const mainContent = document.getElementById('main-content');
	const footer = document.querySelector('footer');
	const slicerUI = document.getElementById('slicer-ui');

	// Destroy VANTA Globe if active
	if (vantaEffect) {
		vantaEffect.destroy();
		vantaEffect = null;
	}

	employeePage.style.display = 'none';
	mainContent.style.display = 'block';
	footer.style.display = 'block';
	slicerUI.style.display = 'none';
}

window.addEventListener ('DOMContentLoaded', () => {
	const colorPickers = document.querySelectorAll('.color-input');
	const color1Input = document.getElementById('color1');
	const color2Input = document.getElementById('color2');
	const bgInput = document.getElementById('bgcolor');	

	color1Input.value = "#" + color1.toString(16).padStart(6, "0");
	color2Input.value = "#" + color2.toString(16).padStart(6, "0");
	bgInput.value = "#" + bgcolor.toString(16).padStart(6, "0");

	colorPickers.forEach(input => {
		input.addEventListener('input', () => {
			if (!vantaEffect) {
				return;
			}

			const colorType = input.id;
			const value = parseInt(input.value.replace('#', '0x'));

			if (colorType === 'color1') {
				vantaEffect.setOptions({ color: value });
				color1 = value;
			} else if (colorType === 'color2') {
				vantaEffect.setOptions({ color2: value });
				color2 = value;
			} else if (colorType === 'bgcolor') {
				vantaEffect.setOptions({ backgroundColor: value });
				bgcolor = value;
			}
		});
	});
});