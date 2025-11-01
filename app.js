(() => {
	const content = document.getElementById('appContent');
	const buttons = document.querySelectorAll('.btn-tab');

	function setActive(btn) {
		buttons.forEach(b => b.classList.remove('active'));
		btn?.classList.add('active');
	}

	async function loadContent(file, btn) {
		try {
			if (file === 'home') {
				const tpl = document.getElementById('homeTpl');
				content.innerHTML = tpl?.innerHTML || '<div class="p-3">Home</div>';
			} else {
				const res = await fetch(file);
				content.innerHTML = await res.text();
			}
			setActive(btn);
		} catch {
			content.innerHTML = `<div class="p-3 text-danger">Error loading ${file}</div>`;
		}
	}

	// Event handlers
	document.addEventListener('click', e => {
		const btn = e.target.closest('.btn-tab');
		btn && loadContent(btn.dataset.file, btn);
	});

	// Initial load
	loadContent('home', document.querySelector('[data-file="home"]'));
})();