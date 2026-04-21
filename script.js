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
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 버튼 비활성화 및 로딩 상태 표시
        submitBtn.disabled = true;
        const originalText = submitBtn.innerText;
        submitBtn.innerText = '신청 처리 중...';

        // 1. 폼 데이터 수집
        const formData = {
            name: document.getElementById('name').value,
            studentId: document.getElementById('studentId').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            purpose: document.getElementById('purpose').value
        };

        try {
            // 2. 구글 웹 앱으로 데이터 전송
            await fetch('https://script.google.com/macros/s/AKfycbxsTTHS6kwYOihq5-ZBeFLqi_l6yUIUZYVC5VXuITx5OmNiczWVX3vW0rihCU2hge_OqQ/exec', {
                method: 'POST',
                mode: 'no-cors', // 구글 시트 연동 필수 설정
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            // 3. 성공 처리 (no-cors 모드에서는 응답을 읽을 수 없으므로 바로 성공 알림)
            alert('신청이 성공적으로 접수되었습니다!');
            form.reset();
        } catch (error) {
            // 4. 에러 처리
            alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            console.error('Error!', error.message);
        } finally {
            // 버튼 상태 복구
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        }
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
