document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const particlesContainer = document.getElementById('particles');

    // Create subtle floating particles
    function createParticles() {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(34, 211, 238, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + 'vh';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.filter = 'blur(1px)';
            
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            particle.animate([
                { transform: 'translateY(0) translateX(0)', opacity: 0 },
                { transform: `translateY(-${Math.random() * 100 + 50}px) translateX(${Math.random() * 40 - 20}px)`, opacity: 0.5, offset: 0.5 },
                { transform: `translateY(-${Math.random() * 200 + 100}px) translateX(${Math.random() * 60 - 30}px)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                delay: delay * 1000,
                iterations: Infinity,
                easing: 'ease-in-out'
            });

            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // Form submission handling
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        const originalText = submitBtn.innerText;
        submitBtn.innerText = '신청 처리 중...';

        // Simulate API call
        setTimeout(() => {
            alert('신청이 성공적으로 접수되었습니다!\n승인 결과는 이메일로 안내해 드립니다.');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        }, 1500);
    });

    // Input focus effects
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.querySelector('label').style.color = '#22d3ee';
        });
        input.addEventListener('blur', () => {
            input.parentElement.querySelector('label').style.color = '#cbd5e1';
        });
    });
});
